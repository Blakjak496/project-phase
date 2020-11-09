import { useContext, useEffect, useState } from "react"
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import Greeting from '../greeting';
import NavBtns from '../Nav/NavBtns';
import UserContext from "../UserContext";
import JobsList from './JobsList';

const JobsPage = (props) => {
    const [jobs, setJobs] = useState([]);
    const {currentUser, accountsRef} = useContext(UserContext);

    const jobsRef = accountsRef.collection('jobs');
    const [snapshot, loading, error] = useCollection(jobsRef);

    useEffect(() => {
        if (!loading) {
            const newJobs = snapshot.docs.map(doc => {
                return doc.data();
            })
            setJobs(newJobs);

        }
    }, [snapshot, loading])
    
    console.log(jobs)

    return (
        <div className="jobs-page--wrapper">
            <Greeting />
            <NavBtns activePage={'jobs'} click={props.click} />
            <JobsList jobs={jobs} activePage={'jobs'} />
        </div>
    )
}

export default JobsPage;