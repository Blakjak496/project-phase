import { useState, useContext } from "react";
import UserContext from "../UserContext";
import { formatDeadline, formatEventDate } from '../../utils/utils';
import 'firebase/firestore';

const AddTask = (props) => {
    const [taskInput, setTaskInput] = useState('');
    const [expectedInput, setExpectedInput] = useState('');
    const [deadlineInput, setDeadlineInput] = useState('');
    const [numDeadline, setNumDeadline] = useState(0);
    const { accountsRef } = useContext(UserContext);
    const jobRef = accountsRef.collection('jobs').doc(props.jobId);
    const tasksRef = jobRef.collection('tasks');

    const handleChange = (event) => {
        switch(event.target.id) {
            case 'task':
                setTaskInput(event.target.value);
                event.target.classList.remove('add-job--incomplete-field')
                break;
            case 'expected':
                const formattedExpected = formatDeadline(event.target.value);
                setExpectedInput(formattedExpected);
                break;
            case 'deadline':
                const formattedDeadline = formatDeadline(event.target.value);
                const date = new Date(event.target.value);
                const deadlineNumber = date.valueOf();
                setNumDeadline(deadlineNumber);
                setDeadlineInput(formattedDeadline);
                event.target.classList.remove('add-job--incomplete-field')
                break;
            default:
                break;
        };
    }

    const submitTask = (event) => {

        if (taskInput) {
            const eventsRef = accountsRef.collection('events');
            
            const eventDate = formatEventDate(deadlineInput); 
    
            const newTask = {
                task: taskInput,
                numDeadline,
                jobId: props.jobId,
                complete: false,
            };
    
            if (expectedInput) newTask.expected = expectedInput;
            if (deadlineInput) newTask.deadline = deadlineInput;
    
            tasksRef.add(newTask)
            .then(doc => {
                console.log('success!')
            })
            
            if (newTask.deadline) {
                eventsRef.add({
                    title: taskInput,
                    start: eventDate,
                    jobId: props.jobId,
                    type: 'task',
                    complete: false
                })
                .then((res) => {
                    console.log('event created');
                })
                .catch((err) => {
                    console.log(err)
                })

            }
            props.openForm();
        } else {
            const elements = event.target.parentElement.children;
            const arr = [...elements];
            arr.forEach(item => {
                if (item.id === 'task' && !item.value) {
                    item.classList.add('add-job--incomplete-field');
                    console.log(item.classList)
                };
            })
        }
    }

    return (
        <div className="add-job--wrapper">
            <p>The Task:</p>
            <input id="task" className="add-job--input" type="text" placeholder="Task..." onChange={handleChange} />
            <p>Expected Completion Date (optional):</p>
            <input id="expected" className="add-job--input" type="date" onChange={handleChange} />
            <p>Deadline Date (optional):</p>
            <input id="deadline" className="add-job--input" type="date" onChange={handleChange} />
            <button className="add-job--btn" onClick={submitTask} >Submit</button>
            <button className="add-job--btn" onClick={props.openForm} >Close</button>
        </div>
    )
}

export default AddTask;