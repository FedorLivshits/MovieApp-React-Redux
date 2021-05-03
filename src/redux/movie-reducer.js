import {
    fetchActualMovies,
    fetchGenreList,
    fetchMovieByGenre, fetchMovieDetail, fetchMoviesBySearch,
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
const SET_MOVIES_BY_SEARCH = "movie-reducer/SET_MOVIES_BY_SEARCH"
const SET_MOVIE_DETAILS = "movie-reducer/SET_MOVIE_DETAILS"
const IS_FETCHING = "movie-reducer/IS_FETCHING"
const SET_PAGES = "movie-reducer/SET_PAGES"

let initialState = {
    movies: [],
    movieDetails: [],
    genres: [],
    moviesByGenre: [],
    trendingPersons: [],
    topRatedMovies: [],
    popularMovies: [],
    isFetching: false,
    pages: null,
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
        case SET_MOVIES_BY_SEARCH: {
            return {...state, moviesByGenre: action.moviesBySearch}
        }
        case SET_MOVIE_DETAILS: {
            return {...state, movieDetails: action.movie}
        }
        case IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case SET_PAGES: {
            return {...state, pages: action.pages}
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
export const setMovieBySearch = (moviesBySearch) => ({type: SET_MOVIES_BY_SEARCH, moviesBySearch})
export const setMovieDetails = (movie) => ({type: SET_MOVIE_DETAILS, movie})
export const setIsFetching = (isFetching) => ({type: IS_FETCHING, isFetching})
export const setPages = (pages) => ({type: SET_PAGES, pages})


const modifiedMovieDataFlow = async (dispatch, apiMethod, actionCreator, parameter_1, parameter_2) => {
    let data = await apiMethod(parameter_1, parameter_2)
    const posterUrl = 'https://image.tmdb.org/t/p/original/';
    const pages = data.total_pages
    const modifiedData = data.results.map((m) => ({
        id: m['id'],
        backPoster: posterUrl + m['backdrop_path'],
        popularity: m['popularity'],
        title: m['title'],
        poster: posterUrl + m['poster_path'],
        overview: m['overview'],
        rating: m['vote_average'],
    }))
    console.log(modifiedData)
    dispatch(setPages(pages))
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

export const getMovieByGenre = (genreId, currentPage) => {
    return async (dispatch) => {
        try {
            dispatch(setIsFetching(true))
            let data = await fetchMovieByGenre(currentPage, genreId)
            const posterUrl = 'https://image.tmdb.org/t/p/original/';
            const pages = data.total_pages
            const modifiedData = data.results.map((m) => ({
                id: m['id'],
                backPoster: posterUrl + m['backdrop_path'],
                popularity: m['popularity'],
                title: m['title'],
                poster: posterUrl + m['poster_path'],
                overview: m['overview'],
                rating: m['vote_average'],
            }))
            console.log(modifiedData)
            dispatch(setPages(pages))
            dispatch(setMovieByGenre(modifiedData))
            dispatch(setIsFetching(false))
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

export const getMoviesBySearch = (queryText) => {
    return async (dispatch) => {
        try {
            dispatch(setIsFetching(true))
            await modifiedMovieDataFlow(dispatch, fetchMoviesBySearch, setMovieBySearch, queryText)
            dispatch(setIsFetching(false))
        } catch (e) {
            alert("error")
        }
    }
}

export const getMovieDetails = (id) => {
    return async (dispatch) => {
        try {
            let data = await fetchMovieDetail(id)
            dispatch(setMovieDetails(data))
        } catch (e) {
            alert("error")
        }
    }
}

export default movieReducer