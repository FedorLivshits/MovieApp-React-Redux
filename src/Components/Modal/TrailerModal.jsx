import {Modal} from 'react-bootstrap'
import ReactPlayer from 'react-player'
import React from 'react'

const TrailerModal = (props) => {
    const youtubeUrl = 'https://www.youtube.com/watch?v='

    return (
        <>
            {props.isNotEmptyObj(props.trailer)
                ?
                <Modal
                    {...props}
                    size='lg'
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Body className="m-0 p-0">
                        <ReactPlayer
                            className="container-fluid p-0"
                            url={youtubeUrl + props.trailer.key}
                            playing
                            width="100%"
                        />
                    </Modal.Body>
                </Modal>
                :
                null
            }
        </>
    )
}
export default TrailerModal