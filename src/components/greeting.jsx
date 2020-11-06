import { useEffect, useState } from "react";
import {setGreeting, formatDate} from '../utils/utils';

const Greeting = () => {
    const [greetingText, setGreetingText] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        const today = new Date();
        setGreetingText(setGreeting(today));
        setDate(formatDate(today));
    }, [])

    return (
        <div className="dashboard--greeting">
            <p className="dashboard--greeting-text">{greetingText} </p>
            <p className="dashboard--greeting-date">It's {date} </p>
        </div>
    )
}

export default Greeting;