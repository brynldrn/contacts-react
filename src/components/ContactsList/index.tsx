import { useAppSelector } from "../../redux/hooks";
import ContactCard from "../ContactCard";
import ContactModal from "../ContactModal";

export default function ContactsList() {
  const { contacts } = useAppSelector((state) => state.contacts)

  return (
    <div className="my-9 px-6 lg:px-12 xl:px-36 2xl:px-80">
      <ContactModal />
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        {contacts.map((contactDetails) => <ContactCard {...contactDetails} />)}
      </div>
    </div>
  )
}
