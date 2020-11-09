import Greeting from '../greeting';

const JobPage = (props) => {

    return (
        <div>
            <Greeting />
            <NavBtns activePage={'job'} click={props.click} />
            <JobsList jobs={props.job.tasks} />
        </div>
    )

}

export default JobPage;