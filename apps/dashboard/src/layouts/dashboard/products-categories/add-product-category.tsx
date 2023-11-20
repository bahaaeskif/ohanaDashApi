import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'

import { defaultProductCategory } from '@store/constant'
import { CreateAssetDto, CreateProductCategoryDto } from '@store/dto'
import {
    BaseResponse,
    IErrors,
    IErrorsResponse,
    IProductCategory,
    Languages,
    Translations,
} from '@store/types'
import { addProductCategoryApi, uploadFileApi } from '@store/ui-core/api'
import {
    Divider,
    ImagePicker,
    Input,
    NavbarButtonSetting,
    Text,
} from '@store/ui-core/components'
import { apiRootAtom, navbarButtonPathAtom } from '@store/ui-core/recoil'
import { Toast } from '@store/ui-core/services'
import { CheckDataIfChange, GetInputErrors, join } from '@store/utils/ui'

export const AddProductCategory = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { t, i18n } = useTranslation()

    const apiRoot = useRecoilValue(apiRootAtom)
    const [{ path }, setNavbarButtonPath] = useRecoilState(navbarButtonPathAtom)

    const [errors, setErrors] = useState<IErrors[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<CreateProductCategoryDto>(
        defaultProductCategory,
    )
    const [imageUrl, setImageUrl] = useState('public/thumbnail.png')

    const onChangeInput = async (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { id, value, type } = e.target
        if (id.startsWith('asset')) {
            const key = id.split('.')[1]
            if (key === 'title')
                setData((prev) => ({
                    ...prev,
                    asset: {
                        ...prev.asset,
                        title: value,
                    },
                }))
            else if (key === 'url') {
                const file = e.target['files'][0]
                const newFormData = new FormData()
                newFormData.append('file', file)
                const res = await uploadFileApi(newFormData)
                if (res.status >= 200 && res.status < 300) {
                    setData((prev) => ({
                        ...prev,
                        asset: {
                            ...prev.asset,
                            url: res.data.url,
                        },
                    }))
                    setImageUrl(res.data.url)
                    e.target.value = ''
                }
            }
        } else
            setData((prev) => ({
                ...prev,
                [id]: type === 'number' ? +value : value,
            }))
    }

    const deleteImage = (e) => {
        let target = e.target
        let id = target.id
        setData({
            ...data,
            asset: {
                ...data.asset,
                url: '',
            },
        })
        setImageUrl('public/thumbnail.png')
    }

    const next = (res: BaseResponse<IProductCategory>) => {
        const message = t(Translations.COMMON.SUCCESS_ADD, {
            item:
                i18n.language === Languages.AR
                    ? res.data.name_ar
                    : res.data.name_en,
        })
        Toast(message, 'success')
        setData(defaultProductCategory)
        setImageUrl('public/thumbnail.png')
        setErrors([])
        setLoading(false)
    }

    const Errors = (res: BaseResponse<IErrorsResponse>) => {
        if (typeof res.data.errors === 'string') Toast(res.data.errors, 'error')
        else setErrors(res.data.errors)
        setLoading(false)
    }

    const sendData = async () => {
        setLoading(true)
        const res = await addProductCategoryApi(data)
        if (res.status >= 200 && res.status < 300) next(res)
        else Errors(res as any)
    }

    const back = () => {
        const paths = pathname.split('/')
        navigate(join(paths[1], paths[2]))
    }

    useEffect(() => {
        if (CheckDataIfChange(data, defaultProductCategory))
            setNavbarButtonPath((prev) => ({
                ...prev,
                title: NavbarButtonSetting.CONFIRM,
                buttonFunction: sendData,
                isLoading: loading,
            }))
        else
            setNavbarButtonPath((prev) => ({
                ...prev,
                title: NavbarButtonSetting.BACK,
                buttonFunction: back,
                isLoading: loading,
            }))
    }, [data, loading])

    useEffect(() => {
        const paths = pathname.split('/')
        setNavbarButtonPath({
            path: join(paths[1], paths[2]),
            title: NavbarButtonSetting.BACK,
            buttonFunction: back,
            isLoading: loading,
        })
    }, [])

    return (
        <>
            <title>{t(Translations.PAGES.ADD)}</title>
            <div className="add-container">
                <Text
                    text={Translations.COMMON.INFORMATION}
                    size="text-3xl"
                    margin="m-3"
                    color="text-secondary-500"
                    withTranslation
                />
                <div className="flex flex-wrap">
                    <Input
                        id="name_ar"
                        onChange={onChangeInput}
                        label={Translations.KEY.NAME_AR}
                        className="w-full px-3 md:w-1/2"
                        value={data.name_ar}
                        errors={GetInputErrors<CreateProductCategoryDto>(
                            errors,
                            'name_ar',
                        )}
                        fullWidth
                    />
                    <Input
                        id="name_en"
                        onChange={onChangeInput}
                        label={Translations.KEY.NAME_EN}
                        className="w-full px-3 md:w-1/2"
                        value={data.name_en}
                        errors={GetInputErrors<CreateProductCategoryDto>(
                            errors,
                            'name_en',
                        )}
                        fullWidth
                    />
                    <Input
                        id="order"
                        onChange={onChangeInput}
                        label={Translations.KEY.ORDER}
                        className="w-full px-3 md:w-1/2"
                        type="number"
                        value={+data.order}
                        errors={GetInputErrors<CreateProductCategoryDto>(
                            errors,
                            'order',
                        )}
                        fullWidth
                    />
                </div>

                <Divider margin="mt-10" />

                <Text
                    text={Translations.COMMON.VISUAL_INFORMATION}
                    size="text-3xl"
                    margin="m-3"
                    color="text-secondary-500"
                    withTranslation
                />

                <div className="flex flex-wrap">
                    <Input
                        id="asset.title"
                        onChange={onChangeInput}
                        label={Translations.KEY.ASSET_TITLE}
                        className="w-full px-3 md:w-1/2"
                        value={data?.asset?.title}
                        errors={GetInputErrors<
                            CreateProductCategoryDto,
                            CreateAssetDto
                        >(errors, 'asset', 'title')}
                        fullWidth
                    />
                    <ImagePicker
                        style="w-full px-3 md:w-1/2"
                        image={`${apiRoot}/${imageUrl}`}
                        label={Translations.KEY.CATEGORY_ASSET}
                        onChangeInfo={onChangeInput}
                        id="asset.url"
                        onClick={deleteImage}
                        errors={GetInputErrors<
                            CreateProductCategoryDto,
                            CreateAssetDto
                        >(errors, 'asset', 'url')}
                    />
                </div>
            </div>
        </>
    )
}
