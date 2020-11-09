import { Link } from '@reach/router';
import { formatDeadline } from '../../utils/utils';

const JobCard = ({job}) => {

    return (
        <div className="job-card--wrapper">
            <Link className="job-card--link" to={`/jobs/${job.id}`}>
                <p className="job-card--title">{job.title} </p>
                <p className="job-card--client">{job.clientName} </p>
                <p className="job-card--deadline">{job.deadline} </p>
            </Link>

        </div>
    )
}

export default JobCard;