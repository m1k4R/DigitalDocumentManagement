import Header from 'components/Header'
import Sidebar from 'components/Sidebar'
import React, { useState, useRef, useEffect } from 'react'

const Layout = ({ children }) => {
    const [openSidebar, setOpenSidebar] = useState(false)
    const hocRef = useRef(null)
    const hamBtnRef = useRef(null)

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleClickOutside = (event) => {
        if (
            document.body.clientWidth < 768 &&
            hocRef &&
            hocRef.current &&
            !hocRef.current.contains(event.target) &&
            !hamBtnRef.current.contains(event.target)
        ) {
            setOpenSidebar(false)
        }
    }

    return (
        <div>
            <Sidebar
                open={openSidebar}
                setOpen={setOpenSidebar}
                hocRef={hocRef}
            />
            <div className={`m-main ${openSidebar ? '-sidebarIsOpen' : ''}`}>
                <Header
                    setOpenSidebar={setOpenSidebar}
                    hamBtnRef={hamBtnRef}
                    openSidebar={openSidebar}
                />
                <div className="m-main__wrapper">
                    <div className="_wr ">
                        <div className="_w">
                            <div className="m-main__content">{children}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout
