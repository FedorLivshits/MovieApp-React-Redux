import './App.css'
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
    const [screenWidth, setScreenWidth] = useState(0)

    useEffect(() => {
        window.addEventListener('resize', () => {
            setScreenWidth(document.documentElement.clientWidth)
        })
    })
    const isNoneImgForPerson = (anyString) => {
        let anyString4 = anyString.substring(anyString.length - 4)
        if (anyString4 === 'null') {
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
    const isNoneImgForMovie = (anyString) => {
        let anyString4 = anyString.substring(anyString.length - 4)
        if (anyString4 === 'null') {
            return <img
                className="img-fluid"
                src="https://www.colorhexa.com/d3d3d3.png"
                alt="img"
            />
        }
        return <img
            className="img-fluid"
            src={anyString}
            alt="img"
        />
    }
    return <div className="app">
        <Header/>
        <Route exact path="/" render={() => <MainPage isNoneImgForPerson={isNoneImgForPerson} screenWidth={screenWidth}/>}/>
        <Route path="/movies" render={() => <MoviesPage isNoneImgForMovie={isNoneImgForMovie} screenWidth={screenWidth}/>}/>
        <Route path="/movie/:id" render={() => <MoviePage isNoneImgForPerson={isNoneImgForPerson}/>}/>
        <Route path="/watchlist" render={() => <WatchlistPage isNoneImgForMovie={isNoneImgForMovie}/>}/>
        <Route path="/person/:id" render={() => <PersonPage/>}/>
        <Footer/>
    </div>
}


export default App
