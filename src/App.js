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


const App = () => (
    <div className="app">
        <Header/>
        <Route exact path="/" render={() => <MainPage/>}/>
        <Route path="/movies" render={() => <MoviesPage/>}/>
        <Route path="/movie/:id" render={() => <MoviePage/>}/>
        <Route path="/person/:id" render={() => <PersonPage/>}/>
        <Footer/>
    </div>
);

export default App;
