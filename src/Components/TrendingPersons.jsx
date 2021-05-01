import React from 'react';


function TrendingPersons({trendingPersons}) {
    return (
        <>
            <div className="row mt-3">
                <div className="col">
                    <p className="font-weight-bold">
                        TRENDING PERSONS ON THIS WEEK
                    </p>
                </div>
            </div>
            <div className="scrolling-wrapper">
                {trendingPersons.map(p => {
                    return <div className="my-card col-md-2  col-sm-3 text-center" key={p.id}>
                        <img
                            className="img-fluid rounded-circle mx-auto d-block"
                            src={p.profileImg}
                            alt={p.name}
                        />
                        <p className="font-weight-bold text-center">{p.name}</p>
                        <p
                            className="font-weight-light text-center"
                            style={{color: "#5a606b"}}
                        >
                            Trending for {p.known}
                        </p>
                    </div>
                })}
            </div>
        </>
    );
}

export default TrendingPersons;