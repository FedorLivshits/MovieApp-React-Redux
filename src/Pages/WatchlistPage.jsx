import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {Button, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import {removeMovieFromWatchlist} from "../redux/watchlist-reducer";

const WatchlistPage = ({watchlist, isNoneImgForMovie, removeMovieFromWatchlist}) => {
    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }, [watchlist]);

    return (
        <>
            <Container>
                <div className="row mt-3 justify-content-center">
                    {watchlist.length > 0 ? (
                        <>
                            {watchlist.map(m => <div className="col-md-2 col-sm-6 card  mb-3 ml-3" key={m.id}>
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
                                    <Button variant="danger" className="w-100"
                                            onClick={() => removeMovieFromWatchlist(m.id)}>delete</Button>
                                </div>
                            </div>)}
                        </>
                    ) : (
                        <h2 className="no-movies">No movies in your list! Add some!</h2>
                    )}

                </div>
            </Container>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        watchlist: state.watchlistPage.watchlist
    }
}

export default connect(mapStateToProps, {removeMovieFromWatchlist})(WatchlistPage);