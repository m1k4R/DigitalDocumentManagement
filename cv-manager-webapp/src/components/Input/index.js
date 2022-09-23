import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslate } from 'react-polyglot'

import { ICON_SIZE, INPUT_FILED_TYPE } from 'constants/enums'

import Icon from 'components/Icon'

const Input = ({
    label,
    type,
    required,
    icon,
    iconColor,
    onIconClick,
    error,
    placeholder,
    ...props
}) => {
    const t = useTranslate()
    const [showText, setShowText] = useState(false)

    const handleIconClick = () => {
        if (type === INPUT_FILED_TYPE.PASSWORD) {
            setShowText(!showText)
        } else if (onIconClick) {
            onIconClick()
        }
    }

    return (
        <div
            className={`m-inputGroup ${icon ? '-icon' : ''}
             ${error ? '-error' : ''}`}
        >
            {label && (
                <label htmlFor={props.name}>
                    {t(label)}
                    {required && <span className="a-require-star"> *</span>}
                </label>
            )}
            <input
                {...props}
                placeholder={placeholder ? t(placeholder) : ''}
                type={
                    type === INPUT_FILED_TYPE.PASSWORD && showText
                        ? INPUT_FILED_TYPE.TEXT
                        : type
                }
                autoComplete="off"
            />
            {icon && (
                <Icon
                    name={icon}
                    size={ICON_SIZE.SMALL}
                    color={iconColor}
                    onClick={handleIconClick}
                />
            )}
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

export const InputDefaultPropTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
    required: PropTypes.bool,
    icon: PropTypes.string,
    iconColor: PropTypes.string,
    disabled: PropTypes.bool,
}

Input.propTypes = {
    ...InputDefaultPropTypes,
    value: PropTypes.string.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onIconClick: PropTypes.func,
    icon: PropTypes.string,
}

export default Input
