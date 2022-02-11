import React,{useEffect} from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from "./containers/HomePage";
import ProductListPage from "./containers/ProductListPage";
import {useDispatch,useSelector} from 'react-redux'
import {isUserLoggedIn} from './actions'
import ProductDetailsPage from "./containers/ProductDetailsPage";


function App() {
const dispatch = useDispatch();
const auth = useSelector(state=>state.auth)

useEffect(()=>{
 if(!auth.authenticate){
   dispatch(isUserLoggedIn())
 }
},[auth.authehnticate])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage}></Route>
          <Route path="/:productslug/:productId/p" component={ProductDetailsPage}></Route>
          <Route path="/:slug" component={ProductListPage}></Route>
          
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
