function Pagination({ pagination, chengePage }) {
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">


                {
                    pagination.has_pre && (<li className="page-item">
                        <a className="page-link" onClick={() => chengePage({ page: pagination.current_page - 1 })}>&laquo;</a>
                    </li>)
                }

                {
                    Array.from({ length: pagination.total_pages }).map((_, index) => {
                        const page = index + 1;
                        return (

                            page === pagination.current_page ? (<li className="page-item active" key={page}>
                                <span className="page-link" aria-current="page">{page}</span>
                            </li>) : (<li className="page-item" key={page}>
                                <a className="page-link" aria-current="page" onClick={() => chengePage({ page })}>{page}</a>
                            </li>)

                        )
                    })
                }

                {
                    pagination.has_next && (<li className="page-item">
                        <a className="page-link" onClick={() => chengePage({ page: pagination.current_page + 1 })}>&raquo;</a>
                    </li>)

                }
            </ul>
        </nav>
    )
}
export default Pagination