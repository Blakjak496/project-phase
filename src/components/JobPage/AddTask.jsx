import { useState, useContext } from "react";
import UserContext from "../UserContext";
import { formatDeadline } from '../../utils/utils';
import firebase from 'firebase/app';
import 'firebase/firestore';

const AddTask = (props) => {
    const [taskInput, setTaskInput] = useState('');
    const [expectedInput, setExpectedInput] = useState('');
    const [deadlineInput, setDeadlineInput] = useState('');
    const { accountsRef } = useContext(UserContext);
    const tasksRef = accountsRef.collection('jobs').doc(props.jobId);

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
        tasksRef.update({tasks: firebase.firestore.FieldValue.arrayUnion({
            task: taskInput,
                expected: expectedInput,
                deadline: deadlineInput,
                id: props.newJob,
                complete: false,
        })}).then(doc => {
            console.log('success!')
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