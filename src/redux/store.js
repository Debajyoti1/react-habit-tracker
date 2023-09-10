import { configureStore } from "@reduxjs/toolkit";
import {notificationReducer} from './reducers/notoficationReducer'
import { habitsReducer } from "./reducers/habitReducer";
// Create the Redux store with multiple reducers
export const store = configureStore({
  reducer: {
    // Define reducers for different parts of the state
    notificationReducer,
    habitsReducer
  },
});
