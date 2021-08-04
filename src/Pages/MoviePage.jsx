import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import CarouselForMovie from '../Components/CarouselComponent/CarouselForMovie'
import TrailerModal from '../Components/Modal/TrailerModal'
import MovieCard from '../Components/MovieCard/MovieCard'
import SliderComponent from '../Components/SliderComponent/SliderComponent'
import { initializeMoviePage } from '../redux/initial-reducer'
import { setIsMoviePageOpen } from '../redux/moviePage-reducer'
import { addMovieToWatchlist } from '../redux/watchlist-reducer'

const MoviePage = ({
	movieDetails,
	match,
	isFetching,
	movieCast,
	similarMovies,
	trailer,
	initializeMoviePage,
	initializedMoviePage,
	watchlist,
	setIsMoviePageOpen,
	addMovieToWatchlist,
	screenWidth,
}) => {
	const [show, setShow] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const disabledBtn = () => {
		if (movieDetails) {
			let storedMovie = watchlist.find(o => o.id === movieDetails.id)
			return !!storedMovie
		}
	}

	let params = match.params

	useEffect(() => {
		initializeMoviePage(params.id)
		setIsMoviePageOpen(true)
		return function cleanup() {
			setIsMoviePageOpen(false)
		}
	}, [params.id])

	const isNotEmptyObj = obj => {
		for (let key in obj) {
			return true
		}
		return false
	}
	const onAddMovieToWatchlist = movieDetails => {
		addMovieToWatchlist(movieDetails)
	}
	if (!initializedMoviePage) {
		return (
			<Row className='mt-5 d-flex justify-content-center'>
				<Spinner animation='grow' variant='primary' />
			</Row>
		)
	}

	return (
		<>
			{isNotEmptyObj(movieDetails) ? (
				<>
					{isFetching ? (
						<div className='row mt-3 d-flex justify-content-center'>
							<Spinner animation='grow' variant='primary' />
						</div>
					) : (
						<div className='movie-page'>
							{screenWidth > 710 ? (
								<CarouselForMovie
									movieDetails={movieDetails}
									handleShow={handleShow}
								/>
							) : null}
							<Col className='mt-5 mb-5'>
								<Container>
									<MovieCard
										movieDetails={movieDetails}
										onAddMovieToWatchlist={onAddMovieToWatchlist}
										disabledBtn={disabledBtn}
										screenWidth={screenWidth}
										handleShow={handleShow}
									/>
								</Container>
							</Col>
							<Container>
								<SliderComponent
									title={'Film Cast'}
									array={movieCast}
									isForPersons={true}
									movieCast={true}
								/>
								{similarMovies.length && (
									<SliderComponent
										title={'Similar Movies'}
										array={similarMovies}
									/>
								)}
								<TrailerModal
									show={show}
									onHide={handleClose}
									trailer={trailer}
									isNotEmptyObj={isNotEmptyObj}
								/>
							</Container>
						</div>
					)}
				</>
			) : (
				''
			)}
		</>
	)
}

const mapStateToProps = state => {
	return {
		movieDetails: state.moviePage.movieDetails,
		movieCast: state.moviePage.movieCast,
		similarMovies: state.moviePage.similarMovies,
		trailer: state.moviePage.trailer,
		isFetching: state.moviesPage.isFetching,
		initializedMoviePage: state.initial.initializedMoviePage,
		watchlist: state.watchlistPage.watchlist,
	}
}
export default compose(
	connect(mapStateToProps, {
		initializeMoviePage,
		setIsMoviePageOpen,
		addMovieToWatchlist,
	}),
	withRouter
)(MoviePage)
