import {applyMiddleware, createStore} from "redux";
import rootReducer from '../reducers';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const store=createStore(rootReducer,composeWithDevTools(
    applyMiddleware(thunk)
));

// console.log("rootReducer>>",rootReducer);




export default  store;