import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Contact } from '../../types/Contact'
import { faker } from '@faker-js/faker'

// Define a type for the slice state
type ContactState = {
  contacts: Contact[],
}

// Define the initial state using that type
const initialState: ContactState = {
  contacts: [...new Array(10)].map((_, index) => (
    {
      id: index,
      avatarUrl: faker.image.avatar(),
      firstName: faker.person.firstName(),
      middleName: faker.person.middleName(),
      lastName: faker.person.lastName(),
      mobileNumber: faker.phone.number('+63 ### ### ####'),
      email: faker.internet.email()
    }
  )),
}

export const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Omit<Contact, 'id'| 'avatarUrl'>>) => {
      state.contacts = [
        ...state.contacts,
        {
          id: state.contacts[state.contacts.length - 1].id++,
          avatarUrl: faker.image.avatar(),
          ...action.payload
        }
      ]
    },
  },
})

export const { addContact } = contactSlice.actions

export default contactSlice.reducer
