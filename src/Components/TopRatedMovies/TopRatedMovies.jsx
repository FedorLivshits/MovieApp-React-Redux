import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import ReactStars from 'react-rating-stars-component'
import { Link } from 'react-router-dom'
import { IsImageNull } from '../IsImageNull/IsImageNull'

const TopRatedMovies = ({ topRatedMovies }) => (
	<>
		<Row className='mt-5 mb-3'>
			<Col className='ml-3'>
				<p className='font-weight-bold'>Top Rated Movies</p>
			</Col>
		</Row>
		<div className='scrolling-wrapper'>
			{topRatedMovies.map(m => {
				return (
					<Col lg={2} md={3} sm={4} xs={6} className='my-card' key={m.id}>
						<Card>
							<Link to={`/movie/${m.id}`}>
								<IsImageNull inputImage={m.poster} />
							</Link>
						</Card>
						<div className='mt-2'>
							<p style={{ fontWeight: 'bolder' }}>{m.title}</p>
							<p className='mb-0'>Rated: {m.rating}</p>
							<ReactStars
								value={m.rating}
								count={10}
								size={15}
								color1={'#f4c10f'}
							/>
						</div>
					</Col>
				)
			})}
		</div>
	</>
)

export default TopRatedMovies
