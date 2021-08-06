import {
    fetchGenreList,
    fetchMovieByGenre, fetchMoviesBySearch,
} from '../api/api'


const SET_GENRE = 'moviesPage-reducer/SET_GENRE'
const SET_MOVIES_BY_GENRE = 'moviesPage-reducer/SET_MOVIES_BY_GENRE'
const SET_MOVIES_BY_SEARCH = 'moviesPage-reducer/SET_MOVIES_BY_SEARCH'
const IS_FETCHING = 'moviesPage-reducer/IS_FETCHING'
const SET_PAGES = 'moviesPage-reducer/SET_PAGES'

let initialState = {
    genres: [],
    moviesByGenre: [],
    isFetching: false,
    pages: null,
}


const moviesPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GENRE: {
            return {...state, genres: action.genres}
        }
        case SET_MOVIES_BY_GENRE: {
            return {...state, moviesByGenre: action.moviesByGenre}
        }
        case SET_MOVIES_BY_SEARCH: {
            return {...state, moviesByGenre: action.moviesBySearch}
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
export const setGenre = (genres) => ({type: SET_GENRE, genres})
export const setMovieByGenre = (moviesByGenre) => ({type: SET_MOVIES_BY_GENRE, moviesByGenre})
export const setMovieBySearch = (moviesBySearch) => ({type: SET_MOVIES_BY_SEARCH, moviesBySearch})
export const setIsFetching = (isFetching) => ({type: IS_FETCHING, isFetching})
export const setPages = (pages) => ({type: SET_PAGES, pages})


const modifiedMovieDataFlow = async (dispatch, apiMethod, actionCreator, parameter_1, parameter_2) => {
    let data = await apiMethod(parameter_1, parameter_2)
    const posterUrl = 'https://image.tmdb.org/t/p/original/'
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
    dispatch(setPages(pages))
    dispatch(actionCreator(modifiedData))
}


export const getGenre = () => {
    try {
        return async (dispatch) => {
            let data = await fetchGenreList()
            let genres = data.genres
            dispatch(setGenre(genres))
        }
    } catch (e) {
        alert('error ' + e)
    }
}

export const getMovieByGenre = (genreId, currentPage) => {
    return async (dispatch) => {
        try {
            dispatch(setIsFetching(true))
            let data = await fetchMovieByGenre(currentPage, genreId)
            const posterUrl = 'https://image.tmdb.org/t/p/original/'
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
            dispatch(setPages(pages))
            dispatch(setMovieByGenre(modifiedData))
            dispatch(setIsFetching(false))
        } catch (e) {
            alert('error')
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
            alert('error')
        }
    }
}

export default moviesPageReducer