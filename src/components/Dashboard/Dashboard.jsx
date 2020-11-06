import { useEffect, useState } from "react";
import { formatDate, setGreeting } from "../../utils/utils";
import Greeting from '../greeting';

const Dashboard = () => {
    

    return (
        <div className="dashboard--wrapper">
            <Greeting />
            <div className="dashboard--nav">
                <button className="nav-btn">Jobs</button>
                <button className="nav-btn">Calendar</button>
                <button className="nav-btn">Logout</button>
            </div>
            <div className="dashboard--job-tracker">
                jobtracker
            </div>
            <div className="dashboard--newsfeed">
                newsfeed
            </div>
        </div>
    )
}

export default Dashboard;