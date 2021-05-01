import {
    fetchActualMovies,
    fetchGenreList,
    fetchMovieByGenre,
    fetchPerson,
    fetchPopularMovies,
    fetchTopRatedMovies
} from "../api/api";

const SET_MOVIES = "movie-reducer/SET_MOVIES"
const SET_GENRE = "movie-reducer/SET_GENRE"
const SET_MOVIES_BY_GENRE = "movie-reducer/SET_MOVIES_BY_GENRE"
const SET_TRENDING_PERSONS = "movie-reducer/SET_TRENDING_PERSONS"
const SET_TOP_RATED_MOVIES = "movie-reducer/SET_TOP_RATED_MOVIES"
const SET_POPULAR_MOVIES = "movie-reducer/SET_POPULAR_MOVIES"

let initialState = {
    movies: [],
    genres: [],
    moviesByGenre: [],
    trendingPersons: [],
    topRatedMovies: [],
    popularMovies: []
}


const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MOVIES: {
            return {...state, movies: action.movies}
        }
        case SET_GENRE: {
            return {...state, genres: action.genres}
        }
        case SET_MOVIES_BY_GENRE: {
            return {...state, moviesByGenre: action.moviesByGenre}
        }
        case SET_TRENDING_PERSONS: {
            return {...state, trendingPersons: action.persons}
        }
        case SET_TOP_RATED_MOVIES: {
            return {...state, topRatedMovies: action.topMovies}
        }
        case SET_POPULAR_MOVIES: {
            return {...state, popularMovies: action.popularMovies}
        }
        default:
            return state
    }
}
export const setMovies = (movies) => ({type: SET_MOVIES, movies})
export const setGenre = (genres) => ({type: SET_GENRE, genres})
export const setMovieByGenre = (moviesByGenre) => ({type: SET_MOVIES_BY_GENRE, moviesByGenre})
export const setTrendingPersons = (persons) => ({type: SET_TRENDING_PERSONS, persons})
export const setTopRatedMovies = (topMovies) => ({type: SET_TOP_RATED_MOVIES, topMovies})
export const setPopularMovies = (popularMovies) => ({type: SET_POPULAR_MOVIES, popularMovies})


const modifiedMovieDataFlow = async (dispatch, apiMethod, actionCreator, genreId) => {
    let data = await apiMethod(genreId)
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
    dispatch(actionCreator(modifiedData))
}

export const getActualFilms = () => {
    return async (dispatch) => {
        try {
            await modifiedMovieDataFlow(dispatch, fetchActualMovies, setMovies)
        } catch (e) {
            alert("error")
        }
    }
}

export const getGenre = () => {
    try {
        return async (dispatch) => {
            let data = await fetchGenreList()
            let genres = data.genres
            console.log(genres)
            dispatch(setGenre(genres))
        }
    } catch (e) {
        alert("error")
    }
}

export const getMovieByGenre = (genreId) => {
    return async (dispatch) => {
        try {
            await modifiedMovieDataFlow(dispatch, fetchMovieByGenre, setMovieByGenre, genreId)
        } catch (e) {
            alert("error")
        }
    }
}

export const getTrendingPerson = () => {
    try {
        return async (dispatch) => {
            let data = await fetchPerson()
            const modifiedData = data.results.map((p) => ({
                id: p['id'],
                popularity: p['popularity'],
                name: p['name'],
                profileImg: 'https://image.tmdb.org/t/p/w200' + p['profile_path'],
                known: p['known_for_department']
            }))
            dispatch(setTrendingPersons(modifiedData))
        }
    } catch (e) {
        alert("error")
    }
}

export const getTopRatedMovies = () => {
    return async (dispatch) => {
        try {
            await modifiedMovieDataFlow(dispatch, fetchTopRatedMovies, setTopRatedMovies)
        } catch (e) {
            alert("error")
        }
    }
}

export const getPopularMovies = () => {
    return async (dispatch) => {
        try {
            await modifiedMovieDataFlow(dispatch, fetchPopularMovies, setPopularMovies)
        } catch (e) {
            alert("error")
        }
    }
}

export default movieReducer