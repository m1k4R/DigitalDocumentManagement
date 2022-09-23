import React from 'react'
import PropTypes from 'prop-types'
import generatePagination from './generatePagination'
import PageSelector from './PageSelector'
import Icon from '../../Icon'

const Pagination = ({
    page,
    setPage,
    itemsPerPage,
    setItemsPerPage,
    totalItems,
    paginationOptions,
}) => {
    const paginationItems = generatePagination(page, totalItems, itemsPerPage)

    return (
        <div className="pagination-container">
            <PageSelector
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                options={paginationOptions}
                totalItems={totalItems}
            />
            {paginationItems.length > 1 && (
                <div className="pagination">
                    {
                        <span
                            onClick={() => setPage(--page)}
                            className={`item ${page === 1 ? 'disabled' : ''}`}
                        >
                            <Icon name="chevron-left" size={16} />
                        </span>
                    }
                    {paginationItems.map((item, index) => (
                        <span
                            key={index}
                            onClick={
                                typeof item === 'number'
                                    ? () => setPage(item)
                                    : undefined
                            }
                            className={`item ${item === page ? 'active' : ''} ${
                                typeof item !== 'number' ? 'disabled' : ''
                            }`}
                        >
                            {item}
                        </span>
                    ))}
                    {
                        <span
                            onClick={() => setPage(++page)}
                            className={`item ${
                                page ===
                                paginationItems[paginationItems.length - 1]
                                    ? 'disabled'
                                    : ''
                            }`}
                        >
                            <Icon name="chevron-right" size={16} />
                        </span>
                    }
                </div>
            )}
        </div>
    )
}

Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    setItemsPerPage: PropTypes.func.isRequired,
    paginationOptions: PropTypes.array.isRequired,
    totalItems: PropTypes.number.isRequired,
}

export default Pagination
