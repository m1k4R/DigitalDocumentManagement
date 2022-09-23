import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslate } from 'react-polyglot'

import { SORT_TYPES } from 'constants/enums'
import { secondaryColor } from 'constants/colors'

import Icon from '../../Icon'

export const renderSortIcon = (sortValue) => {
    switch (sortValue) {
        case SORT_TYPES.ASC:
            return <Icon name="sort-asc" color={secondaryColor} />
        case SORT_TYPES.DESC:
            return <Icon name="sort-desc" color={secondaryColor} />
        default:
            return null
    }
}

const TableHeader = ({ headerItems, rowActions, sort, setSort }) => {
    const t = useTranslate()

    const { ASC, DESC } = SORT_TYPES

    let querySortKey
    let querySortValue

    if (sort && sort[0] === '-') {
        querySortKey = sort.substring(1)
        querySortValue = DESC
    } else if (sort) {
        querySortKey = sort
        querySortValue = ASC
    }

    const [sortKey, setSortKey] = useState(querySortKey)
    const [sortValue, setSortValue] = useState(querySortValue)

    const handleSort = (key) => {
        if (!sortKey || sortKey === key) {
            switch (sortValue) {
                case ASC:
                    setSort(`-${key}`)
                    setSortValue(DESC)
                    break
                case DESC:
                    setSort(null)
                    setSortValue(null)
                    break
                default:
                    setSort(key)
                    setSortValue(ASC)
                    break
            }
        } else {
            setSort(key)
            setSortValue(ASC)
        }
        setSortKey(key)
    }

    return (
        <thead>
            <tr>
                {headerItems.map(
                    ({ key, title, sortKey: keySort, sortable = false }) => (
                        <th
                            key={key}
                            style={{ cursor: sortable ? 'pointer' : 'default' }}
                            onClick={
                                sortable
                                    ? () => handleSort(keySort || key)
                                    : undefined
                            }
                        >
                            <div>
                                {title && t(title)}
                                {(sortKey === keySort || sortKey === key) &&
                                    renderSortIcon(sortValue)}
                            </div>
                        </th>
                    )
                )}
                {rowActions.length > 0 && <th />}
            </tr>
        </thead>
    )
}

TableHeader.propTypes = {
    headerItems: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            title: PropTypes.string,
            sortable: PropTypes.bool,
        })
    ).isRequired,
    rowActions: PropTypes.array,
    sort: PropTypes.string,
    setSort: PropTypes.func.isRequired,
}

TableHeader.defaultProps = {
    rowActions: [],
}

export default TableHeader
