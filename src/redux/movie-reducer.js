import {fetchActualMovies, fetchGenreList} from "../api/api";

const SET_MOVIES = "movie-reducer/SET_MOVIES"
const SET_GENRE = "movie-reducer/SET_GENRE"

let initialState = {
    movies: [],
    genres: []
}


const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MOVIES: {
            return {...state, movies: action.movies}
        }
        case SET_GENRE: {
            return {...state, genres: action.genres}
        }
        default:
            return state
    }
}
export const setMovies = (movies) => ({type: SET_MOVIES, movies})
export const setGenre = (genres) => ({type: SET_GENRE, genres})


export const getActualFilms = () => {
    return async (dispatch) => {
        let data = await fetchActualMovies()
        let movies = data.results
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = movies.map((m) => ({
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
export const getGenre = () => {
    return async (dispatch) => {
        let data = await fetchGenreList()
        let genres = data.genres
        console.log(genres)
        dispatch(setGenre(genres))
    }
}

export default movieReducer