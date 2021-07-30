import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import {connect} from "react-redux";
import Container from "react-bootstrap/cjs/Container";
import {DropdownButton, ListGroup, Spinner, Dropdown} from 'react-bootstrap'
import Paginator from "../Components/Paginator/Paginator";
import {getGenre, getMovieByGenre, getMoviesBySearch} from "../redux/moviesPage-reducer";


const MoviesPage = ({getMovieByGenre, genres, moviesByGenre, getGenre, isFetching, getMoviesBySearch, pages, isNoneImgForMovie, screenWidth}) => {
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
        <Container fluid>
            <div className="row movies-page">
                {screenWidth > 780
                ?
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
                    :
                    <DropdownButton id="dropdown-basic-button" title="Dropdown button" className="mb-3">
                        {genres.map(g => {
                            return <Dropdown.Item  className={currentGenreId === g.id ? "active" : ""} key={g.id}
                                                   onClick={() => onGenreChange(g.id)}>
                                {g.name}
                            </Dropdown.Item >
                        })}
                    </DropdownButton>
                }
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
                                        {isNoneImgForMovie(m.poster)}
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