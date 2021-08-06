import React, {useState} from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import {connect} from 'react-redux'
import {compose} from 'redux'
import '../../App.scss'
import {fetchOnInputChangeMovies} from '../../api/api'
import HeaderSearchMovieCard from '../HeaderSearchMovieCard/HeaderSearchMovieCard'

const Header = ({match, isMoviePageOpen, screenWidth}) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [inputText, setInputText] = useState('')
    const [result, setResult] = useState([])

    const onInputChange = (event) => {
        event.preventDefault()
        let newText = event.target.value
        setInputText(newText)

        fetchOnInputChangeMovies(newText)
            .then(data => {
                if (!data.errors) {
                    setResult(data.results)
                } else {
                    setResult([])
                }
            })
    }
    const closeSearchList = () => {
        setInputText('')
    }
    const onMenuOpen = () => {
        setMenuOpen(!menuOpen)
    }

    return (
        <header
            className={(match.isExact && screenWidth > 710) || (isMoviePageOpen && screenWidth > 710) ? 'header' : 'other-page__header'}>
            <Container fluid>
                <div className="inner-content">
                    <div className="brand">
                        <NavLink to="/">MovieApp</NavLink>
                    </div>
                    <ul className={menuOpen ? 'nav-links nav-links--active' : 'nav-links'}>
                        <li>
                            <NavLink to="/movies" onClick={() => setMenuOpen(false)}>Movies</NavLink>
                        </li>
                        <li>
                            <NavLink to="/watchlist" onClick={() => setMenuOpen(false)}>Watch List</NavLink>
                        </li>
                        <li className="header-search__input-section">
                            <div className="header__search">
                                <input className="header__search-input" type="text" placeholder="Search for a movie"
                                       value={inputText} onChange={onInputChange}/>
                                <button className="header__search-btn">
                                    <i className="fas fa-search"/>
                                </button>
                            </div>
                        </li>
                    </ul>
                    <div className={menuOpen ? 'burger-menu burger-menu--active' : 'burger-menu'} onClick={onMenuOpen}>
                        <span></span><span></span><span></span>
                    </div>
                </div>
                <div className={inputText ? 'header__search-content--active' : 'header__search-content'}>
                    <ul className="header__search-items">
                        {result.map(movie => (
                            <HeaderSearchMovieCard movie={movie} closeSearchList={closeSearchList}/>
                        ))}
                    </ul>
                </div>
            </Container>
        </header>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.moviesPage.isFetching,
    isMoviePageOpen: state.moviePage.isMoviePageOpen,
})

export default compose(
    connect(mapStateToProps, null),
    withRouter,
)(Header)