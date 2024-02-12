import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  selectedContact: {
    id: 0,
    name: "",
    description: "",
    status: "",
    isEdit: false,
    lobDetails: {},
    documents: [],
    totalDocCount: 0,
    tasks: [],
    additionalFields: {},
    notes : [],
  },
  contactList: [
    {
      id: 0,
      name: "",
      description: "",
      status: "",
    },
  ],
  totalContactCount: 0,
  pageSelected: 1,
  searchContactResult: {},
  selectedContactFormType: "",
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
    setSelectedContactLOBDetails: (state, action) => {
      state.selectedContact.lobDetails = action.payload;
    },
    setSelectedContactDocuments: (state, action) => {
      state.selectedContact.documents = action.payload;
    },
    setTotalContactCount: (state, action) => {
      state.totalContactCount = action.payload;
    },
    setPageSelected: (state, action) => {
      state.pageSelected = action.payload;
    },
    setTotalDocCount: (state, action) => {
      state.selectedContact.totalDocCount = action.payload;
    },
    setContactTasks: (state, action) => {
      state.selectedContact.tasks = action.payload;
    },
    setAdditionalContactDetails: (state, action) => {
      state.selectedContact.additionalFields = action.payload;
    },
    setsearchContactResult: (state, action) => {
      state.searchContactResult = action.payload;
    },
    setSelectedContactType: (state, action) => {
      state.selectedContactFormType = action.payload;
    },
    setSelectedContactNote: (state, action) => {
      state.selectedContact.notes = action.payload;
    },
  },
});

export const {
  setContactList,
  setSelectedContact,
  resetSelectedContact,
  setSelectedContactDocuments,
  setSelectedContactLOBDetails,
  setTotalContactCount,
  setPageSelected,
  setTotalDocCount,
  setContactTasks,
  setAdditionalContactDetails,
  setsearchContactResult,
  setSelectedContactType,
  setSelectedContactNote,
} = contactSlice.actions;
export default contactSlice.reducer;
