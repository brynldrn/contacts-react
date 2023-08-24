import { faker } from '@faker-js/faker';

export default function ContactsList() {
  return (
    <div className="overflow-x-scroll max-h-[720px]">
      <table className="overflow-scroll mt-9 lg:mt-0">
        <thead className='sticky top-0'>
          <tr className="bg-blue-600 text-white text-left">
            <th className="px-3 min-w-[200px] md:px-9 py-3">First Name</th>
            <th className="px-3 min-w-[200px] md:px-9 py-3">Middle Name</th>
            <th className="px-3 min-w-[200px] md:px-9 py-3">Last Name</th>
            <th className="px-3 min-w-[200px] md:px-9 py-3">Mobile Number</th>
            <th className="px-3 min-w-[200px] md:px-9 py-3">Email Address</th>
          </tr>
        </thead>
        <tbody>
          {[...new Array(90)].map((_) => (
            <tr className='even:bg-blue-100'>
              <td className="px-3 min-w-[200px] md:px-9 py-3">{faker.person.firstName()}</td>
              <td className="px-3 min-w-[200px] md:px-9 py-3">{faker.person.middleName()}</td>
              <td className="px-3 min-w-[200px] md:px-9 py-3">{faker.person.lastName()}</td>
              <td className="px-3 min-w-[250px] md:px-9 py-3">{faker.phone.number('+63 ### ### ####')}</td>
              <td className="px-3 min-w-[300px] md:px-9 py-3">{faker.internet.email()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
