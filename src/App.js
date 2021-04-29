import './App.css';
import Header from "./Components/Header";
import React, {useEffect} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import Footer from "./Components/Footer";

function App() {
    useEffect(() => {
        document.addEventListener('DOMContentLoaded', function () {
            let elems = document.querySelectorAll('.slider');
            let instances = M.Slider.init(elems, {});
        });
    }, [])

    return (
        <BrowserRouter>
            <div className="app">
                <Header/>
                <Route path="/watchlist">
                    watch
                </Route>
                <Route exact path="/">
                    <div className="container">
                        <div className="slider">
                            <ul className="slides">
                                <li>
                                    <img src="https://cdn.pixabay.com/photo/2020/04/21/06/41/flower-5071405_1280.jpg"/>
                                    <div className="caption center-align">
                                        <h3>This is our big Tagline!</h3>
                                        <h5 className="light grey-text text-lighten-3">Here's our small
                                            slogan.</h5>
                                    </div>
                                </li>
                                <li>
                                    <img src="https://cdn.pixabay.com/photo/2020/01/04/00/07/sea-4739448_1280.jpg"/>
                                    <div className="caption left-align">
                                        <h3>Left Aligned Caption</h3>
                                        <h5 className="light grey-text text-lighten-3">Here's our small
                                            slogan.</h5>
                                    </div>
                                </li>
                                <li>
                                    <img src="https://cdn.pixabay.com/photo/2020/09/19/10/37/seascape-5584129_1280.jpg"/>
                                    <div className="caption right-align">
                                        <h3>Right Aligned Caption</h3>
                                        <h5 className="light grey-text text-lighten-3">Here's our small
                                            slogan.</h5>
                                    </div>
                                </li>
                                <li>
                                    <img src="https://cdn.pixabay.com/photo/2019/10/02/06/27/mood-4520112_1280.jpg"/>
                                    <div className="caption center-align">
                                        <h3>This is our big Tagline!</h3>
                                        <h5 className="light grey-text text-lighten-3">Here's our small
                                            slogan.</h5>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Route>
                <Route path="/watched">
                    watchsdfsd
                </Route>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
