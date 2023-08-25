import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { addContact, editContact, setActiveContact, setOperationMode } from "../../redux/slices/contactSlice";
import { Contact } from "../../types/Contact";

export default function ContactModal() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useAppDispatch();
  const { operationMode, activeContact } = useAppSelector((state) => state.contacts)
  const [contactData, setContactData] = useState<Contact>({
    avatarUrl: '',
    id: 0,
    firstName: '',
    middleName: '',
    lastName: '',
    mobileNumber: '',
    email: ''
  })

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    dispatch(setOperationMode(null))
    dispatch(setActiveContact(null))
    setContactData({
      avatarUrl: '',
      id: 0,
      firstName: '',
      middleName: '',
      lastName: '',
      mobileNumber: '',
      email: ''
    })
  }, [dispatch])

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();

    if (!contactData) { return }

    if (operationMode === 'edit') {
      dispatch(editContact(contactData))
    } else {
      dispatch(addContact(contactData))
    }

    handleCloseModal()
  }, [contactData, dispatch, handleCloseModal, operationMode])

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setContactData((old) => ({
      ...old,
      [name]: value ?? '',
    }))
  }, [])

  useEffect(() => {
    if (operationMode === 'edit') {
      setIsModalOpen(true)
    }
  }, [operationMode])

  useEffect(() => {
    setContactData(activeContact ?? {
      avatarUrl: '',
      id: 0,
      firstName: '',
      middleName: '',
      lastName: '',
      mobileNumber: '',
      email: ''
    })
  }, [activeContact])

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className="rounded-md mb-4 px-3 py-1 bg-emerald-500 text-white hover:bg-emerald-600 duration-200 ease-in-out">Add new contact</button>
      {isModalOpen && createPortal((
        <div id="modal" className="fixed flex justify-center items-center top-0 left-0 w-[100dvw] h-[100dvh]">
          {/* overlay */}
          <div className="bg-zinc-600/50 w-full h-full absolute top-0 left-0 -z-10" onClick={handleCloseModal} />

          {/* content */}
          <div className="bg-white rounded-md shadow-lg px-4 py-7 w-5/6 md:w-[420px]">
            <h3 className="font-bold text-2xl">{operationMode === 'edit' ? 'Edit' : 'Create new'} contact</h3>
            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
              {/* First Name */}
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                className="border w-full rounded-md px-2 py-1 outline-none"
                required
                value={contactData?.firstName}
                onChange={handleInputChange}
              />

              {/* Middle Name */}
              <input
                type="text"
                name="middleName"
                id="middleName"
                placeholder="Middle Name"
                className="border w-full rounded-md px-2 py-1 outline-none"
                value={contactData?.middleName}
                onChange={handleInputChange}
              />

              {/* Last Name */}
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                className="border w-full rounded-md px-2 py-1 outline-none"
                required
                value={contactData?.lastName}
                onChange={handleInputChange}
              />

              {/* Mobile Number */}
              <input
                type="tel"
                name="mobileNumber"
                id="mobileNumber"
                placeholder="Mobile Number"
                className="border w-full rounded-md px-2 py-1 outline-none"
                required
                value={contactData?.mobileNumber}
                onChange={handleInputChange}
              />

              {/* Email */}
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                className="border w-full rounded-md px-2 py-1 outline-none"
                required
                value={contactData?.email}
                onChange={handleInputChange}
              />

              {/* submit and clear */}
              <div className="flex justify-around mt-4">
                <button type="button" onClick={handleCloseModal} className="rounded-md px-5 py-3">Cancel</button>
                <button type="submit" className="rounded-md bg-emerald-500 text-white px-5 py-3">Submit</button>
              </div>
            </form>
          </div>
        </div>
      ), document.body)}
    </>
  )
}
