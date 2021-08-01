import React from 'react'
import {Link} from 'react-router-dom'
import {Col, Image, Row} from 'react-bootstrap'


const MovieCast = ({movieCast}) => (
    <>
        <Row className="mt-5 mb-3">
            <Col className="ml-3">
                <p className="font-weight-bold">
                    Film Cast
                </p>
            </Col>
        </Row>
        <div className="scrolling-wrapper">
            {movieCast.map(p => {
                return <Col lg={2} md={3} sm={4} xs={6} className="my-card text-center" key={p.id}>
                    <Link to={`/person/${p.id}`}>
                        {console.log(p.img)}
                        <Image fluid rounded src={p.img} alt=''/>
                    </Link>
                    <p className="font-weight-bold text-center">{p.name}</p>
                    <p
                        className="font-weight-light text-center"
                        style={{color: '#5a606b'}}
                    >
                        {p.character ? p.character : "not specified"}
                    </p>
                </Col>
            })}
        </div>
    </>
)

export default MovieCast