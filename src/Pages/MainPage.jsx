import React, {useEffect} from 'react'
import {Container, Spinner} from 'react-bootstrap'
import {connect} from 'react-redux'
import CarouselComponent from '../Components/CarouselComponent/CarouselComponent'
import FadeInWhenVisible from '../Components/FadeInWhenVisible/FadeInWhenVisible'
import SliderComponent from '../Components/SliderComponent/SliderComponent'
import {initializeMainPage} from '../redux/initial-reducer'

const MainPage = props => {
    useEffect(() => {
        props.initializeMainPage()
    }, [])

    if (!props.initializedMainPage) {
        return (
            <div className='row mt-3 d-flex justify-content-center'>
                <Spinner animation='grow' variant='primary'/>
            </div>
        )
    }
    return (
        <>
            <CarouselComponent
                movies={props.movies}
                screenWidth={props.screenWidth}
            />
            <Container fluid>
                {props.screenWidth < 710 ? (
                    <>
                        <FadeInWhenVisible>
                            <SliderComponent
                                title={'What\'s Popular'}
                                array={props.popularMovies}
                            />
                        </FadeInWhenVisible>
                        <FadeInWhenVisible>
                            <SliderComponent
                                title={'Top Rated Movies'}
                                array={props.topRatedMovies}
                            />
                        </FadeInWhenVisible>
                        <FadeInWhenVisible>
                            <SliderComponent
                                title={'Tranding Persons'}
                                array={props.trendingPersons}
                                isForPersons={true}
                            />
                        </FadeInWhenVisible>
                    </>
                ) : (
                    <>
                        <SliderComponent
                            title={'What\'s Popular'}
                            array={props.popularMovies}
                        />
                        <SliderComponent
                            title={'Top Rated Movies'}
                            array={props.topRatedMovies}
                        />
                        <SliderComponent
                            title={'Tranding Persons'}
                            array={props.trendingPersons}
                            isForPersons={true}
                        />
                    </>
                )}
            </Container>
        </>
    )
}

const mapStateToProps = state => {
    return {
        movies: state.mainPage.movies,
        trendingPersons: state.mainPage.trendingPersons,
        topRatedMovies: state.mainPage.topRatedMovies,
        popularMovies: state.mainPage.popularMovies,
        initializedMainPage: state.initial.initializedMainPage,
    }
}

export default connect(mapStateToProps, {
    initializeMainPage,
})(MainPage)
