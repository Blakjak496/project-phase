import { useContext, useEffect, useState } from "react"
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import Greeting from '../greeting';
import NavBtns from '../Nav/NavBtns';
import UserContext from "../UserContext";
import JobsList from './JobsList';

const JobsPage = (props) => {
    const [jobs, setJobs] = useState([]);
    const {currentUser} = useContext(UserContext);
    const firestore = firebase.firestore();

    useEffect(() => {
        
        const jobsRef = firestore.collection('accounts').doc(currentUser.uid);
        jobsRef.get()
        .then((res) => {
            const jobsArr = res.data().jobs;
            setJobs(jobsArr);
            
        })
    }, [currentUser, firestore])

    

    return (
        <div className="jobs-page--wrapper">
            <Greeting />
            <NavBtns activePage={'jobs'} click={props.click} />
            <JobsList jobs={jobs} />
        </div>
    )
}

export default JobsPage;