import SignInForm from './SignInForm';
import image from '../../images/under-928246.jpg';



const LandingPage = ({click}) => {

    return (
        <div className="landing-page--wrapper">
            <h2>Ready to get organised?</h2>
            <div className="landing-page--section">
                <SignInForm click={click} />
            </div>
            <div className="landing-page--section">
                <div className="landing-page--description-wrapper">
                    <p className="landing-page--description-text">
                        With The Organiser, you can create and track all of your jobs, and create sub-tasks for each.
                        To make sure you don't miss crucial deadlines, all of your jobs will be added to your in-app
                        calendar, where you can also see a quick-access list of any deadlines you have coming up this
                        month.
                    </p>
                    <img className="landing-page--screenshot" src={image} alt="screenshot of app feature"/>
                </div>
                {/* <div className="landing-page--description-wrapper">
                    <p className="landing-page--description-text">
                        Keep up-to-date on the latest news from your favourite outlets using the RSS reader on your
                        personal Dashboard.
                    </p>
                    <img className="landing-page--screenshot" src={image} alt="screenshot of app feature"/>
                </div> */}
            </div>
        </div>
    )
}

export default LandingPage;