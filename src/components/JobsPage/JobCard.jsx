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
                    <div className="job-card--header">
                        <div className="job-card--header--item">
                            <p className="job-card--header--item-title">Deadline:</p>
                            <p className="job-card--deadline">{job.deadline} </p>
                        </div>
                        {job.clientName ?
                        <div className="job-card--header--item">
                            <p className="job-card--header--item-title">Client:</p>
                            <p className="job-card--client">{job.clientName} </p>

                        </div>
                        : null
                        }
                    </div>
                    <div className="job-card--body">
                        <p className="job-card--body--title">Job:</p>
                        <p className="job-card--title">{job.title} </p>
                    </div>
                </Link>
            </div>
        )
    }
    else if (cardType === 'task') {
        const jobRef = accountsRef.collection('jobs').doc(job.jobId);
        const taskRef = jobRef.collection('tasks').doc(job.id);

        const eventsRef = accountsRef.collection('events');
        const eventRef = eventsRef.where('jobId', '==', job.jobId);

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

            eventRef.get().then((res) => {
                const data = res.docs[0].data();
                eventsRef.doc(res.docs[0].id).update({
                    complete: !data.complete,
                }).then((res) => {
                    console.log('event marked as complete')
                }).catch((err) => {
                    console.log('event update error')
                })
            })

            openCardOptions();
        }

        return (
            <div className={job.complete ? "job-card--wrapper--complete" : "job-card--wrapper"} >
                <span className="job-card--link">
                    <div className="job-card--header">
                        {job.expected ? <div className="job-card--header--item">
                            <p className="job-card--header--item-title">Expected Completion:</p>
                            <p className={job.complete ? "job-card--deadline-complete" : "job-card--deadline"}>{job.expected} </p>
                        </div>
                        : null}
                        <div className="job-card--header--item">
                            <p className="job-card--header--item-title">Deadline:</p>
                            <p className={job.complete ? "job-card--deadline-complete" : "job-card--deadline"}>{job.deadline ? job.deadline : 'n/a'} </p>
                        </div>
                    </div>
                    <div className="job-card--body">

                    </div>
                            <p className={job.complete ? "job-card--title-complete" : "job-card--title"}>{job.task} </p>
                    {optionsOpen ? 
                        <div className="job-card--btns">
                            <button className="job-card--task-control" onClick={completeTask} >{job.complete ? 'Incomplete' : 'Complete'}</button>
                            <button className="job-card--task-control" onClick={openCardOptions}>Cancel</button>
                        </div>
                        :
                        <div className="job-card--btns">
                            <button className="job-card--task-control" onClick={openCardOptions}>Update</button>
                        </div>}
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