import {
    fetchMovieDetail,
} from "../api/api";

const SET_MOVIE_DETAILS = "movie-reducer/SET_MOVIE_DETAILS"
const IS_FETCHING = "movie-reducer/IS_FETCHING"

let initialState = {
    movieDetails: [],
}


const moviePageReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_MOVIE_DETAILS: {
            return {...state, movieDetails: action.movie}
        }
        default:
            return state
    }
}

export const setMovieDetails = (movie) => ({type: SET_MOVIE_DETAILS, movie})



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

export default moviePageReducer