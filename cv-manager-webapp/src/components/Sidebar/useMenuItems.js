import ROUTES from 'constants/routes'

const MENU_ITEMS = [
    {
        key: 'cvSearch',
        label: 'menuItems.cvSearch',
        icon: 'home',
        to: ROUTES.HOME,
    },
    {
        key: 'userApplication',
        label: 'menuItems.userApplication',
        icon: 'home',
        to: ROUTES.USER_APPLICATION,
    }
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
