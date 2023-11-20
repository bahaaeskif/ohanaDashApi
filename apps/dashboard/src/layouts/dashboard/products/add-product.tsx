import { CSSProperties, ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { CreateProductDto } from '@store/dto'

import { defaultColors, defaultProduct, defaultSizes } from '@store/constant'
import {
    BaseResponse,
    IErrors,
    IErrorsResponse,
    IProduct,
    Languages,
    Translations,
} from '@store/types'
import {
    addProductApi,
    getProductsCategoriesApi,
    uploadFileApi,
} from '@store/ui-core/api'
import {
    Divider,
    Input,
    MultiSelectDropdown,
    MultiSelectValue,
    NavbarButtonSetting,
    OptionsGroup,
    SelectDropdown,
    SelectValue,
    Text,
    Textarea,
} from '@store/ui-core/components'
import { apiRootAtom, navbarButtonPathAtom } from '@store/ui-core/recoil'
import { Toast } from '@store/ui-core/services'
import { CheckDataIfChange, GetInputErrors, join } from '@store/utils/ui'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const baseStyle: CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
}

const focusedStyle = {
    borderColor: '#2196f3',
}

const acceptStyle = {
    borderColor: '#00e676',
}

const rejectStyle = {
    borderColor: '#ff1744',
}

export const AddProduct = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { t, i18n } = useTranslation()

    const apiRoot = useRecoilValue(apiRootAtom)
    const setNavbarButtonPath = useSetRecoilState(navbarButtonPathAtom)

    const [imageUrl, setImageUrl] = useState('public/thumbnail.png')
    const [data, setData] = useState<CreateProductDto>(defaultProduct)
    const [errors, setErrors] = useState<IErrors[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const [productsCategories, setProductsCategories] = useState<OptionsGroup>(
        [],
    )

    const onDrop = useCallback((acceptedFiles) => {
        // Do something with the files
    }, [])
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        acceptedFiles,
        isDragAccept,
        isFocused,
        isDragReject,
    } = useDropzone({
        onDrop,
    })

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isFocused, isDragAccept, isDragReject],
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
                    // asset: {
                    //     ...prev.asset,
                    //     title: value,
                    // },
                }))
            else if (key === 'url') {
                const file = e.target['files'][0]
                const newFormData = new FormData()
                newFormData.append('file', file)
                const res = await uploadFileApi(newFormData)
                if (res.status >= 200 && res.status < 300) {
                    setData((prev) => ({
                        ...prev,
                        // asset: {
                        //     ...prev.asset,
                        //     url: res.data.url,
                        // },
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
            // asset: {
            //     ...data.asset,
            //     url: '',
            // },
        })
        setImageUrl('public/thumbnail.png')
    }

    const onChangeSelect = (e: SelectValue) => {
        setData((prev) => ({
            ...prev,
            productCategoryId: e?.value!,
        }))
    }

    const onChangeMultiSelectColors = (e: MultiSelectValue) => {
        setData((prev) => ({
            ...prev,
            colors: e.map((c) => c.label),
        }))
    }

    const onChangeMultiSelectSizes = (e: MultiSelectValue) => {
        setData((prev) => ({
            ...prev,
            sizes: e.map((c) => c.label),
        }))
    }

    const next = (res: BaseResponse<IProduct>) => {
        const message = t(Translations.COMMON.SUCCESS_ADD, {
            item:
                i18n.language === Languages.AR
                    ? res.data.name_ar
                    : res.data.name_en,
        })
        Toast(message, 'success')
        setData(defaultProduct)
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
        // const assets: CreateAssetDto[] = []

        const assets = await Promise.all(
            data?.assets?.map(async (acceptedFile) => {
                const response = await uploadFileApi(acceptedFile)
                if (response.status >= 200 && response.status < 300)
                    // return {
                    //     url: response?.data?.url,
                    //     order: 1,
                    //     title: acceptedFile['name'],
                    // }
                    return response?.data?.url
            }),
        )
        data.assets = assets
        const res = await addProductApi(data)
        if (res.status >= 200 && res.status < 300) next(res)
        else Errors(res as any)
    }

    const back = () => {
        const paths = pathname.split('/')
        navigate(join(paths[1], paths[2]))
    }

    useEffect(() => {
        if (CheckDataIfChange(data, defaultProduct))
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
        setData((prev) => ({ ...prev, assets: acceptedFiles as any }))
    }, [acceptedFiles])

    const getProductsCategories = async () => {
        const productsCategories = await getProductsCategoriesApi()
        const selectOptions: OptionsGroup = productsCategories.data.map(
            (pC) => ({
                label: i18n.language === Languages.AR ? pC.name_ar : pC.name_en,
                value: pC.id,
            }),
        )
        setProductsCategories(selectOptions)
    }

    useEffect(() => {
        getProductsCategories()
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
                        fullWidth
                        value={data.name_ar}
                        errors={GetInputErrors<CreateProductDto>(
                            errors,
                            'name_ar',
                        )}
                    />
                    <Input
                        id="name_en"
                        onChange={onChangeInput}
                        label={Translations.KEY.NAME_EN}
                        className="w-full px-3 md:w-1/2"
                        fullWidth
                        value={data.name_en}
                        errors={GetInputErrors<CreateProductDto>(
                            errors,
                            'name_en',
                        )}
                    />
                    <Input
                        id="model"
                        onChange={onChangeInput}
                        label={Translations.KEY.MODEL}
                        className="w-full px-3 md:w-1/2"
                        fullWidth
                        value={data.model}
                        errors={GetInputErrors<CreateProductDto>(
                            errors,
                            'model',
                        )}
                    />
                    <Input
                        id="price"
                        onChange={onChangeInput}
                        label={Translations.KEY.PRICE}
                        className="w-full px-3 md:w-1/2"
                        type="number"
                        fullWidth
                        value={data.price}
                        errors={GetInputErrors<CreateProductDto>(
                            errors,
                            'price',
                        )}
                    />
                    <Textarea
                        id="details_ar"
                        onChange={onChangeInput}
                        label={Translations.KEY.DETAILS}
                        className="w-full px-3 md:w-1/2"
                        fullWidth
                        value={data.details_ar}
                        errors={GetInputErrors<CreateProductDto>(
                            errors,
                            'details_ar',
                        )}
                    />
                    <Textarea
                        id="details_en"
                        onChange={onChangeInput}
                        label={Translations.KEY.DETAILS}
                        className="w-full px-3 md:w-1/2"
                        fullWidth
                        value={data.details_en}
                        errors={GetInputErrors<CreateProductDto>(
                            errors,
                            'details_en',
                        )}
                    />
                    <SelectDropdown
                        id="productCategoryId"
                        onChange={onChangeSelect}
                        options={productsCategories}
                        label={Translations.KEY.CATEGORY}
                        className="w-full px-3 md:w-1/2"
                        value={{
                            value: data.productCategoryId,
                            label: productsCategories.find(
                                (pC) => pC['value'] === data.productCategoryId,
                            )?.label,
                        }}
                        errors={GetInputErrors<CreateProductDto>(
                            errors,
                            'productCategoryId',
                        )}
                    />
                    <MultiSelectDropdown
                        id="colors"
                        onChange={onChangeMultiSelectColors}
                        options={defaultColors}
                        label={Translations.KEY.COLORS}
                        className="w-full px-3 md:w-1/2"
                        value={data?.colors?.map((color) => ({
                            label: color,
                            value: color,
                        }))}
                        errors={GetInputErrors<CreateProductDto>(
                            errors,
                            'colors',
                        )}
                    />
                    <MultiSelectDropdown
                        id="sizes"
                        onChange={onChangeMultiSelectSizes}
                        options={defaultSizes}
                        label={Translations.KEY.SIZES}
                        className="w-full px-3 md:w-1/2"
                        value={data?.sizes?.map((size) => ({
                            label: size,
                            value: size,
                        }))}
                        errors={GetInputErrors<CreateProductDto>(
                            errors,
                            'sizes',
                        )}
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
                    <div className="container">
                        <div {...getRootProps({ style })}>
                            <input {...getInputProps()} />
                            <p>
                                Drag 'n' drop some files here, or click to
                                select files
                            </p>
                        </div>
                    </div>

                    {/* <Input
                        id="asset.title"
                        onChange={onChangeInput}
                        label={Translations.KEY.ASSET_TITLE}
                        className="w-full px-3 md:w-1/2"
                        fullWidth
                        value={data.asset.title}
                        errors={GetInputErrors<
                            CreateProductDto,
                            CreateAssetDto
                        >(errors, 'asset', 'title')}
                    />
                    <ImagePicker
                        style="w-full px-3 md:w-1/2"
                        image={`${apiRoot}/${imageUrl}`}
                        label={Translations.KEY.CATEGORY_ASSET}
                        onChangeInfo={onChangeInput}
                        id="asset.url"
                        onClick={deleteImage}
                        errors={GetInputErrors<
                            CreateProductDto,
                            CreateAssetDto
                        >(errors, 'asset', 'url')} 
                    />*/}
                </div>
            </div>
        </>
    )
}
