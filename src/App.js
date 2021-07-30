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
import {Image} from 'react-bootstrap'


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
            return <Image
                src="https://www.colorhexa.com/d3d3d3.png"
                alt="img"
                fluid
                rounded
            />
        }
        return <Image
            src={anyString}
            alt="img"
            fluid
            rounded
        />
    }
    const isNoneImgForMovie = (anyString) => {
        let anyString4 = anyString.substring(anyString.length - 4)
        if (anyString4 === 'null') {
            return <Image
                src="https://www.colorhexa.com/d3d3d3.png"
                alt="img"
                fluid
            />
        }
        return <Image
            src={anyString}
            alt="img"
            fluid
        />
    }
    return <div className="app">
        <Header screenWidth={screenWidth}/>
        <Route exact path="/" render={() => <MainPage isNoneImgForPerson={isNoneImgForPerson} screenWidth={screenWidth}/>}/>
        <Route path="/movies" render={() => <MoviesPage isNoneImgForMovie={isNoneImgForMovie} screenWidth={screenWidth}/>}/>
        <Route path="/movie/:id" render={() => <MoviePage isNoneImgForPerson={isNoneImgForPerson} screenWidth={screenWidth}/>}/>
        <Route path="/watchlist" render={() => <WatchlistPage isNoneImgForMovie={isNoneImgForMovie}/>}/>
        <Route path="/person/:id" render={() => <PersonPage/>}/>
        <Footer/>
    </div>
}


export default App
