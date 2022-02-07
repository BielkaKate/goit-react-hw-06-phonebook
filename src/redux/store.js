import { configureStore, createSlice, combineReducers } from "@reduxjs/toolkit";

const startContacts = JSON.parse(localStorage.getItem("contacts")) ?? [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

export const itemsSlice = createSlice({
  name: "items",
  initialState: startContacts,
  reducers: {
    addContact: (state, { payload }) => {
      localStorage.setItem("contacts", JSON.stringify([...state, payload]));
      state.push(payload);
    },
    deleteContact: (state, { payload }) => {
      const newState = state.filter((el) => el.id !== payload);
      localStorage.setItem("contacts", JSON.stringify(newState));
      return newState;
    },
  },
});

export const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    changeFilter: (state, { payload }) => payload,
  },
});

const contactsReducer = combineReducers({
  items: itemsSlice.reducer,
  filter: filterSlice.reducer,
});

export default contactsReducer;

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});

export const { addContact, deleteContact } = itemsSlice.actions;

export const { changeFilter } = filterSlice.actions;
