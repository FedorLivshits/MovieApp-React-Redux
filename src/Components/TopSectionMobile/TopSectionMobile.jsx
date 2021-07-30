import React from 'react'
import {Container} from 'react-bootstrap'

const TopSectionMobile = (props) => {
    return (
        <div className='top'>
            <Container>
                <div className='top__inner'>
                    <div className='top__content'>
                        <h2 className="top__title">Welcome.</h2>
                        <p className="top__text">Millions of movie to discover. Explore now.</p>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default TopSectionMobile