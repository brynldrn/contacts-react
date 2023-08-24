import { FormEvent, useCallback, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { addContact, setOperationMode } from "../../redux/slices/contactSlice";

export default function ContactModal() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useAppDispatch();
  const operationMode = useAppSelector((state) => state.contacts.operationMode)

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();

    const { firstName, middleName, lastName, mobileNumber, email } = e.target as typeof e.target & {
      firstName: { value: string },
      middleName: { value: string },
      lastName: { value: string },
      mobileNumber: { value: string },
      email: { value: string }
    }

    dispatch(addContact({
      firstName: firstName.value,
      middleName: middleName.value,
      lastName: lastName.value,
      mobileNumber: mobileNumber.value,
      email: email.value,
    }))

    dispatch(setOperationMode(null))
    setIsModalOpen(false)
  }, [dispatch])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    dispatch(setOperationMode(null))
  }, [dispatch])

  useEffect(() => {
    if (operationMode === 'edit') {
      setIsModalOpen(true)
    }
  }, [operationMode])

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className="rounded-md mb-4 px-3 py-1 bg-emerald-500 text-white hover:bg-emerald-600 duration-200 ease-in-out">Add new contact</button>
      {isModalOpen && createPortal((
        <div id="modal" className="fixed flex justify-center items-center top-0 left-0 w-[100dvw] h-[100dvh]">
          {/* overlay */}
          <div className="bg-zinc-600/50 w-full h-full absolute top-0 left-0 -z-10" onClick={handleCloseModal} />

          {/* content */}
          <div className="bg-white rounded-md shadow-lg px-4 py-7 w-5/6 md:w-[420px]">
            <h3 className="font-bold text-2xl">Create new contact</h3>
            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
              <input type="text" name="firstName" id="firstName" placeholder="First Name" className="border w-full rounded-md px-2 py-1 outline-none" required />
              <input type="text" name="middleName" id="middleName" placeholder="Middle Name" className="border w-full rounded-md px-2 py-1 outline-none" />
              <input type="text" name="lastName" id="lastName" placeholder="Last Name" className="border w-full rounded-md px-2 py-1 outline-none" required />
              <input type="tel" name="mobileNumber" id="mobileNumber" placeholder="Mobile Number" className="border w-full rounded-md px-2 py-1 outline-none" required />
              <input type="email" name="email" id="email" placeholder="Email Address" className="border w-full rounded-md px-2 py-1 outline-none" required />

              {/* submit and clear */}
              <div className="flex justify-around mt-4">
                <button type="reset" className="rounded-md px-5 py-3">Clear</button>
                <button type="submit" className="rounded-md bg-emerald-500 text-white px-5 py-3">Submit</button>
              </div>
            </form>
          </div>
        </div>
      ), document.body)}
    </>
  )
}
