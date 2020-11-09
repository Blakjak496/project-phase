import { Link } from '@reach/router';
import { useState } from 'react';

import JobCard from './JobCard';
import AddJob from './AddJob';

const JobsList = ({jobs}) => {
    const [formOpen, setFormOpen] = useState(false);

    const openForm = () => {
        setFormOpen(!formOpen)
    }
//*I am refactoring this component to be a CardList component.
//*It will receive 2 things on props. a function to fetch data from the DB,
//*and an activePage (already being passed to NavBtns).
//*This will allow the list to fetch the appropriate data and display the correct
//*type of card based on what it receives on props and remove the need for
//*multiple List components.
    
    
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