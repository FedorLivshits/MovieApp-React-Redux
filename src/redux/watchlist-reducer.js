import {getActualFilms, getPopularMovies, getTopRatedMovies, getTrendingPerson} from "./mainPage-reducer";
import {getMovieCast, getMovieDetails, getSimilarMovies, getTrailer} from "./moviePage-reducer";
import {getPersonDetail, getPersonMovies} from "./personPage-reducer";

const ADD_MOVIE_TO_WATCHLIST= "initial-reducer/ADD_MOVIE_TO_WATCHLIST"


let initialState = {
    watchlist: localStorage.getItem("watchlist")
        ? JSON.parse(localStorage.getItem("watchlist"))
        : [],
}

const watchlistReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_MOVIE_TO_WATCHLIST: {
            return {...state, watchlist: [...state.watchlist, action.movie]}
        }
        default:
            return state
    }
}

export const addMovieToWatchlist = (movie) => ({type: ADD_MOVIE_TO_WATCHLIST, movie})


export default watchlistReducer