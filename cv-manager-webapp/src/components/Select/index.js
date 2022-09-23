/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTranslate } from 'react-polyglot'

import { getEntityByIdService } from 'services/entity.service'

import useFetchOptions from 'hooks/useFetchOptions'

const ITEMS_PER_PAGE = 10

const Select = ({
    label,
    value,
    setValue,
    setTouched,
    entityType,
    params,
    searchable,
    relationship,
    required,
    defaultOptions,
    reload,
    condition,
    error,
    isJSONAPI,
    apiUrl,
    placeholder,
    ...props
}) => {
    const t = useTranslate()
    const hocRef = useRef(null)
    const searchRef = useRef(null)

    const [open, setOpen] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [page, setPage] = useState(1)

    // Use defaultOptions parameter when the same select component is used more than once in the parent component,
    // it is necessary to reduce the multiple fetch of the same data from the api
    // e.g. FieldArray with a select component (days),
    const { options, isLoading } = useFetchOptions(
        entityType,
        {
            ...params,
            page,
            itemsPerPage: ITEMS_PER_PAGE,
            name: searchValue,
        },
        reload,
        condition,
        defaultOptions,
        isJSONAPI,
        apiUrl
    )

    // It is necessary to define the selected value, if exist.
    // To display the selected value, we need the name of the selected option,
    // if we only have an id, we need to find the appropriate one from all options via id,
    // if we do not find it, it means that it is on another page, then getItemById
    useEffect(() => {
        if (value && !value.name && options.length > 0) {
            const valueId = value.id || value
            const valueFromOptions = options.find(
                (item) => item.id === Number(valueId)
            )
            valueFromOptions ? setValue(valueFromOptions) : getItemById(valueId)
        }
    }, [options])

    const getItemById = async (id) => {
        try {
            const element = await getEntityByIdService(entityType, id)
            setValue({ ...element })
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleClickOutside = (event) => {
        if (
            hocRef &&
            hocRef.current &&
            !hocRef.current.contains(event.target)
        ) {
            setOpen(false)
            setSearchValue('')
        }
    }

    const focusSearchRef = () => {
        searchRef.current && searchRef.current.focus()
    }

    const handleFocus = () => {
        setOpen(true)
        setTouched && setTouched(true)
    }

    const handleSelect = (item) => {
        setSearchValue('')
        setValue(item)
        setOpen(false)
    }

    const handleSearch = (event) => {
        setPage(1)
        setSearchValue(event.target.value)
    }

    const handleOpen = () => {
        if (!open) {
            focusSearchRef()
        }
        setOpen(!open)
        setSearchValue('')
    }

    const handleScroll = (event) => {
        const { scrollHeight, scrollTop, clientHeight } = event.target
        const bottom = Math.ceil(scrollHeight - scrollTop) === clientHeight
        const nearBottom =
            Math.ceil(scrollHeight - scrollTop) - 1 === clientHeight
        if ((bottom || nearBottom) && isLoading) {
            setPage(page + 1)
        }
    }

    const getOptions = () => {
        if (options.length > 0) {
            return options.map((item, index) => (
                <li key={index} onClick={() => handleSelect(item)}>
                    {item.name}
                </li>
            ))
        }
        return <li>{'noItems'}</li>
    }

    return (
        <div className={`m-selectGroup ${required ? '-required' : ''}`}>
            {label && <label>{t(label)}</label>}
            <div className="m-selectGroup__container" ref={hocRef}>
                <input
                    {...props}
                    placeholder={placeholder ? t(placeholder) : ''}
                    value={value?.name || ''}
                    onFocus={handleFocus}
                    className={`m-selectGroup__select ${open ? '-open' : ''} ${
                        searchValue ? '-hide' : ''
                    } ${error ? '-error' : ''}`}
                    readOnly
                />
                {searchable && (
                    <input
                        className="m-selectGroup__searchInput"
                        onClick={handleFocus}
                        onChange={handleSearch}
                        value={searchValue}
                        autoComplete="off"
                        ref={searchRef}
                    />
                )}
                <span
                    className="m-selectGroup__arrow"
                    onClick={handleOpen}
                ></span>
                <div
                    className={`m-selectGroup__options ${open ? '-open' : ''}`}
                    onScroll={handleScroll}
                >
                    <ul>
                        {!required && options.length > 0 && (
                            <li key="none" onClick={() => handleSelect(null)}>
                                {'< none >'}
                            </li>
                        )}
                        {getOptions()}
                    </ul>
                </div>
            </div>
            <span className={`m-inputGroup__error ${error ? '-active' : ''}`}>
                {error}
            </span>
        </div>
    )
}

export const SelectDefaultPropTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    entityType: PropTypes.string,
    params: PropTypes.object,
    searchable: PropTypes.bool,
    relationship: PropTypes.bool,
    required: PropTypes.bool,
    reload: PropTypes.any,
    condition: PropTypes.bool,
    defaultOptions: PropTypes.array,
    isJSONAPI: PropTypes.bool,
    apiUrl: PropTypes.string,
}

Select.propTypes = {
    ...SelectDefaultPropTypes,
    value: PropTypes.any,
    setValue: PropTypes.func.isRequired,
    setTouched: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
}

export default Select
