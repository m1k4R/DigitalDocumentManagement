import React, { Fragment, useState } from 'react'
import _ from 'lodash'

import { INPUT_FILED_TYPE, TABLE_FILTER_TYPE } from 'constants/enums'

import Input from 'components/Input'
import Select from 'components/Select'
import DateTimePicker from 'components/DateTimePicker/DateTimePicker'
import Checkbox from 'components/Checkbox'

const Filters = ({ filterActions, filters, setFilters }) => {
    const [filterValue, setFilterValue] = useState(filters || {})

    const handleChangeDebounce = _.debounce((value, name, type) => {
        switch (type) {
            case TABLE_FILTER_TYPE.TEXT:
                setFilters((filters) => ({
                    ...filters,
                    [name]: value.target.value,
                }))
                break
            case TABLE_FILTER_TYPE.SELECT:
                setFilters((filters) => ({ ...filters, [name]: value?.id }))
                break
            case TABLE_FILTER_TYPE.DATE_TIME:
                setFilters((filters) => ({ ...filters, [name]: value }))
                break
            case TABLE_FILTER_TYPE.CHECKBOX:
                setFilters((filters) => ({
                    ...filters,
                    [name]: value.target.checked,
                }))
                break
            default:
                break
        }
    }, 1000)

    const handleChange = (value, name, type) => {
        switch (type) {
            case TABLE_FILTER_TYPE.TEXT:
                setFilterValue({ ...filterValue, [name]: value.target.value })
                break
            case TABLE_FILTER_TYPE.SELECT:
            case TABLE_FILTER_TYPE.DATE_TIME:
                setFilterValue({ ...filterValue, [name]: value })
                break
            case TABLE_FILTER_TYPE.CHECKBOX:
                setFilterValue({ ...filterValue, [name]: value.target.checked })
                break
            default:
                break
        }
        handleChangeDebounce(value, name, type)
    }

    const renderFilter = ({ type, name, label, placeholder, entityType }) => {
        switch (type) {
            case TABLE_FILTER_TYPE.TEXT:
                return (
                    <Input
                        name={name}
                        type={INPUT_FILED_TYPE.TEXT}
                        label={label}
                        placeholder={placeholder}
                        value={filterValue[name] || ''}
                        onChange={(e) =>
                            handleChange(e, name, TABLE_FILTER_TYPE.TEXT)
                        }
                    />
                )
            case TABLE_FILTER_TYPE.SELECT:
                return (
                    <Select
                        name={name}
                        label={label}
                        placeholder={placeholder}
                        entityType={entityType}
                        value={filterValue[name]}
                        setValue={(e) =>
                            handleChange(e, name, TABLE_FILTER_TYPE.SELECT)
                        }
                    />
                )
            case TABLE_FILTER_TYPE.DATE_TIME:
                return (
                    <DateTimePicker
                        name={name}
                        label={label}
                        placeholder={placeholder}
                        value={filterValue[name] || ''}
                        setValue={(e) =>
                            handleChange(e, name, TABLE_FILTER_TYPE.DATE_TIME)
                        }
                    />
                )
            case TABLE_FILTER_TYPE.CHECKBOX:
                return (
                    <Checkbox
                        name={name}
                        label={label}
                        value={filterValue[name]?.toString() === 'true'}
                        onChange={(e) =>
                            handleChange(e, name, TABLE_FILTER_TYPE.CHECKBOX)
                        }
                    />
                )
            default:
                break
        }
    }

    return (
        <div className="m-table__filters">
            {filterActions.length > 0 &&
                filterActions.map((item, index) => (
                    <Fragment key={index}>{renderFilter(item)}</Fragment>
                ))}
        </div>
    )
}

export default Filters
