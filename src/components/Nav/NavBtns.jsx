import { Link } from '@reach/router';
import { useContext } from 'react';
import { slide as Burger } from 'react-burger-menu';

import UserContext from '../UserContext';

const NavBtns = ({click}) => {
    const {activePage, setActivePage} = useContext(UserContext);

    return (
        <div className="dashboard--nav">            
            <Link id="dash" className={activePage === 'dash' ? "nav-btn--active" : "nav-btn"} to="/" >Dashboard</Link>
            <Link id="jobs" className={activePage === 'jobs' ? 'nav-btn--active' : "nav-btn"} to="/jobs" >Jobs</Link>
            <Link id="calendar" className={activePage === 'calendar' ? 'nav-btn--active' : "nav-btn"} to="/calendar" >Calendar</Link>
            <Link className="nav-btn" onClick={click} to="/">Logout</Link>
            <Burger pageWrapId={"page-body"} outerContainerId={"app"} right noOverlay>
                <Link id="dash" className={activePage === 'dash' ? "bm-item--active" : "bm-item"} to="/" >Dashboard</Link>
                <Link id="jobs" className={activePage === 'jobs' ? 'bm-item--active' : "bm-item"} to="/jobs" >Jobs</Link>
                <Link id="calendar" className={activePage === 'calendar' ? 'bm-item--active' : "bm-item"} to="/calendar" >Calendar</Link>
                <Link  onClick={click} to="/">Logout</Link>
            </Burger>
        </div>
    )

    // const dashNav = () => {
    //     return (
    //         <div className="dashboard--nav">
    //             <Link id="jobs" className={activePage === "nav-btn"} to="/jobs" >Jobs</Link>
    //             <Link id="calendar" className={activePage === "nav-btn"} to="/calendar" >Calendar</Link>
    //             <Link className={activePage === "nav-btn"} onClick={click} to="/">Logout</Link>
    //         </div>
    //     )
    // }

    // const jobsNav = () => {
    //     return (
    //         <div className="dashboard--nav">
    //             <Link id="dash" className={activePage === "nav-btn"} to="/" >Dashboard</Link>
    //             <Link id="calendar" className={activePage === "nav-btn"} to="/calendar" >Calendar</Link>
    //             <Link className={activePage === "nav-btn"} onClick={click} to="/">Logout</Link>
    //         </div>
    //     )
    // }

    // const calendarNav = () => {
    //     return (
    //         <div className="dashboard--nav">
    //             <Link id="dash" className={activePage === "nav-btn"} to="/"  >Dashboard</Link>
    //             <Link id="jobs" className={activePage === "nav-btn"} to="/jobs" >Jobs</Link>
    //             <Link className={activePage === "nav-btn"} onClick={click} to="/" >Logout</Link>
    //         </div>
    //     )
    // }

    // const jobNav = () => {
    //     return (
    //         <div className="dashboard--nav">
    //             <Link id="dash" className={activePage === "nav-btn"} to="/" >Dashboard</Link>
    //             <Link id="jobs" className={activePage === "nav-btn"} to="/jobs" >Jobs</Link>
    //             <Link id="calendar" className={activePage === "nav-btn"} to="/calendar" >Calendar</Link>
    //             <Link className={activePage === "nav-btn"} onClick={click} to="/">Logout</Link>
    //         </div>
    //     )
    // }

    // switch(page) {
    //     case 'dash':
    //         return dashNav();
    //     case 'jobs':
    //         return jobsNav();
    //     case 'calendar':
    //         return calendarNav();
    //     case 'job':
    //         return jobNav();
    //     default:
    //         break;
    // }
}

export default NavBtns;