import React from 'react'
import {Link} from "react-router-dom";

const Paginate = ({pages, page, toLink}) => {
    return (
        pages > 1 && (
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    {[...Array(pages).keys()].map((x) =>
                        <li className={`page-item ${x + 1 === page ? 'active' : ''}`}>
                            <Link key={x + 1} to={`${toLink}${x + 1}`}>
                                <span className="page-link">
                                    {x + 1}
                                </span>
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        )
    )
}

export default Paginate