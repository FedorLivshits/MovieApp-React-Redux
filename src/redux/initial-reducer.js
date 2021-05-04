import {getActualFilms, getPopularMovies, getTopRatedMovies, getTrendingPerson} from "./mainPage-reducer";
import {getMovieCast, getMovieDetails, getSimilarMovies, getTrailer} from "./moviePage-reducer";
import {getPersonDetail, getPersonMovies} from "./personPage-reducer";

const SET_INITIALIZED_MAIN_PAGE = "initial-reducer/SET_INITIALIZED_MAIN_PAGE"
const SET_INITIALIZED_MOVIE_PAGE = "initial-reducer/SET_INITIALIZED_MOVIE_PAGE"
const SET_INITIALIZED_PERSON_PAGE = "initial-reducer/SET_INITIALIZED_PERSON_PAGE"


let initialState = {
    initializedMainPage: false,
    initializedMoviePage: false,
    initializedPersonPage: false,
}


const initializedReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_INITIALIZED_MAIN_PAGE: {
            return {...state, initializedMainPage: true}
        }
        case SET_INITIALIZED_MOVIE_PAGE: {
            return {...state, initializedMoviePage: true}
        }
        case SET_INITIALIZED_PERSON_PAGE: {
            return {...state, initializedPersonPage: true}
        }
        default:
            return state
    }
}

export const initializedMainSuccess = () => ({type: SET_INITIALIZED_MAIN_PAGE})
export const initializedMoviePageSuccess = () => ({type: SET_INITIALIZED_MOVIE_PAGE})
export const initializedPersonPageSuccess = () => ({type: SET_INITIALIZED_PERSON_PAGE})

export const initializeMainPage = () => {
    return async (dispatch) => {
        try {
            let promise1 = dispatch(getActualFilms())
            let promise2 = dispatch(getTopRatedMovies())
            let promise3 = dispatch(getTrendingPerson())
            let promise4 = dispatch(getPopularMovies())
            Promise.all([promise1, promise2, promise3, promise4])
                .then(() => dispatch(initializedMainSuccess()))
        } catch (e) {
            alert("error")
        }
    }
}
export const initializeMoviePage = (id) => {
    return async (dispatch) => {
        try {
            let promise1 = dispatch(getMovieDetails(id))
            let promise2 = dispatch(getSimilarMovies(id))
            let promise3 = dispatch(getMovieCast(id))
            let promise4 = dispatch(getTrailer(id))
            Promise.all([promise1, promise2, promise3, promise4])
                .then(() => dispatch(initializedMoviePageSuccess()))
        } catch (e) {
            alert("error")
        }
    }
}
export const initializePersonPage = (id) => {
    return async (dispatch) => {
        try {
            let promise1 = dispatch(getPersonDetail(id))
            let promise2 = dispatch(getPersonMovies(id))
            Promise.all([promise1, promise2])
                .then(() => dispatch(initializedPersonPageSuccess()))
        } catch (e) {
            alert("error")
        }
    }
}

export default initializedReducer