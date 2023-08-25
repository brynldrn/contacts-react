import { Dispatch, SetStateAction } from "react"

export type ConfirmationModalType = {
  callbackFn: () => void,
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>
}