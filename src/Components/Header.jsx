import React from "react";
import { Link } from "react-router-dom";
import {Container} from "react-bootstrap";

const Header = () => {
    return (
        <header className="header">
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
                                + Add
                            </Link>
                        </li>
                    </ul>
                </div>
            </Container>
        </header>
    );
};

export default Header