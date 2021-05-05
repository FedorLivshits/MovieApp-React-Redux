import React from 'react';
import {Link} from "react-router-dom";


const TrendingPersons = ({trendingPersons, isNoneImg}) => {
    return <section>
        <div className="row mt-3">
            <div className="col">
                <p className="font-weight-bold">
                    Trending Persons Of This Week
                </p>
            </div>
        </div>
        <div className="scrolling-wrapper">
            {trendingPersons.map(p => {
                return <div className="my-card col-md-2  col-sm-3 text-center" key={p.id}>
                    <Link to={`/person/${p.id}`}>
                        {isNoneImg(p.profileImg)}
                    </Link>
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
    </section>
}

export default TrendingPersons;