import React from "react";
import {Link, NavLink, withRouter} from "react-router-dom";

import {Container, ProgressBar} from "react-bootstrap";

import {connect} from "react-redux";
import {compose} from "redux";
import "./Header.css"

const Header = (props) => {
    return (
        <header className={props.match.isExact ? "header" : "other-page__header"}>
            {props.isFetching ? <ProgressBar animated now={45} /> : ""}
            <Container>
                <div className="inner-content">
                    <div className="brand">
                        <NavLink to="/">MovieApp</NavLink>
                    </div>

                    <ul className="nav-links">
                        <li>
                            <NavLink to="/movies">Movies</NavLink>
                        </li>
                        <li>
                            <NavLink to="/watchlist">Watch List</NavLink>
                        </li>

                        <li>
                            <NavLink to="/watched">Watched</NavLink>
                        </li>

                        <li>
                            <NavLink to="/add" className="btn btn-main">
                                <i className="fas fa-search"></i>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </Container>
        </header>
    );
};


let mapStateToProps = (state) => ({
    isFetching: state.movieApp.isFetching
})

export default compose(
    connect(mapStateToProps, null),
    withRouter,
)(Header);