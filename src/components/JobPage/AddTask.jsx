import { useState, useContext } from "react";
import UserContext from "../UserContext";
import { formatDeadline, formatEventDate } from '../../utils/utils';
import firebase from 'firebase/app';
import 'firebase/firestore';

const AddTask = (props) => {
    const [taskInput, setTaskInput] = useState('');
    const [expectedInput, setExpectedInput] = useState('');
    const [deadlineInput, setDeadlineInput] = useState('');
    const { accountsRef } = useContext(UserContext);
    const jobRef = accountsRef.collection('jobs').doc(props.jobId);
    const tasksRef = jobRef.collection('tasks');

    const handleChange = (event) => {
        switch(event.target.id) {
            case 'task':
                setTaskInput(event.target.value);
                break;
            case 'expected':
                const formattedExpected = formatDeadline(event.target.value);
                setExpectedInput(formattedExpected);
                break;
            case 'deadline':
                const formattedDeadline = formatDeadline(event.target.value);
                setDeadlineInput(formattedDeadline);
                break;
            default:
                break;
        };
    }

    const submitTask = () => {
        const eventsRef = accountsRef.collection('events');
        
        const eventDate = formatEventDate(deadlineInput); 

        tasksRef.add({
            task: taskInput,
            expected: expectedInput,
            deadline: deadlineInput,
            jobId: props.jobId,
            complete: false,
        }).then(doc => {
            console.log('success!')
        })

        eventsRef.add({
            title: taskInput,
            start: eventDate,
            jobId: props.jobId,
            type: 'task'
        })
        .then((res) => {
            console.log('event created');
        })
        .catch((err) => {
            console.log(err)
        })
        props.openForm();
    }

    return (
        <div className="add-job--wrapper">
            <p>The Task:</p>
            <input id="task" className="add-job--input" type="text" placeholder="Task..." onChange={handleChange} />
            <p>Expected Completion Date:</p>
            <input id="expected" className="add-job--input" type="date" onChange={handleChange} />
            <p>Deadline Date:</p>
            <input id="deadline" className="add-job--input" type="date" onChange={handleChange} />
            <button className="add-job--btn" onClick={submitTask} >Submit</button>
        </div>
    )
}

export default AddTask;