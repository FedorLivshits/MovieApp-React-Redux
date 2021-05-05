import './App.css';
import "./lib/font-awesome/css/all.min.css";
import Header from "./Components/Header/Header";
import React from "react";
import {Route} from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import MainPage from "./Pages/MainPage";
import MoviePage from "./Pages/MoviePage";
import MoviesPage from "./Pages/MoviesPage";
import PersonPage from "./Pages/PersonPage";


const App = () => {
    const isNoneImg = (anyString) => {
        let anyString4 = anyString.substring(anyString.length - 4);
        if (anyString4 === "null") {
            return <img
                className="img-fluid rounded-circle mx-auto d-block"
                src="https://www.colorhexa.com/d3d3d3.png"
                alt="img"
            />
        }
        return <img
            className="img-fluid rounded-circle mx-auto d-block"
            src={anyString}
            alt="img"
        />
    }
    return <div className="app">
        <Header/>
        <Route exact path="/" render={() => <MainPage isNoneImg={isNoneImg}/>}/>
        <Route path="/movies" render={() => <MoviesPage isNoneImg={isNoneImg}/>}/>
        <Route path="/movie/:id" render={() => <MoviePage isNoneImg={isNoneImg}/>}/>
        <Route path="/person/:id" render={() => <PersonPage/>}/>
        <Footer/>
    </div>
}


export default App;
