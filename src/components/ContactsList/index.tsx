import { Contact } from "../../types/Contact";
import ContactCard from "../ContactCard";
import { faker } from '@faker-js/faker'


export default function ContactsList() {
  return (
    <div className="flex flex-col gap-4 my-9 px-6 md:grid md:grid-cols-2 lg:px-12 xl:grid-cols-3">
      {[...new Array(50)].map((_) => {
        const contactDetails: Contact = {
          avatarUrl: faker.image.avatar(),
          firstName: faker.person.firstName(),
          middleName: faker.person.middleName(),
          lastName: faker.person.lastName(),
          mobileNumber: faker.phone.number('+63 ### ### ####'),
          email: faker.internet.email()
        }

        return <ContactCard {...contactDetails} />
      })}
    </div>
  )
}
