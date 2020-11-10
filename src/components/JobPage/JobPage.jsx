import { useContext, useEffect, useState } from "react"
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { useDocument, useDocumentData } from 'react-firebase-hooks/firestore';
import { Link } from '@reach/router';

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
   
    const trackJob = () => {
        tasksRef.update({tracked: !jobInfo.tracked})
        .then((res) => {
            console.log('job tracked!')
        })
        .catch((err) => {
            console.log('tracking error')
        })
    }

    const deleteJob = () => {
        const eventsRef = accountsRef.collection('events');
        const query = eventsRef.where('jobId', '==', parseInt(props.job_id));
        
        query.get().then((res) => {
            if (res.docs.length) {
                const eventRef = eventsRef.doc(res.docs[0].id)
                eventRef.delete();
            }
        });
        tasksRef.delete();
    }


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
                    <div className="job-page--btns">
                        <button onClick={trackJob}>{jobInfo.tracked ? 'Remove from Dashboard' : 'Add to Dashboard'}</button>
                        <Link onClick={deleteJob} to="/jobs" >Delete Job</Link>
                    </div>
                </div>
                <JobsList jobs={tasks} jobId={props.job_id} activePage="job" />
            </div>
        </div>
    )

}

export default JobPage;