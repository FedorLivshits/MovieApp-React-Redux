import React from 'react';
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";

function SimilarMovies({similarMovies}) {
    return (
        <section>
            <div className="row mt-3">
                <div className="col">
                    <p className="font-weight-bold">
                       Similar Movies
                    </p>
                </div>
            </div>
            <div className="scrolling-wrapper">
                {similarMovies.map(m => {
                    return <div className="my-card col-md-2" key={m.id}>
                        <div className="card">
                            <Link to={`/movie/${m.id}`}>
                                <img className="img-fluid" src={m.poster} alt={m.title}/>
                            </Link>
                        </div>
                        <div className="mt-2">
                            <p style={{fontWeight: "bolder"}}>{m.title}</p>
                            <p>Rated: {m.rating}</p>
                            <ReactStars
                                value={m.rating}
                                count={10}
                                size={15}
                                color1={"#f4c10f"}
                            />
                        </div>
                    </div>
                })}
            </div>
        </section>
    );
}

export default SimilarMovies;