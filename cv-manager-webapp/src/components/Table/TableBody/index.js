import React from 'react'
import { PropTypes } from 'prop-types'

import ActionButton from './ActionButton'

// returns value of objects property defined by key
const getValueWithKey = (key, item) => {
    let retVal = null
    if (key.includes('.')) {
        const splitedKeyValues = key.split('.')
        splitedKeyValues.forEach((keyValue) => {
            if (!retVal) {
                retVal = item[keyValue]
            } else {
                retVal = retVal[keyValue]
            }
        })
    } else {
        retVal = item[key]
    }
    return retVal
}

const CellItem = ({ headerKey, item, valueType }) => {
    let value = getValueWithKey(headerKey, item)

    switch (valueType) {
        case 'boolean':
            value = value.toString()
            break
        case 'link':
            value = value ? (
                <a href={value} target="_blank">
                    {value}
                </a>
            ) : (
                '-'
            )
            break
        default:
            break
    }

    return <td key={`${headerKey}${item.id}`}>{value ? value : '-'}</td>
}

const TableBody = ({
    headerItems,
    data,
    isLoading,
    rowActions,
    selectedRowActions,
    onClickRow,
    selectedRow,
    setSelectedRow,
    itemsPerPage,
}) => {
    const actionsColSpan = rowActions.length + 1

    const handleClickRow = (item) => {
        if (selectedRowActions.length > 0) {
            if (selectedRow?.id === item.id) {
                setSelectedRow(null)
            } else {
                setSelectedRow(item)
            }
        } else if (onClickRow) {
            onClickRow(item.id)
        }
    }

    const isRowClickable = onClickRow || selectedRowActions.length > 0

    if (isLoading)
        return (
            <tbody>
                {[...Array(itemsPerPage).keys()].map((item) => (
                    <tr key={item} className="m-table__placeholder">
                        {headerItems.map(({ key }) => (
                            <td key={key}>
                                <span></span>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        )

    if (data?.length > 0)
        return (
            <tbody>
                {data.map((item, index) => (
                    <tr
                        key={index}
                        onClick={() => handleClickRow(item)}
                        className={`${isRowClickable ? 'clickable' : ''} ${
                            selectedRow?.id === item.id ? '-selected' : ''
                        }`}
                    >
                        {headerItems.map(({ key, valueType }) => (
                            <CellItem
                                key={key}
                                headerKey={key}
                                item={item}
                                valueType={valueType}
                            />
                        ))}
                        {rowActions.length > 0 && (
                            <td
                                colSpan={actionsColSpan}
                                className="m-table__actions"
                            >
                                {rowActions.map((action, index) => (
                                    <ActionButton
                                        key={index}
                                        action={action}
                                        item={item}
                                        stopPropagation={
                                            isRowClickable ? true : false
                                        }
                                    />
                                ))}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        )

    return (
        <tbody>
            <tr className="m-table__empty">
                <td colSpan={headerItems.length + rowActions.length}>
                    No Items
                </td>
            </tr>
        </tbody>
    )
}

TableBody.propTypes = {
    headerItems: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    isLoading: PropTypes.bool,
    rowActions: PropTypes.array,
    itemsPerPage: PropTypes.number,
}

TableBody.defaultProps = {
    rowActions: [],
}

export default TableBody
