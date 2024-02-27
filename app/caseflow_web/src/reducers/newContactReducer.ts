import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  selectedContact: {
    id: 0,
    firstname: "",
    lastname: "",
    phonenumber: 0,
    email: "",
    dateofbirth: "",
    address: "",
    createdat: "",
  },
  contactList: [
    {
      id: 0,
      firstname: "",
      lastname: "",
      phonenumber: 0,
      email: "",
      dateofbirth: "",
      address: "",
      createdat: "",
    },
  ],
  totalContactCount: 0,
  pageSelected: 1,
  searchContactResult: {},
};

const contactSlice = createSlice({
  name: "Contacts",
  initialState,
  reducers: {
    setContactList: (state, action) => {
      state.contactList = action.payload;
    },

    setSelectedContact: (state, action) => {
      state.selectedContact = action.payload;
    },
    resetSelectedContact: (state) => {
      state.selectedContact = initialState.selectedContact;
    },
    setTotalContactCount: (state, action) => {
      state.totalContactCount = action.payload;
    },
    setPageSelected: (state, action) => {
      state.pageSelected = action.payload;
    },
    setsearchContactResult: (state, action) => {
      state.searchContactResult = action.payload;
    },
  },
});

export const {
  setContactList,
  setSelectedContact,
  resetSelectedContact,
  setTotalContactCount,
  setsearchContactResult,
  setPageSelected,
} = contactSlice.actions;
export default contactSlice.reducer;
