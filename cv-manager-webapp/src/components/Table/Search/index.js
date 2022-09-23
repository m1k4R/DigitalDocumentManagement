import React, { useState } from 'react'
import { useTranslate } from 'react-polyglot'
import PropTypes from 'prop-types'
import _ from 'lodash'

import Icon from 'components/Icon'
import { secondaryColor } from 'constants/colors'

const Search = ({ search, setSearch }) => {
    const t = useTranslate()

    const [searchValue, setSearchValue] = useState(search || '')

    const handleChangeDebounce = _.debounce((event) => {
        const { value } = event.target
        setSearch(value)
    }, 1000)

    const handleChange = (event) => {
        const { value } = event.target
        setSearchValue(value)

        handleChangeDebounce(event)
    }

    const handleClear = () => {
        setSearch('')
        setSearchValue('')
    }

    return (
        <div>
            <div className="m-searchGlobal -tableSearch">
                <input
                    type="text"
                    placeholder={`${t('form.typeToSearchTable')}...`}
                    value={searchValue}
                    onChange={handleChange}
                    className="m-searchGlobal__input"
                    autoComplete="off"
                />
                <Icon name="search" color={secondaryColor} />
                {search && (
                    <span
                        onClick={handleClear}
                        className="m-searchGlobal__close"
                    />
                )}
            </div>
        </div>
    )
}

Search.propTypes = {
    search: PropTypes.string,
    setSearch: PropTypes.func.isRequired,
}

export default Search
