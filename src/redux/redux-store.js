import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import mainPageReducer from "./mainPage-reducer";
import moviePageReducer from "./moviePage-reducer";
import moviesPageReducer from "./moviesPage-reducer";
import personPageReducer from "./personPage-reducer";

let reducers = combineReducers({
    mainPage: mainPageReducer,
    moviePage: moviePageReducer,
    moviesPage: moviesPageReducer,
    personPage: personPageReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,  composeEnhancers(applyMiddleware(thunkMiddleware)));

window.store = store;

export default store;