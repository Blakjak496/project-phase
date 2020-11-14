import { useContext, useEffect, useState } from "react"
import 'firebase/auth';
import 'firebase/firestore';
import {  useCollection } from 'react-firebase-hooks/firestore';
import { Link } from '@reach/router';

import UserContext from "../UserContext";
import JobsList from '../JobsPage/JobsList';

const JobPage = (props) => {
    const [tasks, setTasks] = useState([]);
    const [jobInfo, setJobInfo] = useState({});
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [jobTracked, setJobTracked] = useState(false);
    const { accountsRef, activePage, setActivePage } = useContext(UserContext);
    const jobRef = accountsRef.collection('jobs').doc(props.job_id);
    const tasksRef = jobRef.collection('tasks');
    const query = tasksRef.orderBy('numDeadline');

    
    
    const [tasksList, loading, error] = useCollection(query);

    useEffect(() => {
        if (!loading) {
            const newTasks = tasksList.docs.map(task => {
                const taskData = task.data();
                const taskWithId = {...taskData, id: task.id}
                return taskWithId;
            });
            setTasks(newTasks);
        }
        jobRef.get().then((res) => {
            setJobInfo(res.data());
            setJobTracked(res.data().tracked);
        })
    }, [tasksList, loading])

    useEffect(() => {
        setActivePage('job');
    }, [])
   
    const trackJob = () => {
        jobRef.update({tracked: !jobInfo.tracked})
        .then((res) => {
            console.log('job tracked!')
        })
        .catch((err) => {
            console.log('tracking error')
        })
        setJobTracked(!jobTracked);
    }

    const openDelete = () => {
        setConfirmDelete(!confirmDelete);
    }

    const deleteJob = () => {
        const eventsRef = accountsRef.collection('events');
        const query = eventsRef.where('jobId', '==', props.job_id);
        const eventIds = [];
        
        query.get().then((res) => {
            res.docs.forEach((doc) => {
                eventIds.push(doc.id);
                eventsRef.doc(doc.id).delete();
            })
            tasksList.forEach(task => {
                tasksRef.doc(task.id).delete();
            })
            jobRef.delete();
        })
        eventIds.forEach(id => {
            const taskEventsQuery = eventsRef.where('jobId', '==', id);
            taskEventsQuery.get().then((res) => {
                res.docs.forEach((doc) => {
                    eventsRef.doc(doc.id).delete();
                })
            })
            
        })
    }

    return (
        <div className="job-page--wrapper">
            <div className="job-page--info">
                <div className="job-page--info--primary">
                    <div className="job-page--info--single">
                        <h3 className="job-page--info-title">Job Title: </h3>
                        <h4 className="job-page--info-text">{jobInfo.title}</h4>
                    </div>
                    <div className="job-page--info--single">
                        <h3 className="job-page--info-title">Deadline: </h3>
                        <h4 className="job-page--info-text">{jobInfo.deadline}</h4>
                    </div>
                </div>
                {jobInfo.clientName ? 
                    <div className="job-page--info--optional">
                        <div className="job-page--info--single">
                            <h3 className="job-page--info-title">Client: </h3>
                            <h4 className="job-page--info-text">{jobInfo.clientName}</h4>
                        </div>
                    </div>
                : null}
                <div className="job-page--info--primary">
                    <div className="job-page--info--single">
                        <h4 className="job-page--info-title">Overview: </h4>
                        <p className="job-page--info-text">{jobInfo.overview}</p>
                    </div>
                </div>
                    {confirmDelete ? 
                    <div className="job-page--delete-confirm">
                        <p className="job-page--delete-confirm--text-bold">Are you sure? </p> 
                        <p className="job-page--delete-confirm--text-normal"> This will permanently delete this job and ALL corresponding tasks and calendar events.</p>
                        <div className="job-page--btns">
                            <button className="job-page--btns--button">
                                <Link className="job-page--btns--button-link" onClick={deleteJob} to="/jobs" >Delete</Link>
                            </button>
                            <button className="job-page--btns--button" onClick={openDelete}>Cancel</button>
                        </div>
                    </div> 
                    :
                    <div className="job-page--btns">
                        <button className="job-page--btns--button" onClick={trackJob}>{jobTracked ? 'Untrack' : 'Track'}</button>
                        <button className="job-page--btns--button" onClick={openDelete}>Delete</button>
                    </div>}

            </div>
            <h3 className="job-page--tasks-header">Tasks</h3>
            <JobsList jobs={tasks} jobId={props.job_id} activePage={activePage} />
            
        </div>
    )

}

export default JobPage;