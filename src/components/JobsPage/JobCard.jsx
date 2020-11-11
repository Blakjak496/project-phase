import { Link } from '@reach/router';

const JobCard = ({job, cardType}) => {

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
        return (
            <div className="job-card--wrapper">
                <span className="job-card--link">
                    <p className="job-card--title">{job.task} </p>
                    <p className="job-card--deadline">{job.expected} </p>
                    <p className="job-card--deadline">{job.deadline} </p>
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