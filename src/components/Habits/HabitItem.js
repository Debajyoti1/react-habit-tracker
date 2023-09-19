import { useDispatch } from 'react-redux'
import styles from './Habit.module.css'
import { deleteHabit } from '../../redux/reducers/habitReducer'
const HabitItem = ({ habit }) => {
    const dispatch=useDispatch()
    const handleDelete=()=>{
        dispatch(deleteHabit(habit.id))
    }
    return (<>
        <div className={styles.habitItem}>
            <p>{habit.title}</p>
            <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
        </div>
    </>)
}
export default HabitItem