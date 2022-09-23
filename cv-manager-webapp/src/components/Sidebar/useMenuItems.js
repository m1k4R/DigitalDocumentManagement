import ROUTES from 'constants/routes'

const MENU_ITEMS = [
    {
        key: 'home',
        label: 'menuItems.home',
        icon: 'home',
        to: ROUTES.HOME,
    },
    {
        key: 'reports',
        label: 'menuItems.home',
        to: '/reports',
        icon: 'home',
        subitems: [
            {
                key: 'daily-reports',
                label: 'menuItems.home',
                to: '/daily-reports',
                icon: 'home',
            },
            {
                key: 'weekly-reports',
                label: 'menuItems.home',
                to: '/weekly-reports',
                icon: 'home',
            },
        ],
    },
    {
        key: 'template-form',
        label: 'menuItems.formTemplate',
        to: ROUTES.TEMPLATE_FORM,
        icon: 'home',
    },
    {
        key: 'template-table',
        label: 'menuItems.tableTemplate',
        to: ROUTES.TEMPLATE_TABLE,
        icon: 'home',
    },
]

const ADMIN_MENU_ITEMS = [
    ...MENU_ITEMS,
    // Admin part
]

const useMenuItems = (userRoles) => {
    // TODO:: Add this when rolls are implemented
    // if (!userRoles) return []

    // const isAdmin = userRoles.some((role) => role.name === ROLES.ADMIN.NAME)

    switch (true) {
        // case isAdmin:
        //     return ADMIN_MENU_ITEMS
        default:
            return MENU_ITEMS
    }
}

export default useMenuItems
