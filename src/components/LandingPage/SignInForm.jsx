import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const SignInForm = (props) => {

    const provider = new firebase.auth.GoogleAuthProvider();

    const googleSignIn = () => {
        firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            if (props.rememberMe) {
                localStorage.setItem('currentUser', JSON.stringify(user))
              } else {    
                sessionStorage.setItem('currentUser', JSON.stringify(user));
              }
            props.click(user)
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = error.credential;
            console.log({code: errorCode, message: errorMessage, email, credential});
        })
    }

    return (
        <div className="sign-in--wrapper">
            <button onClick={googleSignIn}>Sign in with Google</button>
        </div>
    )
}

export default SignInForm;