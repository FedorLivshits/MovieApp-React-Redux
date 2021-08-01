import React, {useState} from 'react'
import {Pagination} from 'react-bootstrap'

const Paginator = ({onPageChange, currentPage, pages, screenWidth}) => {
    let [portionNumber, setPortionNumber] = useState(1)

    const portionSize = (screenWidth > 550) ? 10 : 5

    let totalPages = []
    for (let i = 0; i <= pages; i++) {
        totalPages.push(i)
    }

    let portionCount = Math.ceil(pages / portionSize)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return (
        <Pagination className="justify-content-center">
            {portionNumber > 1 &&
            <Pagination.Prev onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}/>
            }


            {totalPages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => <Pagination.Item key={p} onClick={() => onPageChange(p)}
                                           className={(currentPage === p) ? 'active' : ''}>
                    {p}
                </Pagination.Item>)}


            {portionCount > portionNumber &&
            <Pagination.Next onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}/>
            }
        </Pagination>
    )
}

export default Paginator