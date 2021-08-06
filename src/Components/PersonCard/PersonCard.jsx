import {motion} from 'framer-motion'
import React from 'react'
import {Card, Col, Row} from 'react-bootstrap'
import FadeInWhenVisible from '../FadeInWhenVisible/FadeInWhenVisible'
import {IsImageNull} from '../IsImageNull/IsImageNull'

const PersonCard = ({personDetail}) => {
    return (
        <Row>
            <Col md={4} sm={6} xs={12}>
                <Card
                    className='movie-card mb-3'
                    as={motion.div}
                    initial={{y: 100, opacity: 0}}
                    animate={{
                        y: 0,
                        opacity: 1,
                        transition: {duration: 0.8},
                    }}>
                    <IsImageNull
                        inputImage={
                            'https://image.tmdb.org/t/p/w200' +
                            personDetail['profile_path']
                        }
                    />
                </Card>
            </Col>
            <Col md={8} sm={6} xs={12}>
                <FadeInWhenVisible>
                    <h2>{personDetail.name}</h2>
                    {personDetail.birthday !== null && (
                        <p>
                            {personDetail.birthday
                                .split('-')
                                .reverse()
                                .join('/')}
                        </p>
                    )}
                    {personDetail.biography !== '' && (
                        <>
                            <h4>Biography:</h4>
                            <p>{personDetail.biography}</p>
                        </>
                    )}
                </FadeInWhenVisible>
            </Col>
        </Row>
    )
}
export default PersonCard