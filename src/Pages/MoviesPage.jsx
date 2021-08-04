import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import {
    Card,
    Col,
    Dropdown,
    DropdownButton,
    ListGroup,
    Row,
    Spinner
} from 'react-bootstrap'
import Container from 'react-bootstrap/cjs/Container'
import ReactStars from 'react-rating-stars-component'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { IsImageNull } from '../Components/IsImageNull/IsImageNull'
import Paginator from '../Components/Paginator/Paginator'
import {
    getGenre,
    getMovieByGenre,
    getMoviesBySearch
} from '../redux/moviesPage-reducer'

const MoviesPage = ({
	getMovieByGenre,
	genres,
	moviesByGenre,
	getGenre,
	isFetching,
	getMoviesBySearch,
	pages,
	screenWidth,
}) => {
	const [textInput, setTextInput] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [currentGenreId, setCurrentGenreId] = useState(null)

	useEffect(() => {
		getGenre()
	}, [])

	const onGenreChange = id => {
		setCurrentGenreId(id)
		getMovieByGenre(id, currentPage)
	}
	const onPageChange = page => {
		setCurrentPage(page)
		getMovieByGenre(currentGenreId, page)
	}
	const onInputChange = e => {
		e.preventDefault()
		setTextInput(e.target.value)
	}
	const searchMovie = () => {
		getMoviesBySearch(textInput)
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 0.4 } }}
			exit={{ opacity: 0 }}>
			<Container fluid>
				<Row className='mt-5 mb-5'>
					{screenWidth > 768 ? (
						<Col xl={2} lg={3} md={3} sm={12} xs={12}>
							<ListGroup as='ul'>
								{genres.map(g => {
									return (
										<ListGroup.Item
											className={currentGenreId === g.id ? 'active' : ''}
											key={g.id}
											onClick={() => onGenreChange(g.id)}
											as='li'>
											{g.name}
										</ListGroup.Item>
									)
								})}
							</ListGroup>
						</Col>
					) : (
						<DropdownButton title='Genre' className='mb-3'>
							{genres.map(g => {
								return (
									<Dropdown.Item
										className={currentGenreId === g.id ? 'active' : ''}
										key={g.id}
										onClick={() => onGenreChange(g.id)}>
										{g.name}
									</Dropdown.Item>
								)
							})}
						</DropdownButton>
					)}
					<Col xl={10} lg={9} md={9} sm={12} xs={12}>
						<div className='search__movies'>
							<input
								className='search__movies-input'
								type='text'
								placeholder='Search for a movie'
								value={textInput}
								onChange={onInputChange}
							/>
							<button className='search__movies-btn' onClick={searchMovie}>
								search
							</button>
						</div>
						{!moviesByGenre.length && (
							<div className='row mt-3 d-flex justify-content-center'>
								<h2 className='search__movies-none'>
									Search movies or choose by genre
								</h2>
							</div>
						)}
						{isFetching ? (
							<Row className='mt-3 d-flex justify-content-center'>
								<Spinner animation='grow' variant='primary' />
							</Row>
						) : (
							<Row className='mt-3 justify-content-center'>
								{moviesByGenre.map(m => {
									return (
										<Col
											xl={2}
											lg={3}
											md={4}
											sm={4}
											xs={6}
											key={m.id}
											className='mb-3'>
											<Card className='mb-2'>
												<Link to={`/movie/${m.id}`}>
													<IsImageNull inputImage={m.poster} />
												</Link>
											</Card>
											<p style={{ fontWeight: 'bolder', whiteSpace: 'nowrap' }}>
												{m.title}
											</p>
											<p className='mb-0'>Rated: {m.rating}</p>
											<ReactStars
												value={m.rating}
												count={10}
												size={15}
												color1={'#f4c10f'}
											/>
										</Col>
									)
								})}
							</Row>
						)}
						{moviesByGenre.length ? (
							<Row className='mt-3'>
								<Col>
									<Paginator
										pages={pages}
										onPageChange={onPageChange}
										currentPage={currentPage}
										screenWidth={screenWidth}
									/>
								</Col>
							</Row>
						) : (
							''
						)}
					</Col>
				</Row>
			</Container>
		</motion.div>
	)
}

const mapStateToProps = state => {
	return {
		genres: state.moviesPage.genres,
		moviesByGenre: state.moviesPage.moviesByGenre,
		isFetching: state.moviesPage.isFetching,
		moviesBySearch: state.moviesPage.moviesBySearch,
		pages: state.moviesPage.pages,
	}
}

export default connect(mapStateToProps, {
	getMovieByGenre,
	getGenre,
	getMoviesBySearch,
})(MoviesPage)
