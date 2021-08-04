import React from 'react'
import {Link} from 'react-router-dom'
import {Image} from 'react-bootstrap'
import ReactStars from 'react-rating-stars-component'
import { IsImageNull } from '../IsImageNull/IsImageNull'


const HeaderSearchMovieCard = ({movie, closeSearchList}) => {
    return (
        <li key={movie.id}>
            <div className="header__search-item">
                <div className="header__search-img">
                    {movie.poster_path
                        ? (
                            <Link to={`/movie/${movie.id}`} onClick={closeSearchList}>
                                <IsImageNull inputImage={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}/>
                            </Link>
                        )
                        : (
                            <div className="filler-poster">
                            </div>
                        )
                    }
                </div>
                <div className="header__search-info">
                    <div className="header__search-title">
                        <Link to={`/movie/${movie.id}`} onClick={closeSearchList}>
                            <h3>
                                {movie.title}
                            </h3>
                        </Link>
                        <h4 className="header__search-date">
                            {movie.release_date ? movie.release_date.slice(0, 4) : ''}
                        </h4>
                        <p className="mb-0">Rated: {movie.vote_average}</p>
                        <ReactStars
                            value={movie.vote_average}
                            count={10}
                            size={15}
                            color1={'#f4c10f'}
                        />
                    </div>
                </div>
            </div>
        </li>
    )
}

export default HeaderSearchMovieCard