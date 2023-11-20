import slugify from 'slugify'

export const GetApiUrl = (restPath: string) => {
    return `${process.env.API_URL}/${restPath}`
}

export function createSlug(name: string): string {
    return slugify(name, {
        replacement: '-',
        lower: true,
        trim: true,
    })
}
