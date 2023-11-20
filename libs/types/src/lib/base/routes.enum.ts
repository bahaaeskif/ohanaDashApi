export enum PageRoute {
    NOT_FOUND = 'Not-Found',

    AUTH = 'Auth',
    LOGIN = 'Login',

    DASHBOARD = 'Dashboard',
    EMPLOYEES = 'Employees',
    PRODUCTS = 'Products',
    PRODUCTS_CATEGORIES = 'Products-Categories',
    SETTINGS = 'Settings',
    ORDERS = 'Orders',

    EDIT_PASSWORD = 'Edit-Password',
    ADD = 'Add',
    EDIT = 'Edit',
    SHOW = 'Show',
}

export enum ApiRoutes {
    LOGIN = 'dashboard/auth/login',
    REFRESH_TOKEN = 'dashboard/auth/refresh-token',

    ASSET = 'assets',

    EMPLOYEES = 'dashboard/employees',
    PRODUCTS = 'dashboard/products',
    PRODUCTS_CATEGORIES = 'dashboard/products-categories',
    ORDERS = 'dashboard/orders',
}
