import './App.css';
import "./lib/font-awesome/css/all.min.css";
import Header from "./Components/Header/Header";
import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import MainPage from "./Pages/MainPage";
import MoviePage from "./Pages/MoviePage";
import MovieByGenrePage from "./Pages/MovieByGenrePage";


function App() {
    return (
            <div className="app">
                <Header/>
                <Route exact path="/" render={() => <MainPage/>}/>
                <Route path="/movies" render={() => <MovieByGenrePage/>}/>
                <Route path="/movie/:id" render={() => <MoviePage/>}/>
                <Footer/>
            </div>
    );
}

export default App;
