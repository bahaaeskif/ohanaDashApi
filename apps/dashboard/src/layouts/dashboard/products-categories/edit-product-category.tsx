import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'

import { UpdateAssetDto, UpdateProductCategoryDto } from '@store/dto'
import {
    BaseResponse,
    IErrors,
    IErrorsResponse,
    IProductCategory,
    PageRoute,
    Translations,
} from '@store/types'
import { updateProductCategoryApi, uploadFileApi } from '@store/ui-core/api'
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

export const EditProductCategory = () => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const { pathname, state } = useLocation()

    const apiRoot = useRecoilValue(apiRootAtom)
    const [{ path }, setNavbarButtonPath] = useRecoilState(navbarButtonPathAtom)

    const productCategory = state?.productCategory as IProductCategory
    const [data, setData] = useState<UpdateProductCategoryDto>({
        name: productCategory.name,
        order: productCategory.order,
        asset: {
            title: productCategory.asset.title,
            order: 1,
            url: '',
        },
    })

    const [errors, setErrors] = useState<IErrors[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [imageUrl, setImageUrl] = useState(
        productCategory.asset.sizesUrls[720],
    )

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
        setData((prev) => {
            delete prev.asset
            return prev
        })
        setImageUrl(productCategory.asset.sizesUrls[720])
    }

    const next = (res: BaseResponse<IProductCategory>) => {
        const message = t(Translations.COMMON.SUCCESS_MESSAGE)
        Toast(message, 'success')
        setLoading(false)
        navigate(path)
    }

    const Errors = (res: BaseResponse<IErrorsResponse>) => {
        if (typeof res.data.errors === 'string') Toast(res.data.errors, 'error')
        else setErrors(res.data.errors)
        setLoading(false)
    }

    const sendData = async () => {
        setLoading(true)
        const res = await updateProductCategoryApi(productCategory.id, data)
        if (res.status >= 200 && res.status < 300) next(res)
        else Errors(res as any)
    }

    const back = () => {
        const paths = pathname.split('/')
        navigate(join(paths[1], paths[2]))
    }

    useEffect(() => {
        setNavbarButtonPath((prev) => {
            if (CheckDataIfChange(data, productCategory))
                return {
                    ...prev,
                    title: NavbarButtonSetting.CONFIRM,
                    buttonFunction: sendData,
                    isLoading: loading,
                }
            else
                return {
                    ...prev,
                    title: NavbarButtonSetting.BACK,
                    buttonFunction: back,
                    isLoading: loading,
                }
        })
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

    if (!productCategory) navigate(join(PageRoute.NOT_FOUND))

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
                        id="name"
                        onChange={onChangeInput}
                        label={Translations.KEY.NAME}
                        className="w-full px-3 md:w-1/2"
                        value={data.name}
                        errors={GetInputErrors<UpdateProductCategoryDto>(
                            errors,
                            'name',
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
                        errors={GetInputErrors<UpdateProductCategoryDto>(
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
                            UpdateProductCategoryDto,
                            UpdateAssetDto
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
                            UpdateProductCategoryDto,
                            UpdateAssetDto
                        >(errors, 'asset', 'title')}
                    />
                </div>
            </div>
        </>
    )
}
