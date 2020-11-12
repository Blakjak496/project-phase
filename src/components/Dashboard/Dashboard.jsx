import { useContext, useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { formatDate, setGreeting } from "../../utils/utils";
import Greeting from '../greeting';
import JobsList from "../JobsPage/JobsList";
import NavBtns from '../Nav/NavBtns';
import UserContext from "../UserContext";

const Dashboard = () => {
    const [jobs, setJobs] = useState([]);
    const { accountsRef, activePage, setActivePage } = useContext(UserContext);

    const jobsRef = accountsRef.collection('jobs');
    const query = jobsRef.where('tracked', '==', true);

    const [trackedJobs, loading, error] = useCollection(query);

    useEffect(() => {
        if (!loading) {
            const newJobs = trackedJobs.docs.map(doc => {
                const job = doc.data();
                const jobWithId = {...job, id: doc.id};
                return jobWithId;
            })
            setJobs(newJobs);
        }
    }, [trackedJobs, loading])

    useEffect(() => {
        setActivePage('dash')
    }, [])


    return (
        <div className="dashboard--wrapper">
            <h3 className="dashboard--tracker-title">Tracked Jobs</h3>
            <JobsList jobs={jobs} activePage={activePage} />
            <div className="dashboard--newsfeed">
                newsfeed
            </div> 
        </div>
    )
}

export default Dashboard;