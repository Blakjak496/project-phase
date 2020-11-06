import { Link } from '@reach/router';
import { useState } from 'react';

import JobCard from './JobCard';
import AddJob from './AddJob';

const JobsList = ({jobs}) => {
    const [formOpen, setFormOpen] = useState(false);

    const openForm = () => {
        setFormOpen(!formOpen)
    }

    
    
    return (
        <div className="jobs-page--jobs-list">
            <div className="jobs-page--jobs-list-header">
                <button className="add-job--btn" onClick={openForm}>Add</button>
            </div>
            <div className="jobs-page--jobs-list-main">
                {formOpen ? <AddJob openForm={openForm} /> : <ul>
                    {jobs.map((job) => {
                        return (
                            <JobCard job={job} key={job.id} />
                        )
                    })}    
                </ul>}
            </div>
        </div>
    )
}

export default JobsList;