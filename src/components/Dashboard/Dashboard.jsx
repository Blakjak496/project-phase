import { useEffect, useState } from "react";
import { formatDate, setGreeting } from "../../utils/utils";

const Dashboard = () => {
    const [greetingText, setGreetingText] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        const today = new Date();
        setGreetingText(setGreeting(today));
        setDate(formatDate(today));
    }, [])

    return (
        <div className="dashboard--wrapper">
            <div className="dashboard--greeting">
                <p className="dashboard--greeting-text">{greetingText} </p>
                <p className="dashboard--greeting-date">It's {date} </p>
            </div>
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