import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import ReactStars from 'react-rating-stars-component'
import { Link } from 'react-router-dom'
import { IsImageNull } from '../IsImageNull/IsImageNull'

const SliderComponent = ({
	title,
	array,
	isForPersons = false,
	movieCast = false,
}) => (
	<>
		<Row className='mt-5 mb-3'>
			<Col className='ml-3'>
				<p className='font-weight-bold'>{title}</p>
			</Col>
		</Row>
		{isForPersons ? (
			<div className='scrolling-wrapper'>
				{array.map(p => {
					return (
						<Col
							lg={2}
							md={3}
							sm={4}
							xs={6}
							className='my-card text-center'
							key={p.id}>
							<Link to={`/person/${p.id}`}>
								<IsImageNull inputImage={movieCast ? p.img : p.profileImg} />
							</Link>
							<p className='font-weight-bold text-center'>{p.name}</p>
							<p
								className='font-weight-light text-center'
								style={{ color: '#5a606b' }}>
								{movieCast ? (
									<>{p.character ? p.character : 'not specified'}</>
								) : (
									<>Trending for {p.known}</>
								)}
							</p>
						</Col>
					)
				})}
			</div>
		) : (
			<div className='scrolling-wrapper'>
				{array.map(item => {
					return (
						<Col lg={2} md={3} sm={4} xs={6} className='my-card' key={item.id}>
							<Card>
								<Link to={`/movie/${item.id}`}>
									<IsImageNull inputImage={item.poster} />
								</Link>
							</Card>
							<div className='mt-2'>
								<p style={{ fontWeight: 'bolder' }}>{item.title}</p>
								<p className='mb-0'>Rated: {item.rating}</p>
								<ReactStars
									value={item.rating}
									count={10}
									size={15}
									color1={'#f4c10f'}
								/>
							</div>
						</Col>
					)
				})}
			</div>
		)}
	</>
)

export default SliderComponent
