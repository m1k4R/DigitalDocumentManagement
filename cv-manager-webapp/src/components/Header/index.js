import React from 'react'
import PropTypes from 'prop-types'

import AvatarDropdown from './AvatarDropdown'
import LanguagePicker from 'components/LanguagePicker'

const Header = ({ openSidebar, setOpenSidebar, hamBtnRef }) => {
    return (
        <header className="m-header -topLevel">
            <div className="m-header__logo">LOGO</div>
            <div
                className="m-toggler"
                ref={hamBtnRef}
                onClick={() => setOpenSidebar(!openSidebar)}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="m-header__main">
                <LanguagePicker />
                <AvatarDropdown />
            </div>
        </header>
    )
}

Header.propTypes = {
    openSidebar: PropTypes.bool.isRequired,
    setOpenSidebar: PropTypes.func.isRequired,
}

export default Header
