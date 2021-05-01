import React from "react";
import {Link, withRouter} from "react-router-dom";
import {Container} from "react-bootstrap";
import "./Header.css"

const Header = (props) => {
    return (
        <header className={props.match.isExact ? "header" : "other-page__header"}>
            <Container>
                <div className="inner-content">
                    <div className="brand">
                        <Link to="/">MovieApp</Link>
                    </div>

                    <ul className="nav-links">
                        <li>
                            <Link to="/movies">Movies</Link>
                        </li>
                        <li>
                            <Link to="/watchlist">Watch List</Link>
                        </li>

                        <li>
                            <Link to="/watched">Watched</Link>
                        </li>

                        <li>
                            <Link to="/add" className="btn btn-main">
                                <i className="fas fa-search"></i>
                            </Link>
                        </li>
                    </ul>
                </div>
            </Container>
        </header>
    );
};

export default withRouter(Header)