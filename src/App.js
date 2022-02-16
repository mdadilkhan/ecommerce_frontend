import React,{useEffect} from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from "./containers/HomePage";
import ProductListPage from "./containers/ProductListPage";
import {useDispatch,useSelector} from 'react-redux'
import {isUserLoggedIn, updateCart} from './actions'
import ProductDetailsPage from "./containers/ProductDetailsPage";
import CartPage from "./containers/CartPage";
import checkoutPage from './containers/checkoutPage'


function App() {
const dispatch = useDispatch();
const auth = useSelector(state=>state.auth)

useEffect(()=>{
 if(!auth.authenticate){
   dispatch(isUserLoggedIn())
 }
},[auth.authenticate, dispatch])


useEffect(()=>{
  dispatch(updateCart())
},[auth.authenticate,dispatch])


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage}></Route>
          <Route path="/cart" component={CartPage}></Route>
          <Route path="/checkout" component={checkoutPage}></Route>
          <Route path="/:productslug/:productId/p" component={ProductDetailsPage}></Route>
          <Route path="/:slug" component={ProductListPage}></Route>
          
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
