import React, {useState} from 'react';
import {Pagination} from "react-bootstrap";

const Paginator = ({ onPageChange, currentPage, pages, portionSize=10}) => {
    let [portionNumber, setPortionNumber] = useState(1)

    let totalPages = [];
    for (let i = 0; i <= pages; i++) {
        totalPages.push(i)
    }

    let portionCount = Math.ceil (pages / portionSize)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return (
        <div className="row d-flex w-100 justify-content-center">
            <Pagination>
                {portionNumber > 1 &&
                <Pagination.Prev onClick={() => {setPortionNumber(portionNumber-1)}}/>
                }


                {totalPages
                    .filter( p => p >= leftPortionPageNumber && p<= rightPortionPageNumber)
                    .map(p => <Pagination.Item onClick={() => onPageChange(p)}
                                                      className={(currentPage === p) ? "active" : ""}>
                    {p}
                </Pagination.Item>)}


                {portionCount > portionNumber &&
                <Pagination.Next onClick={() => {setPortionNumber(portionNumber+1)}}/>
                }
            </Pagination>
        </div>
    );
}

export default Paginator;