import { useEffect, useState } from "react";
import { formatDate, setGreeting } from "../../utils/utils";
import Greeting from '../greeting';
import NavBtns from '../Nav/NavBtns';

const Dashboard = () => {
    

    return (
        <div className="dashboard--wrapper">
            <Greeting />
            <NavBtns activePage={'dash'} />
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