import { useEffect, useState } from "react";
import { formatDate, setGreeting } from "../../utils/utils";
import Greeting from '../greeting';
import NavBtns from '../Nav/NavBtns';

const Dashboard = ({click}) => {
    

    return (
        <div className="dashboard--wrapper">
            <div className="page-header">
                <Greeting />
                <NavBtns activePage={'dash'} click={click} />
            </div>
            <div className="page-body">
                <div className="dashboard--job-tracker">
                    jobtracker
                </div>
                <div className="dashboard--newsfeed">
                    newsfeed
                </div>
            </div>
        </div>
    )
}

export default Dashboard;