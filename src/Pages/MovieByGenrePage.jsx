import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import {connect} from "react-redux";
import {getGenre, getMovieByGenre} from "../redux/movie-reducer";
import Container from "react-bootstrap/cjs/Container";
import {Button, Pagination, ProgressBar, Spinner} from "react-bootstrap";


function MovieByGenrePage({getMovieByGenre, genres, moviesByGenre, getGenre, isFetching}) {
    useEffect(() =>{
        getGenre()
    }, [])

    const onGenreChange = (id) => {
        getMovieByGenre(id)
    }
    const showMore = (id) => {
        getMovieByGenre(id)
    }

    return (
        <Container>
            <div className="row">
                <div className="col-3">
                    <div className="search-input__wrapper">
                        <input type="text" placeholder="Search for a movie"/>
                        <button  className="search-film-btn">
                            search
                        </button>
                    </div>
                    <div className="genre-list-wrapper">
                        <ul className="genre-list">
                            {genres.map(g => {
                                return <li key={g.id} className="list-inline-item">
                                    <button className="btn btn-outline-info"
                                            onClick={() => onGenreChange(g.id)}>{g.name}</button>
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
                <div className="col-9">
                    {isFetching
                        ?
                        <Spinner animation="grow" variant="primary"/>
                    :
                        <div className="row mt-3">
                            {moviesByGenre.map(m => {
                                return <div className="col-md-3 col-sm-6" key={m.id}>
                                    <div className="card">
                                        <Link to={`/movie/${m.id}`}>
                                            <img className="img-fluid" src={m.poster} alt={m.title}/>
                                        </Link>
                                    </div>
                                    <div className="mt-2">
                                        <p style={{fontWeight: "bolder"}}>{m.title}</p>
                                        <p>Rated: {m.rating}</p>
                                        <ReactStars
                                            value={m.rating}
                                            count={10}
                                            size={15}
                                            color1={"#f4c10f"}
                                        />
                                    </div>
                                </div>
                            })}
                            {moviesByGenre.length
                                ?
                                <Pagination>
                                    <Pagination.First />
                                    <Pagination.Prev />
                                    <Pagination.Item>{1}</Pagination.Item>
                                    <Pagination.Ellipsis />

                                    <Pagination.Item>{10}</Pagination.Item>
                                    <Pagination.Item>{11}</Pagination.Item>
                                    <Pagination.Item active>{12}</Pagination.Item>
                                    <Pagination.Item>{13}</Pagination.Item>
                                    <Pagination.Item disabled>{14}</Pagination.Item>

                                    <Pagination.Ellipsis />
                                    <Pagination.Item>{20}</Pagination.Item>
                                    <Pagination.Next />
                                    <Pagination.Last />
                                </Pagination>
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
    }
}

export default connect(mapStateToProps, {
    getMovieByGenre,
    getGenre
})(MovieByGenrePage);