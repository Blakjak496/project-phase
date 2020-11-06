import { useContext, useState } from "react";
import {formatDeadline} from '../../utils/utils';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import UserContext from '../UserContext';


const AddJob = (props) => {
    const [titleInput, setTitleInput] = useState('');
    const [clientInput, setClientInput] = useState('');
    const [deadlineInput, setDeadlineInput] = useState('');
    const [overviewInput, setOverviewInput] = useState('');
    const {currentUser} = useContext(UserContext);
    const firestore = firebase.firestore();

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
        const docRef = firestore.collection('accounts').doc(currentUser.uid);

        docRef.update({jobs: firebase.firestore.FieldValue.arrayUnion({
            title: titleInput,
            clientName: clientInput,
            deadline: deadlineInput,
            overview: overviewInput,
            id: 2,
            tasks: []
        })}).then(doc => {
            console.log('success!')
            console.log(props.openForm)
        })
        
    }

    return (
        <div className="add-job--wrapper">
            <input id="title" className="add-job--input" type="text" placeholder="Job Title..." onChange={handleChange} />
            <input id="client" className="add-job--input" type="text" placeholder="Client Name..." onChange={handleChange} />
            <input id="deadline" className="add-job--input" type="date" onChange={handleChange} />
            <input id="overview" className="add-job--input" type="text" placeholder="Job Overview" onChange={handleChange}/>
            <button className="add-job--btn" onClick={submitJob}>Submit</button>
        </div>
    )
}

export default AddJob;