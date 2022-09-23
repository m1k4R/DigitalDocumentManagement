import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslate } from 'react-polyglot'
import Icon from 'components/Icon'
import { Fragment } from 'react'
import ConfirmModal from 'components/ConfirmModal'

const ActionButton = ({
    action: {
        handleAction,
        icon,
        tooltip,
        confirmationMessage,
        hasCondition = false,
        condition,
    },
    item,
    stopPropagation,
}) => {
    const t = useTranslate()

    const [confirmModal, setConfirmModal] = useState(false)

    const handleOnClick = (event) => {
        stopPropagation && event.stopPropagation()
        if (confirmationMessage) {
            setConfirmModal(true)
        } else {
            handleAction(item)
        }
    }

    const handleConfirm = (event) => {
        stopPropagation && event.stopPropagation()
        setConfirmModal(false)
        handleAction(item)
    }

    const handleCancel = (event) => {
        stopPropagation && event.stopPropagation()
        setConfirmModal(false)
    }

    const renderIcon = () => {
        if (hasCondition) {
            const iconName = icon.split(',')
            const name = item[condition] ? iconName[0] : iconName[1]
            return <Icon name={name} />
        }

        return <Icon name={icon} />
    }

    const renderText = (value) => {
        if (hasCondition) {
            const iconTooltip = value.split(',')
            const title = item[condition] ? iconTooltip[0] : iconTooltip[1]
            return t(title)
        }

        return t(value)
    }

    if (!handleAction) return null

    return (
        <Fragment>
            <span title={renderText(tooltip)} onClick={handleOnClick}>
                {renderIcon()}
            </span>
            {confirmModal && (
                <ConfirmModal
                    message={renderText(confirmationMessage)}
                    handleConfirm={handleConfirm}
                    handleCancel={handleCancel}
                />
            )}
        </Fragment>
    )
}

ActionButton.propTypes = {
    action: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    stopPropagation: PropTypes.bool,
}

export default ActionButton
