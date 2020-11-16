import { useContext, useEffect, useState } from "react"
import 'firebase/auth';
import 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import UserContext from "../UserContext";
import JobsList from './JobsList';

const JobsPage = () => {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { accountsRef, activePage, setActivePage } = useContext(UserContext);

    const jobsRef = accountsRef.collection('jobs');
    const query = jobsRef.orderBy('createdAt');
    const [snapshot, loading] = useCollection(query);

    useEffect(() => {
        if (!loading) {
            const newJobs = snapshot.docs.map(doc => {
                const job = doc.data();
                const jobWithId = {...job, id: doc.id};
                return jobWithId;
            })
            setJobs(newJobs);
            setIsLoading(false);

        }
    }, [snapshot, loading])

    useEffect(() => {
        setActivePage('jobs');
    })
    
    return (
        <div className="jobs-page--wrapper">
            <h2 className="jobs-page--title">Your Current Jobs</h2>
            <JobsList jobs={jobs} activePage={activePage} isLoading={isLoading} />
        </div>
    )
}

export default JobsPage;