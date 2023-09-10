import { useDispatch } from 'react-redux'
import styles from './AddHabit.module.css'
import { useState } from 'react'
import { addHabit } from '../../redux/reducers/habitReducer'
import { useNavigate } from 'react-router-dom'

const AddHabit = () => {
    const dispatch = useDispatch()
    const [habitText, setHabitText] = useState('')
    const navigate=useNavigate()
    const addHabitHandler = () => {
        // console.log(habitText);
        dispatch(addHabit(habitText))
        navigate('/')
    }
    return (<>
        <h1 className='text-center'>Add a Habit</h1>
        <div className={styles.formContainer}>
            <input type='text' placeholder='Enter a Habit' onChange={(e)=>setHabitText(e.target.value)}></input>
            <button className='btn btn-primary' onClick={addHabitHandler}>Add</button>
        </div>
    </>)
}

export default AddHabit