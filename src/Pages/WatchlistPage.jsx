import React, {useEffect} from 'react';
import CarouselComponent from "../Components/CarouselComponent/CarouselComponent";
import {connect} from "react-redux";
import {Container, Spinner} from "react-bootstrap";
import TrendingPersons from "../Components/TrendingPersons/TrendingPersons";
import TopRatedMovies from "../Components/TopRatedMovies/TopRatedMovies";
import PopularMovies from "../Components/PopularMovies/PopularMovies";
import {initializeMainPage} from "../redux/initial-reducer";
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Paginator from "../Components/Paginator/Paginator";

const MainPage = ({watchlist, isNoneImgForMovie}) => {
    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }, [watchlist]);

    return (
        <>
            <Container>
                <div className="row mt-3 justify-content-center">
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
                        </div>
                    </div>)}
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

export default connect(mapStateToProps, null)(MainPage);