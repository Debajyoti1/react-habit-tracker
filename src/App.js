import './App.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Error404 from './pages/Error404';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { notificationActions, notificationSelector } from './redux/reducers/notificationReducer';
import NavBar from './components/NavBar/NavBar';
import Habit from './components/Habits/Habit';
import AddHabit from './components/AddHabit/AddHabit';


function App() {
  // Access the Redux dispatch function
  const dispatch = useDispatch();

  // Select success and error notifications from the Redux store
  // const { success_notification, error_notification } = useSelector(notificationSelector);


  // Create a BrowserRouter instance for routing
  const browserRouter = createBrowserRouter([
    {
      path: '/',
      element: <NavBar />,
      errorElement: <Error404 />,
      children: [
        {
          index: true,
          element: (
            <Habit />
          ),
        },
        {
          path: "add-habit",
          element: (
            <AddHabit />
          ),
        },
      ]
    }
  ]);
  return (
    <div className="App">
      {/* ToastContainer to display notifications */}
      <ToastContainer style={{ marginTop: '60px' }} />

      {/* RouterProvider to handle routing */}
      <RouterProvider router={browserRouter} />
    </div>
  );
}

export default App;
