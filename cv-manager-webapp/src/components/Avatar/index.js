import React from 'react'
import PropTypes from 'prop-types'

import { BASE_URL } from 'utils/axiosClient'

import Icon from 'components/Icon'

const Avatar = ({ firstName, lastName, avatar }) => {
    return (
        <div className="m-avatar__imgInfo">
            <div className="m-avatar__img">
                {avatar ? (
                    <img src={`${BASE_URL}${avatar}`} alt="avatar" />
                ) : (
                    <span className="m-avatar__icon">
                        <Icon name="user" color="#B4B9C4" />
                    </span>
                )}
            </div>
            <span className="m-avatar__info">
                <span className="m-avatar__name">
                    {firstName} {lastName.charAt(0)}.
                </span>
            </span>
        </div>
    )
}

Avatar.propTypes = {
    avatar: PropTypes.string,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
}

export default Avatar
