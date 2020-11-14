import SignInForm from './SignInForm';
import image from '../../images/under-928246.jpg';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1d9b1a',
        }
    }
})

const LandingPage = ({click, remember, rememberState}) => {

    localStorage.setItem('rememberMe', JSON.stringify(rememberState));
    const handleChange = () => {
        remember(!rememberState);
    }

    return (
        <div className="landing-page--wrapper">
            <h2>OrganiseMe</h2>
            <div className="landing-page--section">
                <SignInForm click={click} rememberMe={rememberState} />
                <ThemeProvider theme={theme}>
                    <FormControlLabel
                        control={
                            <Switch 
                                checked={rememberState}
                                onChange={handleChange}
                                name="rememberState"
                                color='primary' />}
                        label="Stay Signed In"
                        
                        />
                </ThemeProvider>
            </div>
            <div className="landing-page--section">
                <div className="landing-page--description-wrapper">
                    <p className="landing-page--description-text">
                        OrganiseMe is an application disigned to help you keep yourself organised.
                        <br/>
                        The app features lists that allow you to create jobs, and add sub-tasks to those jobs.
                        Sub-tasks can then be marked as complete or incomplete as you progress through your project.
                        The lists allow you to add deadlines and details to your jobs, as well as track all of your
                        deadlines in the calendar feature.
                        <br/>
                        Within the Calendar feature, you can add any miscellaneous events (such as holidays) directly
                        to the calendar so that you always know your availablity while planning your deadlines.
                    </p>
                    <img className="landing-page--screenshot" src={image} alt="screenshot of app feature"/>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;