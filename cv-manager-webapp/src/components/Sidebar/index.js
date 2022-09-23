import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { CurrentUserContext } from 'contexts/CurrentUserContext'
import { useLocation } from 'react-router-dom'
import useMenuItems from './useMenuItems'

import SidebarItem from './SidebarItem'
import ROUTES from 'constants/routes'

const Sidebar = ({ open, setOpen, hocRef }) => {
    const { currentUser } = useContext(CurrentUserContext)
    const menuItems = useMenuItems(currentUser?.userRoles)

    const [active, setActive] = useState()

    return (
        <div
            ref={hocRef}
            className={`m-sidebar -lowerLevel ${open ? '' : '-closed'}`}
        >
            <div
                className="m-sidebar__toggler"
                onClick={() => setOpen(!open)}
            />
            <div className="m-sidebar__scroll">
                {menuItems.map(({ key, label, to, icon, subitems }) => (
                    <SidebarItem
                        key={key}
                        label={label}
                        to={to}
                        icon={icon}
                        subitems={subitems}
                        active={active}
                        setActive={setActive}
                    />
                ))}
            </div>
        </div>
    )
}

Sidebar.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
}

export default Sidebar
