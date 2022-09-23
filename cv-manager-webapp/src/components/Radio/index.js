import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import useFetchOptions from 'hooks/useFetchOptions'

const Radio = ({
    label,
    value,
    setValue,
    entityType,
    params,
    relationship,
    defaultOptions,
    ...props
}) => {
    const { options } = useFetchOptions(
        entityType,
        {
            ...params,
            pagination: false,
        },
        false,
        true,
        defaultOptions
    )

    useEffect(() => {
        if (value) {
            setValue(relationship ? { id: value.id, type: entityType } : value)
        } else if (options.length > 0) {
            setValue(
                relationship
                    ? { id: options[0].id, type: entityType }
                    : options[0].id
            )
        }
    }, [options])

    const handleChange = (id) => {
        setValue(relationship ? { id, type: entityType } : id)
    }

    const getIsChecked = (id) => {
        if (relationship) {
            return value?.id === id
        }
        return value === id
    }

    return (
        <div className={`m-radioGroupContainer`}>
            {label && <label>{label}</label>}
            <div className="m-radioGroupContainer__options">
                {options.map(({ id, name }, index) => (
                    <div className="m-radioGroup" key={id}>
                        <input
                            {...props}
                            name={name}
                            type="radio"
                            id={`${name}${id}`}
                            onChange={() => handleChange(id)}
                            value={id}
                            checked={getIsChecked(id)}
                        />
                        <label htmlFor={`${name}${id}`}>
                            <span className={`radio`}></span>
                            <span className="label">{name}</span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export const RadioDefaultPropTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    entityType: PropTypes.string,
    params: PropTypes.object,
    relationship: PropTypes.bool,
    defaultOptions: PropTypes.array,
}

Radio.propTypes = {
    ...RadioDefaultPropTypes,
    value: PropTypes.any,
    setValue: PropTypes.func.isRequired,
}

export default Radio
