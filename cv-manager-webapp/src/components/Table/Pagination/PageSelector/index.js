import React from 'react'
import PropTypes from 'prop-types'
import { useTranslate } from 'react-polyglot'

const PageSelector = ({
    options,
    itemsPerPage,
    setItemsPerPage,
    totalItems,
}) => {
    const t = useTranslate()

    const handleChangeItems = (event) => {
        const value = Number(event.target.value)
        setItemsPerPage(value)
    }

    return (
        <div className="pagination-selector">
            <span>{t('table.pagination.show')}</span>
            <div>
                <select defaultValue={itemsPerPage} onClick={handleChangeItems}>
                    {options.map((item) => (
                        <option key={item}>{item}</option>
                    ))}
                </select>
            </div>
            <span>{t('table.pagination.perPage')}</span>
        </div>
    )
}

PageSelector.propTypes = {
    options: PropTypes.array.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    setItemsPerPage: PropTypes.func.isRequired,
    totalItems: PropTypes.number,
}

export default PageSelector
