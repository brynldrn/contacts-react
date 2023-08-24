import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Contact } from '../../types/Contact'
import { faker } from '@faker-js/faker'

// Define a type for the slice state
type ContactState = {
  contacts: Contact[],
  activeContact: Contact | null,
  operationMode: 'edit' | 'delete' | null
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
  activeContact: null,
  operationMode: null
}

export const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Omit<Contact, 'id'| 'avatarUrl'>>) => {
      state.contacts = [
        ...state.contacts,
        {
          id: state.contacts.length,
          avatarUrl: faker.image.avatar(),
          ...action.payload
        }
      ]
    },
    setActiveContact: (state, action: PayloadAction<Contact>) => {
      state.activeContact = action.payload
    },
    setOperationMode: (state, action: PayloadAction<'edit' | 'delete' | null>) => {
      state.operationMode = action.payload
    }
  },
})

export const { addContact, setActiveContact, setOperationMode } = contactSlice.actions

export default contactSlice.reducer
