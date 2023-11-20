import { mkdir, unlink } from 'fs/promises'

export const CreateFolder = async (path: string) => {
    try {
        await mkdir(path)
    } catch (error: any) {
        // console.log('🚀 ~ file: file.util.ts:7 ~ CreateFolder ~ error:', error)
        // console.log('Folder Is Already Exist')
    }
}

export const DeleteFiles = async (paths: string[]) => {
    try {
        await Promise.all(paths.map(async (path) => await unlink(path)))
    } catch (error) {}
}
