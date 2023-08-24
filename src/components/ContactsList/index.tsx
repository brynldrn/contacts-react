import { useAppSelector } from "../../redux/hooks";
import ContactCard from "../ContactCard";

export default function ContactsList() {
  const { contacts } = useAppSelector((state) => state.contacts)

  return (
    <div className="flex flex-col gap-4 my-9 px-6 md:grid md:grid-cols-2 lg:px-12 xl:px-36 2xl:px-80">
      {contacts.map((contactDetails) => <ContactCard {...contactDetails} />)}
    </div>
  )
}
