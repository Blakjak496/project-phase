import { useContext, useEffect, useState } from "react"
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { useDocument, useDocumentData } from 'react-firebase-hooks/firestore';

import Greeting from '../greeting';
import NavBtns from '../Nav/NavBtns';
import UserContext from "../UserContext";
import JobsList from '../JobsPage/JobsList';

const JobPage = (props) => {
    const [tasks, setTasks] = useState([]);
    const [jobInfo, setJobInfo] = useState({});
    const { currentUser, accountsRef } = useContext(UserContext);
    const tasksRef = accountsRef.collection('jobs').doc(props.job_id);
    
    const [value, loading, error] = useDocument(tasksRef);

    useEffect(() => {
        if (!loading) {
            const newTasks = value.data().tasks.map(task => {
                return task;
            });
            const jobData = value.data();
            setTasks(newTasks);
            setJobInfo(jobData);
        }
    }, [value, loading])
   
    


    return (
        <div className="job-page--wrapper">
            <div className="page-header">
                <Greeting />
                <NavBtns activePage={'job'} click={props.click} />
            </div>
            <div className="page-body">
                <div className="job-page--info">
                    <h3 className="job-page--info-title">Job Title: {jobInfo.title} </h3>
                    <h3 className="job-page--info-client">Client: {jobInfo.clientName} </h3>
                    <h3 className="job-page--info-deadline">Deadline: {jobInfo.deadline} </h3>
                    <p className="job-page--info-overview">Overview: <br/> {jobInfo.overview} </p>
                </div>
                <JobsList jobs={tasks} jobId={props.job_id} activePage="job" />
            </div>
        </div>
    )

}

export default JobPage;