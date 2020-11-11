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
    const query = jobsRef.orderBy('createdAt');
    const [snapshot, loading, error] = useCollection(query);

    useEffect(() => {
        if (!loading) {
            const newJobs = snapshot.docs.map(doc => {
                const job = doc.data();
                const jobWithId = {...job, id: doc.id};
                return jobWithId;
            })
            setJobs(newJobs);

        }
    }, [snapshot, loading])
    
    return (
        <div className="jobs-page--wrapper">
            <div className="page-header">
                <Greeting />
                <NavBtns activePage={'jobs'} click={props.click} />
            </div>
            <div className="page-body">
                <JobsList jobs={jobs} activePage={'jobs'} />
            </div>
        </div>
    )
}

export default JobsPage;