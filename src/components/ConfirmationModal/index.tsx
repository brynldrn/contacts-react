import { createPortal } from "react-dom";
import { ConfirmationModalType } from "../../types";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setActiveContact } from "../../redux/slices/contactSlice";

export default function ConfirmationModal({ callbackFn, isOpen, setIsOpen }: ConfirmationModalType) {
  const dispatch = useAppDispatch();
  const { activeContact } = useAppSelector((state) => state.contacts)

  const handleCloseModal = useCallback(() => {
    setIsOpen(false)
    dispatch(setActiveContact(null))
  }, [dispatch, setIsOpen])

  return (
    <>
      {isOpen && createPortal((
        <div id="confirmation-modal" className="fixed flex justify-center items-center top-0 left-0 w-[100dvw] h-[100dvh]">
        {/* overlay */}
        <div className="bg-zinc-600/50 w-full h-full absolute top-0 left-0 -z-10" onClick={handleCloseModal} />

        {/* content */}
        <div className="bg-white rounded-md shadow-lg px-4 py-7 w-5/6 md:w-[420px]">
          <h3 className="font-bold text-2xl mb-5">Delete Confirmation</h3>
          <span>Are you sure you want to delete:</span>
          <div className="font-bold">{`${activeContact?.firstName} ${activeContact?.middleName} ${activeContact?.lastName}`}</div>
          {/* controls */}
          <div className="flex justify-end mt-4">
            <button type="button" onClick={handleCloseModal} className="rounded-md px-5 py-3">Cancel</button>
            <button type="button" onClick={callbackFn} className="rounded-md bg-red-500 text-white px-5 py-3">Delete</button>
          </div>
        </div>
      </div>
      ), document.body)}
    </>
  )
}
