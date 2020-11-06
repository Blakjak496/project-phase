import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { useState } from 'react';

const SignInForm = (props) => {
    // const [usingEmail, setUsingEmail] = useState(false);
    // // const [emailInput, setEmailInput] = useState('');
    // // const [passwordInput, setPasswordInput] = useState('');

    const provider = new firebase.auth.GoogleAuthProvider();

    const googleSignIn = () => {
        firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const token = result.credential.accessToken;
            const user = result.user;
            props.click(user)
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = error.credential;
            console.log({code: errorCode, message: errorMessage, email, credential});
        })
    }

    // const signInWithEmail = () => {

    // }

    // const showForm = (event) => {
    //     setUsingEmail(!usingEmail);
    // }

    // const handleChange = (event) => {
    //     if (event.target.id === 'email') setEmailInput(event.target.value);
    //     if (event.target.id === 'password') setPasswordInput(event.target.value);
    // }

    const EmailForm = () => {
        return (
            <div>
                <input type="text" placeholder="Email Address..."/>
                {/* <input type="text" placeholder="Password..."/>
                <button onClick={signInWithEmail}>Submit</button> */}
            </div>
        )
    }

    return (
        <div className="sign-in--wrapper">
            <button onClick={googleSignIn}>Sign in with Google</button>
            {/* <button onClick={showForm}>Sign in with Email</button>
            {usingEmail ? <EmailForm /> : null} */}
        </div>
    )
}

export default SignInForm;