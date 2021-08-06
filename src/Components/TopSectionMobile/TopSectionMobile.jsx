import React from 'react'
import {Container} from 'react-bootstrap'
import {motion} from 'framer-motion'

const TopSectionMobile = () => {
    return (
        <div className='top'>
            <Container>
                <div className='top__inner'>
                    <div className='top__content'>
                        <motion.h2 className="top__title"
                                   initial={{opacity: 0}}
                                   animate={{opacity: 1, transition: {delay: .2, duration: .4}}}
                        >Welcome.
                        </motion.h2>
                        <motion.p className="top__text"
                                  initial={{opacity: 0}}
                                  animate={{opacity: 1, transition: {delay: .6, duration: .8}}}
                        >Millions of movie to discover. Explore now.
                        </motion.p>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default TopSectionMobile