/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslate } from 'react-polyglot'

import useFetchOptions from 'hooks/useFetchOptions'

const BACKSPACE_KEY_CODE = 8
const ITEMS_PER_PAGE = 5

const Multiselect = ({
    label,
    placeholder = 'Select...',
    value = [],
    setValue,
    setTouched,
    entityType,
    params,
    searchable,
    required,
    error,
    reload,
    condition,
    defaultOptions,
    isJSONAPI,
    apiUrl,
    displayAttribute = 'name',
}) => {
    const t = useTranslate()
    const hocRef = useRef(null)
    const searchRef = useRef(null)

    const [open, setOpen] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [page, setPage] = useState(1)

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
            clearSearchRef()
        }
    }

    const handleKeyBackspace = (event) => {
        if (event.keyCode === BACKSPACE_KEY_CODE && !searchValue) {
            const selectedValuesCopy = [...value]
            selectedValuesCopy.splice(value.length - 1, 1)
            setValue(selectedValuesCopy)
        }
    }

    const focusSearchRef = () => {
        if (searchable && searchRef.current) {
            searchRef.current.focus()
        }
    }

    const clearSearchRef = () => {
        if (searchable && searchRef.current) {
            searchRef.current.textContent = ''
            setSearchValue('')
        }
    }

    const handleChange = (item) => {
        setOpen(false)
        const id = Number(item.id)
        const exist = value.some((el) => el.id === id)
        if (!exist) {
            setValue([...value, item])
        } else {
            const index = value.findIndex((el) => el.id === id)
            const selectedValuesCopy = [...value]
            selectedValuesCopy.splice(index, 1)
            setValue(selectedValuesCopy)
        }
        focusSearchRef()
        clearSearchRef()
    }

    const handleRemove = (index) => {
        const selectedValuesCopy = [...value]
        selectedValuesCopy.splice(index, 1)
        setValue(selectedValuesCopy)
        clearSearchRef()
    }

    const handleRemoveAll = () => {
        setValue([])
        clearSearchRef()
        setTouched && setTouched(true)
    }

    const handleFocus = () => {
        setOpen(true)
        setTouched && setTouched(true)
        focusSearchRef()
    }

    const handleSearch = (event) => {
        if (searchRef.current && searchRef.current.contains(event.target)) {
            setPage(1)
            setSearchValue(searchRef.current.textContent)
            setOpen(true)
        }
    }

    const handleScroll = (event) => {
        const { scrollHeight, scrollTop, clientHeight } = event.target
        const bottom = Math.ceil(scrollHeight - scrollTop) === clientHeight
        if (bottom && isLoading) {
            setPage(page + 1)
        }
    }

    const getOptions = () => {
        if (options.length > 0) {
            return options.map((item, index) => (
                <li
                    className={
                        value.some((el) => el.id === item.id) ? '-selected' : ''
                    }
                    key={index}
                    onClick={() => handleChange(item)}
                >
                    {item[displayAttribute]}
                </li>
            ))
        }
        return <li className="-empty">No items</li>
    }
    const handleOpen = () => {
        if (!open) {
            focusSearchRef()
        }
        setOpen(!open)
        setSearchValue('')
    }

    const handleArrowClick = (event) => {
        event.stopPropagation()
        handleOpen()
    }
    return (
        <div className="m-multiselectGroup">
            {label && (
                <label>
                    {t(label)}
                    {required && <span className="a-require-star"> *</span>}
                </label>
            )}
            <div className="m-multiselectGroup__container" ref={hocRef}>
                <div
                    className={`m-multiselectGroup__multiselect  ${
                        open ? '-open' : ''
                    }`}
                    onClick={handleFocus}
                >
                    {value.length < 1 && (
                        <span
                            className="m-selectGroup__arrow"
                            onClick={handleArrowClick}
                        ></span>
                    )}
                    {!searchRef?.current?.textContent && value.length === 0 && (
                        <span className="m-multiselectGroup__placeholder">
                            {t(placeholder)}
                        </span>
                    )}
                    <div className="m-multiselectGroup__items">
                        {value.map(({ id, name }, index) => (
                            <div className="m-multiselectGroup__item" key={id}>
                                <span className="label">{name}</span>
                                <span
                                    className="m-multiselectGroup__removeItem"
                                    onClick={() => handleRemove(index)}
                                ></span>
                            </div>
                        ))}
                        {searchable && (
                            <div className="m-multiselectGroup__searchItem">
                                <span
                                    className="m-multiselectGroup__search"
                                    role="textbox"
                                    contentEditable
                                    ref={searchRef}
                                    onKeyUp={handleSearch}
                                    onKeyDown={handleKeyBackspace}
                                ></span>
                            </div>
                        )}
                    </div>
                    {value.length > 0 && (
                        <span
                            className="m-multiselectGroup__removeAll"
                            onClick={handleRemoveAll}
                        ></span>
                    )}
                </div>

                <div
                    className={`m-multiselectGroup__options ${
                        open ? '-open' : ''
                    }`}
                    onScroll={handleScroll}
                >
                    <ul>{getOptions()}</ul>
                </div>
            </div>
            {error && (
                <span
                    className={`m-inputGroup__error ${error ? '-active' : ''}`}
                >
                    {error}
                </span>
            )}
        </div>
    )
}

export const MultiselectDefaultPropTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    entityType: PropTypes.string,
    params: PropTypes.object,
    searchable: PropTypes.bool,
    required: PropTypes.bool,
    reload: PropTypes.any,
    condition: PropTypes.bool,
    isJSONAPI: PropTypes.bool,
    apiUrl: PropTypes.string,
    displayAttribute: PropTypes.string,
    valuesWithoutAttribute: PropTypes.array,
    defaultOptions: PropTypes.array,
}

Multiselect.propTypes = {
    ...MultiselectDefaultPropTypes,
    value: PropTypes.array.isRequired,
    setValue: PropTypes.func.isRequired,
    setTouched: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
}

export default Multiselect
