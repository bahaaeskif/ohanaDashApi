import { useTranslation } from 'react-i18next'

import { Translations } from '@store/types'

import { VerifiedPng } from '../../../assets'
import { SuccessModalProps } from '../../types'
import { Button } from '../button'

export function SuccessModal({
    isOpen,
    closeFunction,
    message,
}: SuccessModalProps) {
    const { t } = useTranslation()

    return (
        <>
            {isOpen && (
                <div className="fixed top-0 right-0 left-0 bottom-0 z-50 flex items-center justify-center bg-white bg-opacity-50 dark:bg-black dark:bg-opacity-50">
                    <div className="flex h-fit w-3/4 flex-col rounded-md bg-gray-50 p-3 shadow-md md:w-1/2 xl:w-1/3">
                        <div className="grow p-2">
                            <img
                                src={VerifiedPng}
                                className="mx-auto mb-5 w-20 animate-pulse"
                            />
                            <div className="mb-2 text-center">
                                <h1 className="cursor-auto select-none text-2xl">
                                    {message
                                        ? message
                                        : t(
                                              Translations.COMMON
                                                  .SUCCESS_MESSAGE,
                                          )}
                                </h1>
                            </div>
                        </div>
                        <div className="flex">
                            <Button
                                title={Translations.COMMON.CLOSE}
                                className="mx-auto !w-1/2"
                                onClick={() => closeFunction()}
                                color="success"
                                // fullWidth
                            />
                            {/* <div
								className="w-full shadow-xl text-white bg-main-500 hover:bg-main-600 cursor-pointer text-center rounded-xl p-2 m-2"
								onClick={props.toggle}
							>
								<h1 className="text-2xl">إغلاق</h1>
							</div> */}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

// import { FC } from "react";
// import { ModalProps } from "../../../libs";

// export const SuccessModal = ({
// 	modalStatus,
// 	setModalStatus,
// }: // modalId,
// // modalOverlayId,
// ModalProps) => {
// 	return (
// 		<div
// 			className="fixed top-0 right-0 left-0 bottom-0 p-5 bg-white bg-opacity-50 flex items-center justify-center z-50"
// 			onKeyDown={(e) => {
// 				if (e.key === "Enter") setModalStatus(false);
// 			}}
// 		>
// 			<div className="w-1/3 h-max px-2 py-5 shadow-md bg-gray-50 rounded-md flex flex-col">
// 				<div className="grow p-2">
// 					<div className="text-center mb-2">
// 						<h1 className="text-2xl select-none cursor-auto">
// 							{/* {message === "" ? "تمت العملية بنجاح" : message} */}
// 						</h1>
// 					</div>
// 				</div>
// 				<div className="flex">
// 					<div
// 						className="w-full shadow-xl text-white bg-main-500 hover:bg-main-600 cursor-pointer text-center rounded-xl p-2 m-2"
// 						onClick={() => {
// 							// if (close) close();
// 							setModalStatus(false);
// 						}}
// 					>
// 						<h1 className="text-2xl">إغلاق</h1>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
