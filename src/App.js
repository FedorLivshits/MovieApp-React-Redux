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
import {AnimatePresence} from 'framer-motion'


const App = () => {
    const [screenWidth, setScreenWidth] = useState(document.documentElement.clientWidth)

    useEffect(() => {
        window.addEventListener('resize', () => {
            setScreenWidth(document.documentElement.clientWidth)
        })
    })

    const isImageNull = (img) => {
        let str = img.substr(img.length - 4)
        if(str === 'null'){
            return true
        }else{
            return false
        }
      }

    return <div className="app">
        <Header screenWidth={screenWidth}/>
        <AnimatePresence>
            <Route exact path="/" render={() => <MainPage isImageNull={isImageNull} screenWidth={screenWidth}/>}/>
            <Route path="/movies" render={() => <MoviesPage screenWidth={screenWidth}/>}/>
            <Route path="/movie/:id" render={() => <MoviePage isImageNull={isImageNull} screenWidth={screenWidth}/>}/>
            <Route path="/watchlist" render={() => <WatchlistPage/>}/>
            <Route path="/person/:id" render={() => <PersonPage isImageNull={isImageNull}/>}/>
        </AnimatePresence>
        <Footer/>
    </div>
}


export default App
