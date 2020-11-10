import { useContext, useState } from "react";
import {formatDeadline, formatEventDate} from '../../utils/utils';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import UserContext from '../UserContext';


const AddJob = (props) => {
    const [titleInput, setTitleInput] = useState('');
    const [clientInput, setClientInput] = useState('');
    const [deadlineInput, setDeadlineInput] = useState('');
    const [overviewInput, setOverviewInput] = useState('');
    const [newEventId, setNewEventId] = useState(1);
    const {currentUser, accountsRef} = useContext(UserContext);

    const handleChange = (event) => {
        switch(event.target.id) {
            case 'title':
                setTitleInput(event.target.value);
                break;
            case 'client':
                setClientInput(event.target.value);
                break;
            case 'deadline':
                const formattedDeadline = formatDeadline(event.target.value);
                setDeadlineInput(formattedDeadline);
                break;
            case 'overview':
                setOverviewInput(event.target.value);
                break;
            default:
                break;
        };
        
    }

    const submitJob = () => {
        const jobsRef = accountsRef.collection('jobs').doc(`${props.newJob}`);
        const eventsRef = accountsRef.collection('events');
        
        eventsRef.get().then((res) => {setNewEventId(res.docs.length+1)});
        console.log(newEventId)
        const newEventRef = eventsRef.doc(`${newEventId+1}`);
        const eventDate = formatEventDate(deadlineInput); 

        jobsRef.set({
            title: titleInput,
            clientName: clientInput,
            deadline: deadlineInput,
            overview: overviewInput,
            id: props.newJob,
            tasks: [],
            tracked: false
        }).then(doc => {
            console.log('success!')
        })

        newEventRef.set({
            id: newEventId,
            title: titleInput,
            start: eventDate,
            jobId: props.newJob,
        })
        .then((res) => {
            console.log('event created');
        })
        .catch((err) => {
            console.log(err)
        })

        props.openForm()
        
    }

    return (
        <div className="add-job--wrapper">
            <p>Job Title:</p>
            <input id="title" className="add-job--input" type="text" placeholder="Job Title..." onChange={handleChange} />
            <p>Client Name:</p>
            <input id="client" className="add-job--input" type="text" placeholder="Client Name..." onChange={handleChange} />
            <p>Deadline Date:</p>
            <input id="deadline" className="add-job--input" type="date" onChange={handleChange} />
            <p>Job Overview:</p>
            <input id="overview" className="add-job--input" type="text" placeholder="Job Overview" onChange={handleChange}/>
            <button className="add-job--btn" onClick={submitJob}>Submit</button>
        </div>
    )
}

export default AddJob;