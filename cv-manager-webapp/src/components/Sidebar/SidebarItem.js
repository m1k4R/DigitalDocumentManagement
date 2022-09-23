import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useTranslate } from 'react-polyglot'

import ROUTES from 'constants/routes'
import { ICON_SIZE } from 'constants/enums'
import Icon from 'components/Icon'

// import Icon from 'components/Icon'

const SideBarItem = ({ label, to, icon, subitems, active, setActive }) => {
    const t = useTranslate()
    const { pathname } = useLocation()
    const navigate = useNavigate()

    // const [showSubitems, setShowSubitems] = useState(false)

    const handleClick = (e, to) => {
        e.stopPropagation()
        e.preventDefault()
        navigate(to)
    }

    const handleSetActive = () => {
        if (subitems) {
            setActive(active === to ? null : to)
        } else {
            setActive(to)
        }
    }

    const getIsActive = () => {
        if (to !== ROUTES.HOME) return pathname.includes(to)
        return pathname === ROUTES.HOME
    }

    const isActive = getIsActive()

    return (
        <Link
            className={`m-sidebar__itemContainer ${
                active === to ? ' -active' : ''
            }`}
            onClick={handleSetActive}
            to={subitems ? pathname : to}
        >
            <div className={`m-sidebar__item ${isActive ? ' -active' : ''}`}>
                <Icon name={icon} color="#929BB3" size={ICON_SIZE.SMALL} />
                <span className="m-sidebar__itemLabel">{t(label)}</span>
                {subitems && <span className="m-sidebar__subItemsIcon"></span>}
            </div>
            {subitems && (
                <div className="m-sidebar__subitems">
                    {subitems.map((item) => (
                        <div
                            className="m-sidebar__subitem"
                            key={item.key}
                            onClick={(e) => handleClick(e, item.to)}
                        >
                            <Icon
                                name={item.icon}
                                color="#B4B9C4"
                                size={ICON_SIZE.SMALL}
                            />
                            <span className="m-sidebar__subitemLabel">
                                {t(item.label)}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </Link>
    )
}

SideBarItem.propTypes = {
    // label: PropTypes.string.isRequired,
    // to: PropTypes.string,
    // onClick: PropTypes.func,
    // icon: PropTypes.string,
    // active: PropTypes.bool,
}

export default SideBarItem
