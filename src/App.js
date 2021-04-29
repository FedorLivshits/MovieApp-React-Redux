import './App.css';
import Header from "./Components/Header";
import React from "react";
import {BrowserRouter, Route} from "react-router-dom";

function App() {

    return (
            <BrowserRouter>
                <div className="app">
                    <Header/>
                        <Route path="/watchlist">
                            watch
                        </Route>
                        <Route exact path="/">
                            watchd
                        </Route>
                        <Route path="/watched">
                            watchsdfsd
                        </Route>
                </div>
            </BrowserRouter>
    );
}

export default App;
