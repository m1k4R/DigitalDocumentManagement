export const DEFAULT_LANGUAGE = 'en'

//TODO:: Sync this with backend
// export const ROLES = {
//     ADMIN: {
//         ID: 1,
//         NAME: 'ROLE_ADMIN',
//     },
//     USER: {
//         ID: 2,
//         NAME: 'ROLE_USER',
//     },
// }

export const ROLES = {
    ROLE_LOCATION_MANAGER: { id: 1, name: 'Location manager' },
    ROLE_REGIONAL_MANAGER: { id: 2, name: 'Regional manager' },
    ROLE_COMPANY_MANAGER: { id: 3, name: 'Company manager' },
    ROLE_ADMIN: { id: 4, name: 'Admin' },
}

export const ALERT_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    DEFAULT: 'default',
}

export const ICON_SIZE = {
    TINY: 16,
    SMALL: 24,
    MEDIUM: 32,
    LARGE: 48,
}

export const ALERT_POSITIONS = {
    CENTER: 'center',
    RIGHT: 'right',
}

export const INPUT_FILED_TYPE = {
    TEXT: 'text',
    PASSWORD: 'password',
    EMAIL: 'email',
    FILE: 'file',
    CHECKBOX: 'checkbox',
    NUMBER: 'number',
}

export const BUTTON_TYPE = {
    BUTTON: 'button',
    SUBMIT: 'submit',
    RESET: 'reset',
}

export const BUTTON_STATUS = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    DISABLED: 'disabled',
}

export const SORT_TYPES = {
    ASC: 1,
    DESC: -1,
}

export const TABLE_FILTER_TYPE = {
    TEXT: 'text',
    DATE_TIME: 'date-time',
    SELECT: 'select',
    CHECKBOX: 'checkbox',
}

export const MODAL_TYPES = {
    SMALL: '-small',
}

export const EDUCATIONS = [
    {name:'Elementary school', id: 1},
    {name:'High school', id: 2},
    {name:'Bachelors degree', id: 3},
    {name:'Masters degree', id: 4},
    {name:'PhD degree', id: 5}
]
