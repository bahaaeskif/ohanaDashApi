import {
    CSSProperties,
    ChangeEvent,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { BiTrash } from 'react-icons/bi'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'

import { defaultColors, defaultSizes } from '@store/constant'
import { UpdateProductDto } from '@store/dto'
import {
    BaseResponse,
    IErrors,
    IErrorsResponse,
    IProduct,
    Languages,
    PageRoute,
    Translations,
    UserRole,
} from '@store/types'
import {
    getProductsCategoriesApi,
    updateProductApi,
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

export const EditProduct = () => {
    const navigate = useNavigate()
    const { t, i18n } = useTranslation()
    const { pathname, state } = useLocation()

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

    const apiRoot = useRecoilValue(apiRootAtom)
    const [{ path }, setNavbarButtonPath] = useRecoilState(navbarButtonPathAtom)

    const product = state?.product as IProduct
    console.log(
        '🚀 ~ file: edit-product.tsx:110 ~ EditProduct ~ product:',
        product,
    )
    // const [imageUrl, setImageUrl] = useState(product.asset.sizesUrls[720])
    const [data, setData] = useState<UpdateProductDto>({
        name_ar: product.name_ar,
        name_en: product.name_en,
        price: product.price,
        details_ar: product.details_ar,
        details_en: product.details_en,
        productCategoryId: product.productCategoryId,
        model: product.model,
        colors: product?.colors,
        sizes: product?.sizes,
        deletedAssets: [],
        assets: [],
        // asset: {
        //     title: product.asset.title,
        //     order: 1,
        //     url: '',
        // },
    })
    console.log('🚀 ~ file: edit-product.tsx:129 ~ EditProduct ~ data:', data)
    const [errors, setErrors] = useState<IErrors[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [productsCategories, setProductsCategories] = useState<OptionsGroup>(
        [],
    )

    // * Good Function
    // const onChangeInput2 = (
    //     event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    // ) => {
    //     const { id, value, type } = event.target
    //     const updateNestedObject = (obj, path, value) => {
    //         const [currentKey, ...rest] = path

    //         if (rest.length === 0) {
    //             return {
    //                 ...obj,
    //                 [currentKey]: type === 'number' ? +value : value,
    //             }
    //         }

    //         return {
    //             ...obj,
    //             [currentKey]: updateNestedObject(obj[currentKey], rest, value),
    //         }
    //     }

    //     const propertyPath = id.split('.')
    //     const updatedFormData = updateNestedObject(data, propertyPath, value)

    //     setData(updatedFormData)
    // }

    const onChangeInput = async (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { id, value, type } = e.target
        if (id.startsWith('asset')) {
            const key = id.split('.')[1]
            if (key === 'title') {
                // setData((prev) => ({
                //     ...prev,
                //     asset: {
                //         ...prev.asset,
                //         title: value,
                //     },
                // }))
            } else if (key === 'url') {
                // const file = e.target['files'][0]
                // const newFormData = new FormData()
                // newFormData.append('file', file)
                // const res = await uploadFileApi(newFormData)
                // if (res.status >= 200 && res.status < 300) {
                //     setData((prev) => ({
                //         ...prev,
                //         asset: {
                //             ...prev.asset,
                //             url: res.data.url,
                //         },
                //     }))
                //     setImageUrl(res.data.url)
                //     e.target.value = ''
                // }
            }
        } else
            setData((prev) => ({
                ...prev,
                [id]: type === 'number' ? +value : value,
            }))
    }

    const onChangeSelect = (e: SelectValue<UserRole>) => {
        setData((prev) => ({
            ...prev,
            productCategoryId: e.value,
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

    const deleteImage = (e) => {
        // let target = e.target
        // let id = target.id
        // setData((prev) => {
        //     delete prev.asset
        //     return prev
        // })
        // setImageUrl(product.asset.sizesUrls[720])
    }

    const next = (res: BaseResponse<IProduct>) => {
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
        const res = await updateProductApi(product.id, data)
        if (res.status >= 200 && res.status < 300) next(res)
        else Errors(res as any)
    }

    const back = () => {
        const paths = pathname.split('/')
        navigate(join(paths[1], paths[2]))
    }

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
        setData((prev) => ({ ...prev, assets: acceptedFiles as any }))
    }, [acceptedFiles])

    useEffect(() => {
        setNavbarButtonPath((prev) => {
            if (CheckDataIfChange(data, product))
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
        getProductsCategories()
        const paths = pathname.split('/')
        setNavbarButtonPath({
            path: join(paths[1], paths[2]),
            title: NavbarButtonSetting.BACK,
            buttonFunction: back,
            isLoading: loading,
        })
    }, [])

    if (!product) navigate(join(PageRoute.NOT_FOUND))

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
                        errors={GetInputErrors<UpdateProductDto>(
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
                        errors={GetInputErrors<UpdateProductDto>(
                            errors,
                            'name_en',
                        )}
                        fullWidth
                    />
                    <Input
                        id="model"
                        onChange={onChangeInput}
                        label={Translations.KEY.MODEL}
                        className="w-full px-3 md:w-1/2"
                        value={data.model}
                        errors={GetInputErrors<UpdateProductDto>(
                            errors,
                            'model',
                        )}
                        fullWidth
                    />
                    <Input
                        id="price"
                        onChange={onChangeInput}
                        label={Translations.KEY.PRICE}
                        className="w-full px-3 md:w-1/2"
                        type="number"
                        value={+data.price}
                        errors={GetInputErrors<UpdateProductDto>(
                            errors,
                            'price',
                        )}
                        fullWidth
                    />
                    <Textarea
                        id="details_ar"
                        onChange={onChangeInput}
                        label={Translations.KEY.DETAILS_AR}
                        className="w-full px-3 md:w-1/2"
                        value={data.details_ar}
                        errors={GetInputErrors<UpdateProductDto>(
                            errors,
                            'details_ar',
                        )}
                        fullWidth
                    />
                    <Textarea
                        id="details_en"
                        onChange={onChangeInput}
                        label={Translations.KEY.DETAILS_EN}
                        className="w-full px-3 md:w-1/2"
                        value={data.details_en}
                        errors={GetInputErrors<UpdateProductDto>(
                            errors,
                            'details_en',
                        )}
                        fullWidth
                    />
                    <SelectDropdown
                        id="productCategoryId"
                        onChange={onChangeSelect}
                        options={productsCategories}
                        label={Translations.KEY.CATEGORY}
                        value={
                            productsCategories.find(
                                (pC) => pC['value'] === data.productCategoryId,
                            ) as any
                        }
                        errors={GetInputErrors<UpdateProductDto>(
                            errors,
                            'productCategoryId',
                        )}
                        className="w-full px-3 md:w-1/2"
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
                        errors={GetInputErrors<UpdateProductDto>(
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
                        errors={GetInputErrors<UpdateProductDto>(
                            errors,
                            'sizes',
                        )}
                    />
                </div>

                <div className="container">
                    <div {...getRootProps({ style })}>
                        <input {...getInputProps()} />
                        <p>
                            Drag 'n' drop some files here, or click to select
                            files
                        </p>
                    </div>
                </div>

                <Divider margin="my-10" />

                <div className="flex items-start justify-start gap-5">
                    {product?.images?.map((image) => (
                        <div className="relative">
                            <img src={`${apiRoot}/${image}`} className="w-52" />
                            <BiTrash
                                color="red"
                                size={25}
                                className="absolute top-2 right-2"
                                onClick={() => {
                                    setData((prev) => ({
                                        ...prev,
                                        deletedAssets:
                                            prev?.deletedAssets?.concat(image),
                                        assets: prev?.assets?.filter(
                                            (asset) => asset !== image,
                                        ),
                                    }))
                                    product.images = product.images.filter(
                                        (image2) => image2 !== image,
                                    )
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* <div className="flex flex-wrap">
                    <Input
                        id="asset.title"
                        onChange={onChangeInput}
                        label={Translations.KEY.ASSET_TITLE}
                        className="w-full px-3 md:w-1/2"
                        fullWidth
                        value={data.asset.title}
                        errors={GetInputErrors<
                            UpdateProductDto,
                            UpdateAssetDto
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
                            UpdateProductDto,
                            UpdateAssetDto
                        >(errors, 'asset', 'url')}
                    />
                </div> */}
            </div>
        </>
    )
}
