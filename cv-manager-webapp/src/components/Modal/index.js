import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { MODAL_TYPES } from 'constants/enums'

const Modal = ({ open, setOpen, closeOnClickOutside, type, children }) => {
    const hocRef = useRef(null)

    useEffect(() => {
        if (closeOnClickOutside) {
            document.addEventListener('mousedown', handleClickOutside)
            return () => {
                document.removeEventListener('mousedown', handleClickOutside)
            }
        }
    }, [])

    const handleClickOutside = (event) => {
        if (
            hocRef &&
            hocRef.current &&
            !hocRef.current.contains(event.target)
        ) {
            setOpen(false)
        }
    }

    const closeModal = () => {
        setOpen(false)
    }

    return (
        <div className={`m-modal -show ${type || ''}`}>
            <div className="wrapper">
                <div className="m-modal__content" ref={hocRef}>
                    <span
                        onClick={closeModal}
                        className="m-modal__close"
                    ></span>
                    <div className="m-modal__body">
                        <h4>Modal Template</h4>
                        {children}
                    </div>
                    <div className="m-modal__footer"></div>
                </div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    type: PropTypes.oneOf([MODAL_TYPES.SMALL]),
}

Modal.defaultProps = {
    closeOnClickOutside: true,
}

export default Modal
