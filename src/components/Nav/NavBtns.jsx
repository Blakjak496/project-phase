import { Link } from '@reach/router';
import { useContext, useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';

import UserContext from '../UserContext';

const NavBtns = ({click}) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { activePage } = useContext(UserContext);

    const toggleDrawer = (bool, event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
          }
          setDrawerOpen(bool);
    }

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#1d9b1a',
            },
            secondary: {
                main: 'rgba(0,0,0,0.7)'
            }
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <AppBar className="dashboard--nav" color="secondary" key={'nav'} >            
                <Link id="dash" className={activePage === 'dash' ? "nav-btn--active" : "nav-btn"} to="/" >Dashboard</Link>
                <Link id="jobs" className={activePage === 'jobs' ? 'nav-btn--active' : "nav-btn"} to="/jobs" >Jobs</Link>
                <Link id="calendar" className={activePage === 'calendar' ? 'nav-btn--active' : "nav-btn"} to="/calendar" >Calendar</Link>
                <Link className="nav-btn" onClick={click} to="/">Logout</Link>
                <button
                    className="burger-button"
                    onClick={(event) => toggleDrawer(true, event)}
                    >
                    {drawerOpen ?
                        <MenuOpenIcon 
                            color="primary" 
                            fontSize="large" 
                            className="burger-icon"
                            /> 
                        : <MenuIcon 
                            color="primary"
                            fontSize="large" 
                            className="burger-icon"
                            />
                    }
                </button>
                <Drawer anchor={'bottom'} open={drawerOpen} onClick={(event) => toggleDrawer(false, event)}>
                    <List>
                        <ListItem button >
                            <Link id="dash" className={activePage === 'dash' ? "bm-item--active" : "bm-item"} to="/" >Dashboard</Link>
                        </ListItem>
                        <ListItem button>
                            <Link id="jobs" className={activePage === 'jobs' ? 'bm-item--active' : "bm-item"} to="/jobs" >Jobs</Link>
                        </ListItem>
                        <ListItem button>
                            <Link id="calendar" className={activePage === 'calendar' ? 'bm-item--active' : "bm-item"} to="/calendar" >Calendar</Link>
                        </ListItem>
                        <ListItem button>
                            <Link className="bm-item"  onClick={click} to="/">Logout</Link>
                        </ListItem>
                    </List>
                </Drawer>
            </AppBar>
        </ThemeProvider>
    )
}

export default NavBtns;