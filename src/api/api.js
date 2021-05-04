import * as axios from "axios";


const apiKey = '1f75000b86f4caf1e8b7fe256423c391';
const url = 'https://api.themoviedb.org/3';
const nowPlayingUrl = `${url}/movie/now_playing`;
const topratedUrl = `${url}/movie/top_rated`;
const movieUrl = `${url}/movie`;
const genreUrl = `${url}/genre/movie/list`;
const moviesUrl = `${url}/discover/movie`;
const personUrl = `${url}/trending/person/week`;
const popularMoviesUrl = `${url}/movie/popular`;
const searchMoviesURL = `${url}/search/movie`;

export const fetchActualMovies = () => {
    return axios.get(`${nowPlayingUrl}?api_key=${apiKey}&language=en-US&page=1`)
        .then(response => response.data)
}

export const fetchGenreList = () => {
    return axios.get(`${genreUrl}?api_key=${apiKey}&language=en-US&page=1`)
        .then(response => response.data)
}
export const fetchMovieByGenre = (currentPage, genre_id) => {
    return axios.get(`${moviesUrl}?api_key=${apiKey}&language=en-US&include_adult=false&page=${currentPage}&with_genres=${genre_id}`)
        .then(response => response.data)
}

export const fetchPerson = () => {
    return axios.get(`${personUrl}?api_key=${apiKey}`)
        .then(response => response.data)
}

export const fetchTopRatedMovies = () => {
    return axios.get(`${topratedUrl}?api_key=${apiKey}&language=en-US&page=1`)
        .then(response => response.data)
}

export const fetchPopularMovies = () => {
    return axios.get(`${popularMoviesUrl}?api_key=${apiKey}&language=en-US&page=1`)
        .then(response => response.data)
}

export const fetchMoviesBySearch = (newText) => {
    return axios.get(`${searchMoviesURL}?api_key=${apiKey}&&language=en-US&page=1&include_adult=false&query=${newText}`)
        .then(response => response.data)
}

export const fetchMovieDetail = (id) => {
    return axios.get(`${movieUrl}/${id}?api_key=${apiKey}&&language=en-US`)
        .then(response => response.data)
}
export const fetchMovieVideos = (id) => {
    return axios.get(`${movieUrl}/${id}/videos?api_key=${apiKey}`)
        .then(response => response.data)
}

export const fetchCasts = async (id) => {
    return axios.get(`${movieUrl}/${id}/credits?api_key=${apiKey}`)
        .then(response => response.data)
}

export const fetchSimilarMovies = async (id) => {
    return axios.get(`${movieUrl}/${id}/similar?api_key=${apiKey}&&language=en-US`)
        .then(response => response.data)
}