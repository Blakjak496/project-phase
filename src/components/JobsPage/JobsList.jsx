import { useState } from 'react';

import JobCard from './JobCard';
import AddJob from './AddJob';
import AddTask from '../JobPage/AddTask';

const JobsList = ({ jobs, activePage, jobId }) => {
    const [formOpen, setFormOpen] = useState(false);

    const openForm = () => {
        setFormOpen(!formOpen)
    }

    let cardType;
    switch(activePage) {
        case 'jobs':
            cardType = 'job';
            break;
        case 'job':
            cardType= 'task';
            break;
        case 'dashboard':
            cardType = 'tracked';
            break;
        default:
            break;
    }

    const JobOrTask = () => {
        if (activePage === 'jobs') return true;
        else if (activePage === 'job') return false;
    }

    return (
        <div className="jobs-page--jobs-list">
            <div className="jobs-page--jobs-list-header">
                <button className="add-job--btn" onClick={openForm}>Add</button>
            </div>
            <div className="jobs-page--jobs-list-main">
                {formOpen ? 
                    JobOrTask() ? 
                        <AddJob openForm={openForm} newJob={jobs.length+1} />  
                        : <AddTask openForm={openForm} newJob={jobs.length+1} jobId={jobId} /> 
                    : <ul>
                    {jobs.map((job) => {
                        return (
                            <JobCard job={job} key={job.id} cardType={cardType} />
                            )
                    
                })}    
                </ul>}
            </div>
        </div>
        )
}

export default JobsList;