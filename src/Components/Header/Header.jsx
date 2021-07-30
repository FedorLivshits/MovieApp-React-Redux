import React, {useState} from 'react'
import {NavLink, withRouter} from "react-router-dom";

import {Container, ProgressBar} from "react-bootstrap";

import {connect} from "react-redux";
import {compose} from "redux";
import "./Header.css"

const Header = ({isFetching, match, isMoviePageOpen}) => {
    const [menuOpen, setMenuOpen] = useState(false)

    const onMenuOpen = () =>{
        setMenuOpen(!menuOpen)
    }
    return (
        <header className={match.isExact || isMoviePageOpen ? "header" : "other-page__header"}>
            {isFetching ? <ProgressBar animated now={45} /> : ""}
            <Container>
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
                        <li >
                            <NavLink to="/add" className="btn btn-main" onClick={() => setMenuOpen(false)}>
                                <i className="fas fa-search"/>
                            </NavLink>
                        </li>
                    </ul>

                    <div className={menuOpen ? 'burger-menu burger-menu--active' : 'burger-menu'} onClick={onMenuOpen}>
                        <span></span><span></span><span></span>
                    </div>
                </div>
            </Container>
        </header>
    );
};


let mapStateToProps = (state) => ({
    isFetching: state.moviesPage.isFetching,
    isMoviePageOpen: state.moviePage.isMoviePageOpen
})

export default compose(
    connect(mapStateToProps, null),
    withRouter,
)(Header);