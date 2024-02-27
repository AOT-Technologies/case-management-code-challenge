import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  selectedIndividual: {
    id: 0,
    firstname: "",
    lastname: "",
    phonenumber: 0,
    email: "",
    dateofbirth: "",
    address: "",
    createdat: "",
  },
  individualList: [
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
  totalIndividualCount: 0,
  pageSelected: 1,
  searchIndividualResult: {},
};

const individualSlice = createSlice({
  name: "Individuals",
  initialState,
  reducers: {
    setIndividualList: (state, action) => {
      state.individualList = action.payload;
    },

    setSelectedIndividual: (state, action) => {
      state.selectedIndividual = action.payload;
    },
    resetSelectedIndividual: (state) => {
      state.selectedIndividual = initialState.selectedIndividual;
    },
    setTotalIndividualCount: (state, action) => {
      state.totalIndividualCount = action.payload;
    },
    setPageSelected: (state, action) => {
      state.pageSelected = action.payload;
    },
    setsearchIndividualResult: (state, action) => {
      state.searchIndividualResult = action.payload;
    },
  },
});

export const {
  setIndividualList,
  setSelectedIndividual,
  resetSelectedIndividual,
  setTotalIndividualCount,
  setsearchIndividualResult,
  setPageSelected,
} = individualSlice.actions;
export default individualSlice.reducer;
