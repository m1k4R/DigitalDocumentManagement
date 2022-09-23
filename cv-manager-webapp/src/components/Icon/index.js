import React from 'react'
import { PropTypes } from 'prop-types'

export const ICON_SIZE = {
    LARGE: 24,
    SMALL: 18,
}

const getViewBoxSize = (size) => {
    switch (size) {
        case ICON_SIZE.LARGE:
        case ICON_SIZE.SMALL:
        default:
            return 24
    }
}

const renderIcon = (name, color, size, fill) => {
    const boxSize = getViewBoxSize(size)
    switch (name) {
        case 'home':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-gauge"
                    width={size}
                    height={size}
                    viewBox={`0 0 ${boxSize} ${boxSize}`}
                    strokeWidth="1"
                    stroke={color}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="12" r="1" />
                    <line x1="13.41" y1="10.59" x2="16" y2="8" />
                    <path d="M7 12a5 5 0 0 1 5 -5" />
                </svg>
            )
        case 'chevron-left':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-left"
                    width={size}
                    height={size}
                    viewBox={`0 0 ${boxSize} ${boxSize}`}
                    strokeWidth="1.5"
                    stroke={color}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M15 6L9 12L15 18" stroke="currentColor" />
                </svg>
            )
        case 'chevron-right':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-right"
                    width={size}
                    height={size}
                    viewBox={`0 0 ${boxSize} ${boxSize}`}
                    strokeWidth="1.5"
                    stroke={color}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M9 6L15 12L9 18" stroke="currentColor" />
                </svg>
            )
        case 'sort':
            return (
                <svg
                    width={size}
                    height={size}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g fill="none" fillRule="evenodd">
                        <path fill="none" d="M-130-99h1440v700H-130z" />
                        <g
                            stroke="#9C9FA9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M1 .857h6M1 6h6M1 11.143h7.714M10.429 3.429L13" />
                        </g>
                    </g>
                </svg>
            )
        case 'sort-asc':
            return (
                <svg
                    width={size}
                    height={size}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g fill="none" fillRule="evenodd">
                        <path fill="none" d="M-130-99h1440v700H-130z" />
                        <g
                            stroke="#9C9FA9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M1 .857h6M1 6h6M1 11.143h7.714M10.429 3.429L13 .857l2.571 2.572M13 .857v10.286" />
                        </g>
                    </g>
                </svg>
            )
        case 'sort-desc':
            return (
                <svg
                    width={size}
                    height={size}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g fill="none" fillRule="evenodd">
                        <path fill="none" d="M-214-99h1440v700H-214z" />
                        <g
                            stroke="#9C9FA9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M1 .857h7.714M1 6h6M1 11.143h6M10.429 8.571L13 11.143l2.571-2.572M13 .857v10.286" />
                            <g>
                                <path d="M1 .857h7.714M1 6h6M1 11.143h6M10.429 8.571L13 11.143l2.571-2.572M13 .857v10.286" />
                            </g>
                        </g>
                    </g>
                </svg>
            )
        case 'pencil':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-pencil"
                    width={size}
                    height={size}
                    viewBox={`0 0 ${boxSize} ${boxSize}`}
                    strokeWidth="1.5"
                    stroke={color}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                    <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
                </svg>
            )
        case 'trash':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-trash"
                    width={size}
                    height={size}
                    viewBox={`0 0 ${boxSize} ${boxSize}`}
                    strokeWidth="1.5"
                    stroke={color}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1="4" y1="7" x2="20" y2="7" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
            )
        case 'user':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-user"
                    width={size}
                    height={size}
                    viewBox={`0 0 ${boxSize} ${boxSize}`}
                    strokeWidth="1"
                    stroke={color}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="12" cy="7" r="4" />
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                </svg>
            )
        case 'lock':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-lock"
                    width={size}
                    height={size}
                    viewBox={`0 0 ${boxSize} ${boxSize}`}
                    strokeWidth="1.5"
                    stroke={color}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <circle cx="12" cy="16" r="1" />
                    <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
                </svg>
            )
        case 'email':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-at"
                    width={size}
                    height={size}
                    viewBox={`0 0 ${boxSize} ${boxSize}`}
                    strokeWidth="1.5"
                    stroke={color}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="12" cy="12" r="4" />
                    <path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28" />
                </svg>
            )
        default:
            return null
    }
}

const Icon = ({ name, color, size, fill }) => {
    return renderIcon(name, color, size, fill)
}

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number,
}

Icon.defaultProps = {
    color: '#CCD0D6',
    size: ICON_SIZE.LARGE,
    fill: 'none',
}

export default Icon
