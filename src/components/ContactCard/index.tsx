import { Pencil, Trash } from 'lucide-react';
import { Contact } from '../../types/Contact';
import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { deleteContact, setActiveContact, setOperationMode } from '../../redux/slices/contactSlice';
import ConfirmationModal from '../ConfirmationModal';

export default function ContactCard(props: Contact) {
  const { avatarUrl, firstName, middleName, lastName, mobileNumber, email } = props;
  const dispatch = useAppDispatch();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const { activeContact } = useAppSelector((state) => state.contacts)

  const handleEdit = useCallback(() => {
    dispatch(setOperationMode('edit'))
    dispatch(setActiveContact(props))
  }, [dispatch, props])

  const handleDeleteContact = useCallback(() => {
    dispatch(setActiveContact(props))
    dispatch(setOperationMode('delete'))
    setDeleteModalOpen(true)
  }, [dispatch, props])

  const onDelete = useCallback(() => {
    if (!activeContact) { return }

    dispatch(deleteContact(activeContact.id))
    dispatch(setActiveContact(null))
    dispatch(setOperationMode(null))
    setDeleteModalOpen(false)
  }, [activeContact, dispatch])

  return (
    <>
      <div className='rounded-md bg-white shadow-md px-4 py-2 flex gap-3 items-center relative group'>
        {/* profile image */}
        <div className='rounded-full overflow-hidden w-20 h-20'>
          <img src={avatarUrl} alt="Profile Avatar" className='w-full h-full object-cover' />
        </div>

        {/* profile details */}
        <div className='flex flex-col items-start'>
          <span className='font-bold'>{`${firstName} ${middleName} ${lastName}`}</span>
          <span>{mobileNumber}</span>
          <a href={`mailto:${email}`} target='_blank' rel="noreferrer" className='hover:underline'>{email}</a>
        </div>

        <div className='absolute -bottom-[20px] right-[20px] z-10 flex gap-3 md:gap-1 items-center ease-in-out duration-200 transition-all opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto'>
          <button
            className='w-10 h-10 rounded-full shadow-md text-center flex items-center justify-center bg-emerald-500 text-white'
            onClick={handleEdit}
          >
            <Pencil />
          </button>
          <button
            className='w-10 h-10 rounded-full shadow-md text-center flex items-center justify-center bg-red-500 text-white'
            onClick={handleDeleteContact}
          >
            <Trash />
          </button>
        </div>
      </div>
      <ConfirmationModal
        callbackFn={onDelete}
        isOpen={deleteModalOpen}
        setIsOpen={setDeleteModalOpen}
       />
    </>
  )
}
