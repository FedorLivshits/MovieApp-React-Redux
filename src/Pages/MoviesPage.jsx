import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import {connect} from "react-redux";
import Container from "react-bootstrap/cjs/Container";
import {ListGroup, Spinner} from "react-bootstrap";
import Paginator from "../Components/Paginator/Paginator";
import {getGenre, getMovieByGenre, getMoviesBySearch} from "../redux/moviesPage-reducer";


const MoviesPage = ({getMovieByGenre, genres, moviesByGenre, getGenre, isFetching, getMoviesBySearch, pages}) => {
    const [textInput, setTextInput] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [currentGenreId, setCurrentGenreId] = useState(null)

    useEffect(() => {
        getGenre()
    }, [])

    const onGenreChange = (id) => {
        setCurrentGenreId(id)
        getMovieByGenre(id, currentPage)
    }
    const onPageChange = (page) => {
        setCurrentPage(page)
        getMovieByGenre(currentGenreId, page)
    }
    const onInputChange = (e) => {
        e.preventDefault()
        setTextInput(e.target.value)
    }
    const searchMovie = () => {
        getMoviesBySearch(textInput)
    }

    return (
        <Container>
            <div className="row movies-page">
                <div className="col-3">
                    <ListGroup as="ul">
                        {genres.map(g => {
                            return <ListGroup.Item className={currentGenreId === g.id ? "active" : ""} key={g.id}
                                                   onClick={() => onGenreChange(g.id)} as="li">
                                {g.name}
                            </ListGroup.Item>
                        })}
                    </ListGroup>
                </div>
                <div className="col-9">
                    <div className="search-input__wrapper">
                        <input className="main-input" type="text" placeholder="Search for a movie" value={textInput}
                               onChange={onInputChange}/>
                        <button className="search-film-btn" onClick={searchMovie}>
                            search
                        </button>
                    </div>
                    {!moviesByGenre.length && <div className="row mt-3 d-flex justify-content-center">
                        <h2 className="no-movies">Search movies or choose by genre</h2>
                    </div>
                    }
                    {isFetching
                        ?
                        <div className="row mt-3 d-flex justify-content-center">
                            <Spinner animation="grow" variant="primary"/>
                        </div>
                        :
                        <div className="row mt-3 justify-content-center">
                            {moviesByGenre.map(m => {
                                return <div className="col-md-2 col-sm-6 card  mb-3 ml-3" key={m.id}>
                                    <Link to={`/movie/${m.id}`}>
                                        {m.poster
                                            ?
                                            <img className="img-fluid card-img" src={m.poster} alt={m.title}/>
                                            :
                                            <div className="none-img"/>}
                                    </Link>
                                    <div className="mt-2 p-2">
                                        <ReactStars
                                            value={m.rating}
                                            count={10}
                                            size={13}
                                            color1={"#f4c10f"}
                                        />
                                        <div className="movie-info">
                                            <p>Rated: {m.rating}</p>
                                            <p className="card-title" style={{fontWeight: "bolder"}}>{m.title}</p>
                                        </div>
                                    </div>
                                </div>
                            })}
                            {moviesByGenre.length
                                ?
                                <Paginator pages={pages} onPageChange={onPageChange} currentPage={currentPage}/>
                                :
                                ""
                            }
                        </div>
                    }
                </div>
            </div>
        </Container>

    );
}

const mapStateToProps = (state) => {
    return {
        genres: state.moviesPage.genres,
        moviesByGenre: state.moviesPage.moviesByGenre,
        isFetching: state.moviesPage.isFetching,
        moviesBySearch: state.moviesPage.moviesBySearch,
        pages: state.moviesPage.pages,
    }
}

export default connect(mapStateToProps, {
    getMovieByGenre,
    getGenre,
    getMoviesBySearch,
})(MoviesPage);