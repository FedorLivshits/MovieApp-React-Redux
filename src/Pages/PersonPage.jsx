import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {Card, Container, Spinner} from "react-bootstrap";
import PersonMovies from "../Components/PersonMovies/PersonMovies";
import {initializePersonPage} from "../redux/initial-reducer";


const PersonPage = ({personDetail, match, isFetching, personMovies, initializePersonPage, initializedPersonPage}) => {
    let params = match.params

    useEffect(() => {
        initializePersonPage(params.id)
    }, [params.id])

    const isNotEmptyObj = (obj) => {
        for (let key in obj) {
            return true;
        }
        return false;
    }

    if (!initializedPersonPage) {
        return <div className="row mt-3 d-flex justify-content-center">
            <Spinner animation="grow" variant="primary"/>
        </div>
    }
    return (
        <>
            {
                (isNotEmptyObj(personDetail))
                    ?
                    <>
                        {isFetching
                            ?
                            <div className="row mt-3 d-flex justify-content-center">
                                <Spinner animation="grow" variant="primary"/>
                            </div>
                            :
                            <div className="movie-page">
                                <Container>
                                    <div className="movie-page__content">
                                        <div className="row">
                                            <div className="col-4">
                                                <Card style={{width: '18rem'}} className="movie-card">
                                                    <Card.Img variant="top"
                                                              src={'https://image.tmdb.org/t/p/w200' + personDetail['profile_path']}/>
                                                </Card>
                                            </div>
                                            <div className="col-8">
                                                <h2>{personDetail.name}</h2>
                                                <p>{personDetail.birthday.split("-").reverse().join('/')}</p>
                                                <h4>Biography:</h4>
                                                <p>{personDetail.biography}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <PersonMovies personMovies={personMovies}/>
                                </Container>
                            </div>
                        }
                    </>
                    :
                    ""
            }
        </>
    );
}


const mapStateToProps = (state) => {
    return {
        personDetail: state.personPage.personDetail,
        personMovies: state.personPage.personMovies,
        isFetching: state.moviesPage.isFetching,
        initializedPersonPage: state.initial.initializedPersonPage
    }
}
export default compose(
    connect(mapStateToProps, {initializePersonPage}),
    withRouter,
)(PersonPage);