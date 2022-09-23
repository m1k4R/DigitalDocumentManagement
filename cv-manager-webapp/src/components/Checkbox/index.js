import React from 'react'
import { useTranslate } from 'react-polyglot'
import PropTypes from 'prop-types'

const Checkbox = ({ label, value, error, ...props }) => {
    const t = useTranslate()

    return (
        <div className="a-checkbox">
            <input {...props} type="checkbox" checked={value} id={props.name} />
            <label htmlFor={props.name}>{t(label)}</label>
            <span className={`m-inputGroup__error ${error ? '-active' : ''}`}>
                {error}
            </span>
        </div>
    )
}

export const CheckboxDefaultPropTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
}

Checkbox.propTypes = {
    ...CheckboxDefaultPropTypes,
    value: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
}

export default Checkbox
