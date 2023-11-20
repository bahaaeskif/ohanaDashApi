import {
    CreateEmployeeDto,
    CreateProductCategoryDto,
    CreateProductDto,
    UpdatePasswordDto,
} from '@store/dto'
import { UserRole } from '@store/types'

export const priceUnit = {
    en: 'K.D',
    ar: 'د.ك',
}

export const defaultColors = [
    { label: 'red', value: 'red' },
    { label: 'green', value: 'green' },
    { label: 'yellow', value: 'yellow' },
    { label: 'black', value: 'black' },
    { label: 'gray', value: 'gray' },
    { label: 'cyan', value: 'cyan' },
    { label: 'white', value: 'white' },
    { label: 'purple', value: 'purple' },
    { label: 'blue', value: 'blue' },
    { label: 'wheat', value: 'wheat' },
]

export const defaultSizes = []
for (let i = 1; i <= 100; i++) {
    const obj = {
        label: i.toString(),
        value: i.toString(),
    }
    defaultSizes.push(obj)
}

export const defaultEmployee: CreateEmployeeDto = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    passwordConfirm: '',
    role: UserRole.EMPLOYEE,
}

export const defaultUpdatePassword: UpdatePasswordDto = {
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
}

export const defaultProduct: CreateProductDto = {
    name_ar: '',
    name_en: '',
    price: 0,
    details_ar: '',
    details_en: '',
    productCategoryId: '',
    colors: [],
    sizes: [],
    model: '',
    assets: [
        'public/thumbnail.png',
        // {
        //     title: '',
        //     order: 1,
        //     url: 'public/thumbnail.png',
        // },
    ],
}

export const defaultProductCategory: CreateProductCategoryDto = {
    name_ar: '',
    name_en: '',
    order: 1,
    asset: {
        title: '',
        order: 1,
        url: 'public/thumbnail.png',
    },
}
