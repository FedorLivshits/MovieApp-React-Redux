import * as axios from "axios";


const apiKey = '1f75000b86f4caf1e8b7fe256423c391';
const url = 'https://api.themoviedb.org/3';
const nowPlayingUrl = `${url}/movie/now_playing`;
const topratedUrl = `${url}/movie/top_rated`;
const movieUrl = `${url}/movie`;
const genreUrl = `${url}/genre/movie/list`;
const moviesUrl = `${url}/discover/movie`;
const personUrl = `${url}/trending/person/week`;


export const fetchActualMovies = () => {
    return axios.get(`${nowPlayingUrl}?api_key=${apiKey}&language=en-US&page=1`)
        .then(response => response.data)
}

export const fetchGenreList = () => {
    return axios.get(`${genreUrl}?api_key=${apiKey}&language=en-US&page=1`)
        .then(response => response.data)
}
export const fetchMovieByGenre = (genre_id) => {
    return axios.get(`${moviesUrl}?api_key=${apiKey}&language=en-US&page=1&with_genres=${genre_id}`)
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