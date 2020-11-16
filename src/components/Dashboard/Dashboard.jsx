import { useContext, useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import JobsList from "../JobsPage/JobsList";
import UserContext from "../UserContext";
import RSSReader from '../RSS/Newsfeed';

const Dashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { accountsRef, activePage, setActivePage } = useContext(UserContext);

    const jobsRef = accountsRef.collection('jobs');
    const query = jobsRef.where('tracked', '==', true);

    const [trackedJobs, loading] = useCollection(query);

    useEffect(() => {
        if (!loading) {
            const newJobs = trackedJobs.docs.map(doc => {
                const job = doc.data();
                const jobWithId = {...job, id: doc.id};
                return jobWithId;
            })
            setJobs(newJobs);
            setIsLoading(false);
        }
    }, [trackedJobs, loading])

    useEffect(() => {
        setActivePage('dash')
    })


    return (
        <div className="dashboard--wrapper">
                <h3 className="dashboard--tracker-title">Tracked Jobs</h3>
                <JobsList jobs={jobs} activePage={activePage} isLoading={isLoading} />
                <RSSReader />
            </div>
    )
}

export default Dashboard;