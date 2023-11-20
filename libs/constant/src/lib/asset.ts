import { ISizeUrl } from '@store/types'

export const FILE_SIZE = 1024 * 1024 * 10

export const FILE_WIDTH = [720, 480, 360]

export const FILE_EXTENTION = ['png', 'jpeg', 'jpg']

export const DEFAULT_SIZE_URL: ISizeUrl = {
    '360': 'public/thumbnail.png',
    '480': 'public/thumbnail.png',
    '720': 'public/thumbnail.png',
}
