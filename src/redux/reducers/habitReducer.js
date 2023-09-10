import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    habits: [],
    isLoading: true,
}

// Async action to fetch all habits
export const fetchAllhabits = createAsyncThunk(
    'habit/fetchAllhabits',
    async (args, thunkAPI) => {
        if (args.length === 0) { // Check if habits are empty
            console.log('empty habits');
            try {
                thunkAPI.dispatch(habitsActions.setAllhabits([]));
                // thunkAPI.dispatch(habitsActions.setNotification({ success: 'habits fetched' }));
            } catch (error) {
                console.log(error);
                thunkAPI.dispatch(habitsActions.setAllhabits([]));
                thunkAPI.dispatch(habitsActions.setNotification({ error: 'Unable to fetch habits' }));
            }
        } else {
            // No need to fetch, habits already exist
            console.log('empty no');

            return args;
        }
    }
);

// Async action to add a new habit
export const addHabit = createAsyncThunk(
    'habit/addHabit',
    async (args, thunkAPI) => {
        try {
            console.log(args);
            const habit = {
            }
            habit.id = Math.floor(Date.now() / 1000)
            habit.title = args
            console.log(habit);
            habit.days = []
            for (let ind = 1; ind < 8; ind++) {
                const epochTimeInSeconds = Math.floor((new Date().getTime() - 24 * 60 * 60 * 1000 * ind) / 1000);

                // Create an object with the epoch time as a key and 'None' as the value
                const dayObject = {};
                dayObject[epochTimeInSeconds] = 'None';

                // Push the dayObject into the habit.days array
                habit.days.push(dayObject);
            }
            console.log(habit);
            thunkAPI.dispatch(habitsActions.add(habit));
            thunkAPI.dispatch(habitsActions.setNotification({ success: 'Album added' }));
        } catch (error) {
            console.log(error);
            thunkAPI.dispatch(habitsActions.setNotification({ error: 'Unable to Add Album' }));
            return;
        }
    }
);



// Async action to delete an habit
export const deleteHabit = createAsyncThunk(
    'habit/deleteHabit',
    async (args, thunkAPI) => {
        try {

            thunkAPI.dispatch(habitsActions.delete(args))
            // console.log(args);
            thunkAPI.dispatch(habitsActions.setNotification({ success: 'Album Deleted' }));
        } catch (error) {
            console.log(error);
            thunkAPI.dispatch(habitsActions.setNotification({ error: 'Unable to Delete Album' }));
        }
    }
);

// Define the habit slice
const habitsSlice = createSlice({
    name: 'habit',
    initialState,
    reducers: {
        setAllhabits: (state, action) => {
            state.habits = action.payload
            state.isLoading = false
        },
        add: (state, action) => {
            state.habits = [action.payload, ...state.habits]
        },
        delete: (state, action) => {
            state.habits = state.habits.filter((habit) =>
                (habit.id !== action.payload.id)
            );
        },
        setNotification: (state, action) => {
            state.message = true; // Set message flag to true to display a notification
        }
    }
});

// Export the album reducer, actions, and selector
export const habitsReducer = habitsSlice.reducer
export const habitsActions = habitsSlice.actions
export const habitsSelector = (state) => state.habitsReducer
