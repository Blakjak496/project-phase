import { useContext, useState } from 'react';

import JobCard from './JobCard';
import AddJob from './AddJob';
import AddTask from '../JobPage/AddTask';
import UserContext from '../UserContext';
import Modal from 'react-modal';

const JobsList = ({ jobs, jobId }) => {
    const [formOpen, setFormOpen] = useState(false);
    const {activePage} = useContext(UserContext);

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
        case 'dash':
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
            {activePage === 'dash' ? null : <div className="jobs-page--jobs-list-header">
                <button className="add-job--btn" onClick={openForm}>Add</button>
            </div>}
            <div className="jobs-page--jobs-list-main">
            <Modal isOpen={formOpen} className="Modal" overlayClassName="Overlay">
                {JobOrTask() ? 
                    <AddJob openForm={openForm} newJob={jobs.length+1} />  
                    : <AddTask openForm={openForm} newJob={jobs.length+1} jobId={jobId} />} 

            </Modal>
                <ul>
                    {jobs.length ? jobs.map((job) => {
                        if (!job.placeholder) {
                            return (
                                <JobCard job={job} key={job.id} cardType={cardType} />
                                )
                        }
                    })
                : <p className="jobs-list--no-jobs">Nothing to display</p> }    
                </ul>
            </div>
        </div>
        )
}

export default JobsList;