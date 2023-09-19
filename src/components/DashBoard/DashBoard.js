import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { habitsSelector, updateHabitStatus } from '../../redux/reducers/habitReducer';

const DashBoard = () => {
    function getFormattedDate(date) {
        const options = { weekday: 'short', day: 'numeric', month: 'short' };
        return new Date(date).toLocaleDateString(undefined, options);
    }

    function getPrevious7Days() {
        const today = new Date();
        const days = [];

        for (let i = 0; i < 7; i++) {
            const previousDate = new Date(today);
            previousDate.setDate(today.getDate() - i);
            days.unshift(getFormattedDate(previousDate));
        }

        return days;
    }

    const previous7Days = getPrevious7Days();

    const dispatch = useDispatch(); // Get the dispatch function

    let habitselect = useSelector(habitsSelector);
    let days = previous7Days;
    let habits = habitselect.habits;

    const handleStatusChange = (habitId, day, newStatus) => {
        // Dispatch an action to update the habit status in the Redux store
        console.log({ habitId, day, newStatus });
        dispatch(updateHabitStatus({ habitId, day, newStatus }));
    };

    return (
        <div className="table-responsive">
            <table className="table table-hover table-striped table-bordered">
                <thead className="thead-light">
                    <tr className="p-4">
                        <th>Habit Name</th>
                        {days.map((d) => (
                            <th key={d}>{d}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {habits.map((habit) => (
                        <tr key={habit.id}>
                            <th>{habit.title}</th>
                            
                            {Object.keys(habit.days).map((day, i) => {
                                let color = "secondary";
                                let status = habit.days[day]
                                if (status) {
                                    if (status === 'Done') {
                                        color = "success";
                                    } else if (status === 'Not Done') {
                                        color = "danger";
                                    }
                                }
                                return (
                                    <td key={i}>
                                        <div className={`btn-group dropend p-2 btn-${color}`}>
                                            <button className={`btn dropdown-toggle`} type="button" data-bs-toggle="dropdown" aria-expanded="false" aria-haspopup="true">
                                                {status ? status : 'None'}
                                            </button>
                                            <ul style={{ zIndex: '99!important' }} className="dropdown-menu index" aria-labelledby="dropdownMenuButton">
                                                <li><button className="dropdown-item" onClick={() => handleStatusChange(habit.id, day, 'Done')}>Done</button></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><button className="dropdown-item" onClick={() => handleStatusChange(habit.id, day, 'Not Done')}>Not Done</button></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><button className="dropdown-item" onClick={() => handleStatusChange(habit.id, day, 'None')}>None</button></li>
                                            </ul>
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DashBoard;
