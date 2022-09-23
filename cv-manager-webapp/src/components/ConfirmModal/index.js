import React from 'react'

import { BUTTON_STATUS } from 'constants/enums'

import Button from 'components/Button'

const ConfirmModal = ({ handleConfirm, handleCancel, message }) => {
    return (
        <div className="m-confirmationModal -show">
            <div className="wrapper">
                <div className="m-confirmationModal__content">
                    <h5>{message}</h5>
                    <div className="m-confirmationModal__buttons">
                        <Button
                            label="button.confirm"
                            onClick={handleConfirm}
                        />
                        <Button
                            label="button.cancel"
                            onClick={handleCancel}
                            btnClass={BUTTON_STATUS.DISABLED}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal
