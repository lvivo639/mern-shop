import React from 'react'
import {Link} from "react-router-dom";

const Paginate = ({pages, page, toLink}) => {
    return (
        pages > 1 && (
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    {[...Array(pages).keys()].map((x) =>
                        <li className={`page-item ${x + 1 === page ? 'active' : ''}`}>
                            <span className="page-link">
                                <Link key={x + 1}
                                      to={`${toLink}${x + 1}`}>
                                    {x + 1}
                                </Link>
                            </span>
                        </li>
                    )}
                </ul>
            </nav>
        )
    )
}

export default Paginate