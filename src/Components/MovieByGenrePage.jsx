import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import {connect} from "react-redux";
import {getGenre, getMovieByGenre} from "../redux/movie-reducer";


function MovieByGenrePage({getMovieByGenre, genres, moviesByGenre, getGenre}) {
    useEffect(() =>{
        getGenre()
    }, [])

    const onGenreChange = (id) => {
        getMovieByGenre(id)
    }

    return (
        <>
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
            <div className="row mt-2">
                {moviesByGenre.map(m => {
                    return <div className="col-md-2 col-sm-3" key={m.id}>
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
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        genres: state.movieApp.genres,
        moviesByGenre: state.movieApp.moviesByGenre,
    }
}

export default connect(mapStateToProps, {
    getMovieByGenre,
    getGenre
})(MovieByGenrePage);