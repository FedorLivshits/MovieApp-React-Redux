import React from 'react';


function MovieCast({movieCast}) {
    return (
        <section>
            <div className="row mt-3">
                <div className="col">
                    <p className="font-weight-bold">
                        Cast
                    </p>
                </div>
            </div>
            <div className="scrolling-wrapper">
                {movieCast.map(p => {
                    return <div className="my-card col-md-2  col-sm-3 text-center" key={p.id}>
                        <img
                            className="img-fluid rounded-circle mx-auto d-block"
                            src={p.img}
                            alt={p.name}
                        />
                        <p className="font-weight-bold text-center">{p.name}</p>
                        <p
                            className="font-weight-light text-center"
                            style={{color: "#5a606b"}}
                        >
                            Character {p.character}
                        </p>
                    </div>
                })}
            </div>
        </section>
    );
}

export default MovieCast;