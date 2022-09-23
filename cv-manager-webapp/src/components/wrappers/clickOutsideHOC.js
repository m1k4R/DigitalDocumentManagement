import React, { useRef, useState, useEffect } from 'react'

const clickOutsideHOC =
    (WrappedComponent, toggleOpenInside = true) =>
    (props) => {
        const hocRef = useRef(null)
        const [open, setOpen] = useState(false)

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
            }
        }
        return (
            <div
                ref={hocRef}
                onClick={toggleOpenInside ? () => setOpen(!open) : undefined}
            >
                <WrappedComponent {...props} open={open} setOpen={setOpen} />
            </div>
        )
    }

export default clickOutsideHOC
