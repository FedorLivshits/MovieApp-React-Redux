import {motion} from 'framer-motion'
import React, {useEffect} from 'react'
import {Col, Container, Row, Spinner} from 'react-bootstrap'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {compose} from 'redux'
import PersonCard from '../Components/PersonCard/PersonCard'
import SliderComponent from '../Components/SliderComponent/SliderComponent'
import {initializePersonPage} from '../redux/initial-reducer'

const PersonPage = ({
                        personDetail,
                        match,
                        isFetching,
                        personMovies,
                        initializePersonPage,
                        initializedPersonPage,
                    }) => {
    let params = match.params

    useEffect(() => {
        initializePersonPage(params.id)
    }, [params.id])

    const isNotEmptyObj = obj => {
        for (let key in obj) {
            return true
        }
        return false
    }

    if (!initializedPersonPage) {
        return (
            <div className='row mt-3 d-flex justify-content-center'>
                <Spinner animation='grow' variant='primary'/>
            </div>
        )
    }
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1, transition: {duration: 0.4}}}
            exit={{opacity: 0}}>
            {isNotEmptyObj(personDetail) ? (
                <>
                    {isFetching ? (
                        <Row className='mt-3 d-flex justify-content-center'>
                            <Spinner animation='grow' variant='primary'/>
                        </Row>
                    ) : (
                        <div className='mt-5 mb-5'>
                            <Container>
                                <Col className='movie-page__content'>
                                    <PersonCard personDetail={personDetail}/>
                                </Col>
                                <SliderComponent title={'Known for'} array={personMovies}/>
                            </Container>
                        </div>
                    )}
                </>
            ) : (
                ''
            )}
        </motion.div>
    )
}

const mapStateToProps = state => {
    return {
        personDetail: state.personPage.personDetail,
        personMovies: state.personPage.personMovies,
        isFetching: state.moviesPage.isFetching,
        initializedPersonPage: state.initial.initializedPersonPage,
    }
}
export default compose(
    connect(mapStateToProps, {initializePersonPage}),
    withRouter
)(PersonPage)
