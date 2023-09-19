import { useDispatch, useSelector } from 'react-redux'
import styles from './Habit.module.css'
import { fetchAllhabits, habitsSelector } from '../../redux/reducers/habitReducer'
import { useEffect } from 'react'
import HabitItem from './HabitItem'
const Habit = () => {
    const { habits } = useSelector(habitsSelector)
    const dispatch = useDispatch()
    useEffect(() => {
        console.log(habits);
        dispatch(fetchAllhabits(habits))
    }, [])
    // console.log(habits);
    return (<>
        <h1 className="text-center">Habits</h1>
        <div className={styles.habitsContainer}>
            {habits.length===0 && <h3>No Habit Found</h3>}
            {habits.map((h) =>
            (
                <HabitItem key={h.id} habit={h} />)
            )}
        </div>
    </>)
}

export default Habit