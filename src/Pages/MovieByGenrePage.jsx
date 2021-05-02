import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import {connect} from "react-redux";
import {getGenre, getMovieByGenre, getMoviesBySearch} from "../redux/movie-reducer";
import Container from "react-bootstrap/cjs/Container";
import {Button, Dropdown, ListGroup, Pagination, ProgressBar, Spinner} from "react-bootstrap";


function MovieByGenrePage({getMovieByGenre, genres, moviesByGenre, getGenre, isFetching, getMoviesBySearch}) {
    const [textInput, setTextInput] = useState('')
    const [activeBtn, setActiveBtn] = useState(false)

    useEffect(() => {
        getGenre()
    }, [])

    const onGenreChange = (id) => {
        getMovieByGenre(id)

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
                            return  <ListGroup.Item  key={g.id}  onClick={() => onGenreChange(g.id)} as="li">
                                {g.name}
                            </ListGroup.Item>
                        })}
                    </ListGroup>
                </div>
                <div className="col-9">
                    <div className="search-input__wrapper">
                        <input className="main-input" type="text" placeholder="Search for a movie" value={textInput} onChange={onInputChange}/>
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
                                            <img className="img-fluid card-img" src={m.poster} alt={m.title}/>
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
                                <div className="row d-flex w-100 justify-content-center">
                                    <Pagination>
                                        <Pagination.First/>
                                        <Pagination.Prev/>
                                        <Pagination.Item>{1}</Pagination.Item>
                                        <Pagination.Ellipsis/>

                                        <Pagination.Item>{10}</Pagination.Item>
                                        <Pagination.Item>{11}</Pagination.Item>
                                        <Pagination.Item active>{12}</Pagination.Item>
                                        <Pagination.Item>{13}</Pagination.Item>
                                        <Pagination.Item disabled>{14}</Pagination.Item>

                                        <Pagination.Ellipsis/>
                                        <Pagination.Item>{20}</Pagination.Item>
                                        <Pagination.Next/>
                                        <Pagination.Last/>
                                    </Pagination>
                                </div>

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
        genres: state.movieApp.genres,
        moviesByGenre: state.movieApp.moviesByGenre,
        isFetching: state.movieApp.isFetching,
        moviesBySearch: state.movieApp.moviesBySearch,
    }
}

export default connect(mapStateToProps, {
    getMovieByGenre,
    getGenre,
    getMoviesBySearch
})(MovieByGenrePage);