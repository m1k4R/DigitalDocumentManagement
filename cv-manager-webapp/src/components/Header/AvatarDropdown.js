/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useTranslate } from 'react-polyglot'
import PropTypes from 'prop-types'

import { CurrentUserContext } from 'contexts/CurrentUserContext'

import { clearStorage } from 'services/localStorage.service'

import clickOutsideHOC from 'components/wrappers/clickOutsideHOC'

import Avatar from 'components/Avatar'

const AvatarDropdown = ({ open }) => {
    const t = useTranslate()
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext)

    const handleLogout = () => {
        setCurrentUser(null)
        clearStorage()
    }

    if (!currentUser) return null

    return (
        <div className="m-avatar">
            <Avatar
                firstName={currentUser.firstName}
                lastName={currentUser.lastName}
                avatar={currentUser.avatarPath}
            />
            <i className={`a-chevron ${open ? '-up' : '-down'}`} />
            <div className={`m-avatar__popup ${open ? '-open' : ''}`}>
                <Link
                    className="m-avatar__item -logout"
                    to="#"
                    onClick={handleLogout}
                >
                    {t('button.logout')}
                </Link>
            </div>
        </div>
    )
}

AvatarDropdown.propTypes = {
    open: PropTypes.bool.isRequired,
}

export default clickOutsideHOC(AvatarDropdown)
