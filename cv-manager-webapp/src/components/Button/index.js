import React from 'react'
import PropTypes from 'prop-types'
import { useTranslate } from 'react-polyglot'

import { BUTTON_STATUS, BUTTON_TYPE, ICON_SIZE } from 'constants/enums'
import Icon from 'components/Icon'

const Button = ({
    type,
    label,
    onClick,
    btnClass,
    disabled,
    isLoading,
    tooltip,
    icon,
}) => {
    const t = useTranslate()

    return (
        <button
            className={`a-btn -${disabled ? BUTTON_STATUS.DISABLED : btnClass}`}
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            title={tooltip ? t(tooltip) : ''}
        >
            <div>
                {icon && <Icon size={ICON_SIZE.TINY} name={icon} />}
                {isLoading ? 'Loading...' : t(label)}
            </div>
        </button>
    )
}

Button.propTypes = {
    type: PropTypes.oneOf(['button', 'submit']).isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    onClick: PropTypes.func,
    btnClass: PropTypes.oneOf([
        BUTTON_STATUS.PRIMARY,
        BUTTON_STATUS.SECONDARY,
        BUTTON_STATUS.DISABLED,
    ]),
    disabled: PropTypes.bool,
}

Button.defaultProps = {
    type: BUTTON_TYPE.BUTTON,
    btnClass: BUTTON_STATUS.PRIMARY,
    disabled: false,
}

export default Button
