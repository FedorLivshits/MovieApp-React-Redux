const ADD_MOVIE_TO_WATCHLIST = 'initial-reducer/ADD_MOVIE_TO_WATCHLIST'
const REMOVE_MOVIE_FROM_WATCHLIST = 'initial-reducer/REMOVE_MOVIE_FROM_WATCHLIST'


let initialState = {
    watchlist: localStorage.getItem('watchlist')
        ? JSON.parse(localStorage.getItem('watchlist'))
        : [],
}

const watchlistReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_MOVIE_TO_WATCHLIST: {
            return {...state, watchlist: [...state.watchlist, action.movie]}
        }
        case REMOVE_MOVIE_FROM_WATCHLIST:
            return {
                ...state,
                watchlist: state.watchlist.filter(movie => movie.id !== action.id),
            }
        default:
            return state
    }
}

export const addMovieToWatchlist = (movie) => ({type: ADD_MOVIE_TO_WATCHLIST, movie})
export const removeMovieFromWatchlist = (id) => ({type: REMOVE_MOVIE_FROM_WATCHLIST, id})


export default watchlistReducer