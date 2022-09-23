import React from 'react'
import PropTypes from 'prop-types'
import { useTranslate } from 'react-polyglot'

const TextArea = ({ label, required, error, placeholder, ...props }) => {
    const t = useTranslate()

    return (
        <div className={`m-textarea ${error ? '-error' : ''}`}>
            {label && (
                <label htmlFor={props.name}>
                    {t(label)}
                    {required && <span className="a-require-star"> *</span>}
                </label>
            )}
            <textarea
                {...props}
                placeholder={placeholder ? t(placeholder) : ''}
            />
            {error && (
                <span className={`m-input__error ${error ? '-active' : ''}`}>
                    {error}
                </span>
            )}
        </div>
    )
}

export const TextAreaDefaultPropTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
}

TextArea.propTypes = {
    ...TextAreaDefaultPropTypes,
    value: PropTypes.any,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
}

export default TextArea
