import { Link } from '@reach/router';
import { useContext, useState } from 'react';
import UserContext from '../UserContext';

const JobCard = ({job, cardType}) => {
    const [optionsOpen, setOptionsOpen] = useState(false);
    const { accountsRef } = useContext(UserContext)

    if (cardType === 'job') {
        return (
            <div className="job-card--wrapper">
                <Link className="job-card--link" to={`/jobs/${job.id}`} >
                    <p className="job-card--title">{job.title} </p>
                    <p className="job-card--client">{job.clientName} </p>
                    <p className="job-card--deadline">{job.deadline} </p>
                </Link>
            </div>
        )
    }
    else if (cardType === 'task') {
        const jobRef = accountsRef.collection('jobs').doc(job.jobId);
        const taskRef = jobRef.collection('tasks').doc(job.id);

        const openCardOptions = () => {
            setOptionsOpen(!optionsOpen);
        }
    
        const completeTask = () => {
            taskRef.update({
                complete: !job.complete
            }).then((res) => {
                console.log('task marked as complete')
            }).catch((err) => {
                console.log('completion error')
            })

            openCardOptions();
        }

        return (
            <div className={job.complete ? "job-card--wrapper--complete" : "job-card--wrapper"} >
                <span className="job-card--link">
                    <p className={job.complete ? "job-card--title-complete" : "job-card--title"}>{job.task} </p>
                    <p className={job.complete ? "job-card--deadline-complete" : "job-card--deadline"}>{job.expected} </p>
                    <p className={job.complete ? "job-card--deadline-complete" : "job-card--deadline"}>{job.deadline} </p>
                    {optionsOpen ? 
                    <div className="job-card--btns">
                        <button className="job-card--task-control" onClick={completeTask} >{job.complete ? 'Mark Task as Incomplete' : 'Mark Task As Complete'}</button>
                        <button className="job-card--task-control" onClick={openCardOptions}>Cancel</button>
                    </div>
                    : <button className="job-card--task-control" onClick={openCardOptions}>Update</button>}
                </span>
            </div>
        )
    }
    else if (cardType === 'tracked') {
        
        return (
            <div className="job-card--wrapper">
                <Link className="job-card--link" to={`/jobs/${job.id}`}>
                    <p className="job-card--title">{job.title} </p>
                    <p className="job-card--task">{job.task} </p>
                    <p className="job-card--deadline">{job.deadline} </p>
                </Link>
            </div>
        )
    }
}

export default JobCard;