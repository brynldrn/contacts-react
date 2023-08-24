import { Contact } from '../../types/Contact';

export default function ContactCard(props: Contact) {
  const { avatarUrl, firstName, middleName, lastName, mobileNumber, email } = props;

  return (
    <div className='rounded-md bg-white shadow-md px-4 py-2 flex gap-3 items-center'>
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
    </div>
  )
}
