import { useContext, useEffect, useState } from "react"
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

import Greeting from '../greeting';
import NavBtns from '../Nav/NavBtns';
import UserContext from "../UserContext";
import JobsList from './JobsList';

const JobsPage = (props) => {
    const {currentUser, accountsRef} = useContext(UserContext);
    let jobs = [];

    const [value, loading, error] = useDocument(accountsRef);
    if (!loading) jobs = value.data().jobs;
    console.log(jobs);

    
    return (
        <div className="jobs-page--wrapper">
            <Greeting />
            <NavBtns activePage={'jobs'} click={props.click} />
            <JobsList jobs={jobs} />
        </div>
    )
}

export default JobsPage;