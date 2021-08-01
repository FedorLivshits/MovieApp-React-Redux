import React from 'react';
import {Link} from "react-router-dom";
import {Col, Image, Row} from 'react-bootstrap'


const TrendingPersons = ({trendingPersons}) => {
    return <>
        <Row className="mt-5 mb-3">
            <Col className="ml-3">
                <p className="font-weight-bold">
                   Tranding Persons
                </p>
            </Col>
        </Row>
        <div className="scrolling-wrapper">
            {trendingPersons.map(p => {
                return <Col lg={2} md={3} sm={4} xs={6} className="my-card text-center" key={p.id}>
                    <Link to={`/person/${p.id}`}>
                        <Image src={p.profileImg} alt='' fluid rounded/>
                    </Link>
                    <p className="font-weight-bold text-center">{p.name}</p>
                    <p
                        className="font-weight-light text-center"
                        style={{color: "#5a606b"}}
                    >
                        Trending for {p.known}
                    </p>
                </Col>
            })}
        </div>
    </>
}

export default TrendingPersons;