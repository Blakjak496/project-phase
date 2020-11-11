import { useContext, useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { formatDate, setGreeting } from "../../utils/utils";
import Greeting from '../greeting';
import JobsList from "../JobsPage/JobsList";
import NavBtns from '../Nav/NavBtns';
import UserContext from "../UserContext";

const Dashboard = ({click}) => {
    const [jobs, setJobs] = useState([]);
    const { accountsRef } = useContext(UserContext);

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

    console.log(jobs)

    return (
        <div className="dashboard--wrapper">
            <div className="page-header">
                <Greeting />
                <NavBtns activePage={'dash'} click={click} />
            </div>
            <div className="page-body">
                <JobsList jobs={jobs} activePage={'dashboard'} />
                <div className="dashboard--newsfeed">
                    newsfeed
                </div>
            </div>
        </div>
    )
}

export default Dashboard;