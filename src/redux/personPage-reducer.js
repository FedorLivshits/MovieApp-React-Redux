import {
    fetchGenreList,
    fetchMovieByGenre, fetchMoviesBySearch, fetchPersonDetail, fetchPersonMovies,
} from "../api/api";
import {setIsFetching, setMovieByGenre, setPages} from "./moviesPage-reducer";


const SET_PERSON = "personPage-reducer/SET_PERSON"
const SET_PERSON_MOVIES = "personPage-reducer/SET_PERSON_MOVIES"

let initialState = {
    personDetail: null,
    personMovies: []
}


const personPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PERSON: {
            return {...state, personDetail: action.personDetail}
        }
        case SET_PERSON_MOVIES: {
            return {...state, personMovies: action.personMovies}
        }
        default:
            return state
    }
}
export const setPersonDetail = (personDetail) => ({type: SET_PERSON, personDetail})
export const setPersonMovies = (personMovies) => ({type: SET_PERSON_MOVIES, personMovies})




export const getPersonDetail = (id) => {
    return async (dispatch) => {
        try {
            dispatch(setIsFetching(true))
            let data = await fetchPersonDetail(id)
            dispatch(setPersonDetail(data))
            dispatch(setIsFetching(false))
        } catch (e) {
            alert("error")
        }
    }
}
export const getPersonMovies = (id) => {
    return async (dispatch) => {
        try {
            let data = await fetchPersonMovies(id)
            const posterUrl = 'https://image.tmdb.org/t/p/original/';
            const modifiedData = data.cast.map((m) => ({
                id: m['id'],
                title: m['title'],
                poster: posterUrl + m['poster_path'],
                rating: m['vote_average'],
            }))
            dispatch(setPersonMovies(modifiedData))
        } catch (e) {
            alert("error")
        }
    }
}


export default personPageReducer