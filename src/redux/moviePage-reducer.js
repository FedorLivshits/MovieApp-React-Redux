import {
    fetchCasts,
    fetchMovieDetail, fetchMovieTrailer,  fetchSimilarMovies,
} from "../api/api";
import {setIsFetching} from "./moviesPage-reducer";

const SET_MOVIE_DETAILS = "moviePage-reducer/SET_MOVIE_DETAILS"
const SET_MOVIE_CAST = "moviePage-reducer/SET_MOVIE_CAST"
const SET_SIMILAR_MOVIES = "moviePage-reducer/SET_SIMILAR_MOVIES"
const SET_TRAILER = "moviePage-reducer/SET_TRAILER"

let initialState = {
    movieDetails: null,
    movieCast: [],
    similarMovies: [],
    trailer: []
}


const moviePageReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_MOVIE_DETAILS: {
            return {...state, movieDetails: action.movie}
        }
        case SET_MOVIE_CAST: {
            return {...state, movieCast: action.cast}
        }
        case SET_SIMILAR_MOVIES: {
            return {...state, similarMovies: action.movies}
        }
        case SET_TRAILER: {
            return {...state, trailer: action.trailer}
        }
        default:
            return state
    }
}

export const setMovieDetails = (movie) => ({type: SET_MOVIE_DETAILS, movie})
export const setMovieCast = (cast) => ({type: SET_MOVIE_CAST, cast})
export const setSimilarMovies = (movies) => ({type: SET_SIMILAR_MOVIES, movies})
export const setMovieTrailer = (trailer) => ({type: SET_TRAILER, trailer})



export const getMovieDetails = (id) => {
    return async (dispatch) => {
        try {
            dispatch(setIsFetching(true))
            let data = await fetchMovieDetail(id)
            const posterUrl = 'https://image.tmdb.org/t/p/original/';
            const modifiedData = {
                id: data['id'],
                backPoster: posterUrl + data['backdrop_path'],
                popularity: data['popularity'],
                title: data['title'],
                poster: posterUrl + data['poster_path'],
                overview: data['overview'],
                rating: data['vote_average'],
                release_date: data['release_date'],
                tagline: data['tagline'],
                genres: data['genres']
            }
            dispatch(setMovieDetails(modifiedData))
            dispatch(setIsFetching(false))
        } catch (e) {
            alert("error")
        }
    }
}

export const getMovieCast = (id) => {
    return async (dispatch) => {
        try {
            let data = await fetchCasts(id)
            const modifiedData = data['cast'].map((c) => ({
                id: c['id'],
                character: c['character'],
                name: c['name'],
                img: 'https://image.tmdb.org/t/p/w200' + c['profile_path'],
            }))
            dispatch(setMovieCast(modifiedData))
        } catch (e) {
            alert("error")
        }
    }
}

export const getSimilarMovies = (id) => {
    return async (dispatch) => {
        try {
            let data = await fetchSimilarMovies(id)
            const posterUrl = 'https://image.tmdb.org/t/p/original/';
            const modifiedData = data['results'].map((m) => ({
                id: m['id'],
                backPoster: posterUrl + m['backdrop_path'],
                popularity: m['popularity'],
                title: m['title'],
                poster: posterUrl + m['poster_path'],
                overview: m['overview'],
                rating: m['vote_average'],
            }))
            dispatch(setSimilarMovies(modifiedData))
        } catch (e) {
            alert("error")
        }
    }
}
export const getTrailer = (id) => {
    return async (dispatch) => {
        try {
            let data = await fetchMovieTrailer(id)
            dispatch(setMovieTrailer(data['results'][0]))
        } catch (e) {
            alert("error")
        }
    }
}

export default moviePageReducer