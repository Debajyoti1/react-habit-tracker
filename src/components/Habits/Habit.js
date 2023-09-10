import { useDispatch, useSelector } from 'react-redux'
import styles from './Habit.module.css'
import { fetchAllhabits, habitsSelector } from '../../redux/reducers/habitReducer'
import { useEffect } from 'react'
import HabitItem from './HabitItem'
const Habit = () => {
    const { habits } = useSelector(habitsSelector)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAllhabits(habits))
    }, [])
    // console.log(habits);
    return (<>
        <h1 className="text-center">Habits</h1>
        <div className={styles.habitsContainer}>
            <div className={styles.habitItem}>
                <p>Habit demo</p>
                <button className='btn btn-danger'>Delete</button>
            </div>
            <div className={styles.habitItem}>
                <p>Habit demo</p>
                <button className='btn btn-danger'>Delete</button>
            </div>
            {habits.map((h) =>
            (
                <HabitItem key={h.id} habit={h} />)
            )}
        </div>
    </>)
}

export default Habit