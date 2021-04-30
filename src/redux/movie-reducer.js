import axios from "axios";
import {fetchActualMovies} from "../api/api";

const SET_MOVIES = "movie-reducer/SET_MOVIES"

let initialState = {
    movies: []
}


const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MOVIES: {
            return {...state, movies: action.movies}
        }
        default:
            return state
    }
}
export const setMovies = (movies) => ({type: SET_MOVIES, movies})


export const getActualFilms = () => {
    return async (dispatch) => {
        let data = await fetchActualMovies()
        let data1 = data.results.splice(0, 5)
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data1.map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularity'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
        }))
        console.log(modifiedData)
        dispatch(setMovies(modifiedData))
    }
}


export default movieReducer