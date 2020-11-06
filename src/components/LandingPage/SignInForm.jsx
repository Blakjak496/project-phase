const SignInForm = (props) => {

    return (
        <div className="sign-in--wrapper">
            <button onClick={props.click}>Sign in with Google</button>
            <button onClick={props.click}>Sign in with Facebook</button>
            <button onClick={props.click}>Sign in with Twitter</button>
            <button onClick={props.click}>Sign in with Email</button>
        </div>
    )
}

export default SignInForm;