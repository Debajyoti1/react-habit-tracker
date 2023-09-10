import { useDispatch } from 'react-redux'
import styles from './Habit.module.css'
import { deleteHabit } from '../../redux/reducers/habitReducer'
const HabitItem = ({ habit }) => {
    const dispatch=useDispatch()
    const handleDelete=()=>{
        console.log('clicked delete');
        dispatch(deleteHabit(habit.id))
    }
    // console.log(habit);
    return (<>
        <div className={styles.habitItem}>
            <p>{habit.title}</p>
            <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
        </div>
    </>)
}
export default HabitItem