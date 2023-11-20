export const modalStatus = (
    modalId: string,
    modalOverlayId: string,
    value: boolean,
) => {
    const modal_overlay = document.querySelector(`#${modalOverlayId}`)!
    const modal = document.querySelector(`#${modalId}`)!

    const modalCl = modal.classList
    const overlayCl = modal_overlay

    if (value) {
        overlayCl.classList.remove('hidden')
        setTimeout(() => {
            modalCl.remove('opacity-0')
            modalCl.remove('-translate-y-full')
            modalCl.remove('scale-150')
        }, 100)
    } else {
        modalCl.add('-translate-y-full')
        setTimeout(() => {
            modalCl.add('opacity-0')
            modalCl.add('scale-150')
        }, 100)
        setTimeout(() => overlayCl.classList.add('hidden'), 300)
    }
}

export const defaultAddress = (title = '') => {
    return {
        _id: '',
        Title: title,
        Longitude: 0.0,
        Latitude: 0.0,
        Details: '',
        Note: '',
        With_Map: false,
        Is_App: false,
    }
}

// export const join = (...paths: string[]): string => {
// 	var path = "";
// 	paths.forEach((p) => (path += `/${p}`));
// 	return path;
// };

type JoinOverload = {
    (...paths: string[]): string
    (firstWithSeparator: boolean, ...paths: string[]): string
}

export const join: JoinOverload = (...params: any): string => {
    var path = ''
    if (typeof params[0] === 'boolean') {
        const [firstWithSeparator, ...paths] = params
        paths.forEach((p: string, index: number) => {
            if (!firstWithSeparator && index === 0) path += `${p}`
            else path += `/${p}`
        })
    } else params.forEach((p: string) => (path += `/${p}`))
    return path
}

export const CreateFormData = (data: any) => {
    const newFormData = new FormData()
    Object.keys(data).forEach((item) => {
        if (typeof data[item] === 'object' && data[item][0])
            data[item].forEach((file: any, index: number) => {
                newFormData.append(`${item}[${index}]`, file)
            })
        else newFormData.append(item, data[item])
    })
    return newFormData
}
