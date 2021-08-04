import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import { removeMovieFromWatchlist } from '../redux/watchlist-reducer'
import { motion } from 'framer-motion'
import { IsImageNull } from '../Components/IsImageNull/IsImageNull'

const WatchlistPage = ({ watchlist, removeMovieFromWatchlist }) => {
	useEffect(() => {
		localStorage.setItem('watchlist', JSON.stringify(watchlist))
	}, [watchlist])

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 0.4 } }}
			exit={{ opacity: 0 }}>
			<Container>
				<Row className='mt-3 justify-content-center'>
					{watchlist.length > 0 ? (
						<>
							{watchlist.map(m => (
								<Col
									xl={2}
									lg={3}
									md={4}
									sm={4}
									xs={6}
									className='mb-3'
									key={m.id}>
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
									<Button
										variant='danger'
										className='w-100'
										onClick={() => removeMovieFromWatchlist(m.id)}>
										delete
									</Button>
								</Col>
							))}
						</>
					) : (
						<h2 className='search__movies-none'>
							No movies in your list! Add some!
						</h2>
					)}
				</Row>
			</Container>
		</motion.div>
	)
}

const mapStateToProps = state => {
	return {
		watchlist: state.watchlistPage.watchlist,
	}
}

export default connect(mapStateToProps, { removeMovieFromWatchlist })(
	WatchlistPage
)
