import './App.scss'
import './lib/font-awesome/css/all.min.css'
import Header from './Components/Header/Header'
import React, {useEffect, useState} from 'react'
import {Route} from 'react-router-dom'
import Footer from './Components/Footer/Footer'
import MainPage from './Pages/MainPage'
import MoviePage from './Pages/MoviePage'
import MoviesPage from './Pages/MoviesPage'
import PersonPage from './Pages/PersonPage'
import WatchlistPage from './Pages/WatchlistPage'


const App = () => {
    const [screenWidth, setScreenWidth] = useState(document.documentElement.clientWidth)

    useEffect(() => {
        window.addEventListener('resize', () => {
            setScreenWidth(document.documentElement.clientWidth)
        })
    })

    return <div className="app">
        <Header screenWidth={screenWidth}/>
        <Route exact path="/" render={() => <MainPage screenWidth={screenWidth}/>}/>
        <Route path="/movies" render={() => <MoviesPage screenWidth={screenWidth}/>}/>
        <Route path="/movie/:id" render={() => <MoviePage screenWidth={screenWidth}/>}/>
        <Route path="/watchlist" render={() => <WatchlistPage/>}/>
        <Route path="/person/:id" render={() => <PersonPage/>}/>
        <Footer/>
    </div>
}


export default App
