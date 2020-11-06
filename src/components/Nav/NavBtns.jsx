import { Link } from '@reach/router';

const NavBtns = (props) => {

    const page = props.activePage;

    const dashNav = () => {
        return (
            <div className="dashboard--nav">
                <Link className="nav-btn" to="/jobs">Jobs</Link>
                <Link className="nav-btn" to="/calendar">Calendar</Link>
                <button className="nav-btn">Logout</button>
            </div>
        )
    }

    const jobsNav = () => {
        return (
            <div className="dashboard--nav">
                <Link className="nav-btn" to="/" >Dashboard</Link>
                <Link className="nav-btn" to="/calendar" >Calendar</Link>
                <button className="nav-btn">Logout</button>
            </div>
        )
    }

    const calendarNav = () => {
        return (
            <div className="dashboard--nav">
                <Link className="nav-btn" to="/" >Dashboard</Link>
                <Link className="nav-btn" to="/jobs">Jobs</Link>
                <button className="nav-btn">Logout</button>
            </div>
        )
    }

    switch(page) {
        case 'dash':
            return dashNav();
        case 'jobs':
            return jobsNav();
        case 'calendar':
            return calendarNav();
    }
}

export default NavBtns;