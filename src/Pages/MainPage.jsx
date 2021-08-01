import React, {useEffect} from 'react'
import CarouselComponent from '../Components/CarouselComponent/CarouselComponent'
import {connect} from 'react-redux'
import {Container, Spinner} from 'react-bootstrap'
import TrendingPersons from '../Components/TrendingPersons/TrendingPersons'
import TopRatedMovies from '../Components/TopRatedMovies/TopRatedMovies'
import PopularMovies from '../Components/PopularMovies/PopularMovies'
import {initializeMainPage} from '../redux/initial-reducer'

const MainPage = props => {
    useEffect(() => {
        props.initializeMainPage()
    }, [])

    if (!props.initializedMainPage) {
        return <div className="row mt-3 d-flex justify-content-center">
            <Spinner animation="grow" variant="primary"/>
        </div>
    }
    return (
        <>
            <CarouselComponent movies={props.movies} screenWidth={props.screenWidth}/>
            <Container fluid>
                <PopularMovies popularMovies={props.popularMovies}/>
                <TopRatedMovies topRatedMovies={props.topRatedMovies}/>
                <TrendingPersons trendingPersons={props.trendingPersons}/>
            </Container>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        movies: state.mainPage.movies,
        trendingPersons: state.mainPage.trendingPersons,
        topRatedMovies: state.mainPage.topRatedMovies,
        popularMovies: state.mainPage.popularMovies,
        initializedMainPage: state.initial.initializedMainPage
    }
}

export default connect(mapStateToProps, {
    initializeMainPage
})(MainPage)