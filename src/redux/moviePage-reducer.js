import {
    fetchCasts,
    fetchMovieDetail, fetchSimilarMovies,
} from "../api/api";
import {setIsFetching} from "./moviesPage-reducer";

const SET_MOVIE_DETAILS = "movie-reducer/SET_MOVIE_DETAILS"
const SET_MOVIE_CAST = "movie-reducer/SET_MOVIE_CAST"
const SET_SIMILAR_MOVIES = "movie-reducer/SET_SIMILAR_MOVIES"

let initialState = {
    movieDetails: null,
    movieCast: [],
    similarMovies: []
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
        default:
            return state
    }
}

export const setMovieDetails = (movie) => ({type: SET_MOVIE_DETAILS, movie})
export const setMovieCast = (cast) => ({type: SET_MOVIE_CAST, cast})
export const setSimilarMovies = (movies) => ({type: SET_SIMILAR_MOVIES, movies})



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
            console.log(modifiedData)
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
                id: c['cast_id'],
                character: c['character'],
                name: c['name'],
                img: 'https://image.tmdb.org/t/p/w200' + c['profile_path'],
            }))
            console.log(modifiedData)
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
            console.log(modifiedData)
            dispatch(setSimilarMovies(modifiedData))
        } catch (e) {
            alert("error")
        }
    }
}


export default moviePageReducer