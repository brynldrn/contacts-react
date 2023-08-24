import { Pencil, Trash } from 'lucide-react';
import { Contact } from '../../types/Contact';
import { useCallback } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { setActiveContact, setOperationMode } from '../../redux/slices/contactSlice';

export default function ContactCard(props: Contact) {
  const { avatarUrl, firstName, middleName, lastName, mobileNumber, email } = props;
  const dispatch = useAppDispatch();

  const handleEdit = useCallback(() => {
    dispatch(setOperationMode('edit'))
    dispatch(setActiveContact(props))
  }, [dispatch, props])

  return (
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

      <div className='absolute -bottom-[20px] right-[20px] z-10 flex gap-3 md:gap-1 items-center ease-in-out duration-200 transition-all opacity-0 group-hover:opacity-100'>
        <button
          className='w-10 h-10 rounded-full shadow-md text-center flex items-center justify-center bg-emerald-500 text-white'
          onClick={handleEdit}
        >
          <Pencil />
        </button>
        <button className='w-10 h-10 rounded-full shadow-md text-center flex items-center justify-center bg-red-500 text-white'><Trash /></button>
      </div>
    </div>
  )
}
