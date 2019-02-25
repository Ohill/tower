import {
    AppBar,
    Button,
    createStyles,
    IconButton,
    Theme,
    Toolbar,
    Typography,
    withStyles,
    WithStyles,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import * as React from 'react';

const drawerWidth = 240;

const styles = (theme: Theme) => createStyles({
    appBar: {
        backgroundColor: '#3598D5',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        backgroundColor: '#3598D5',
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing.unit * 7 + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9 + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    grow: {
        flexGrow: 1,
        cursor: 'pointer',
    },
});

interface Props extends WithStyles<typeof styles> {
    theme: Theme;
    logout: () => void;
}

class NavBar extends React.Component<Props> {
    render() {
        const { classes } = this.props;

        return (
            <div>
                <AppBar
                  position="fixed"
                  className={classes.appBar}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            href="/tower"
                        >
                            <HomeIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow} onClick={this.goToDashboard}>
                            Control Tower
                        </Typography>
                        <Button color="inherit" onClick={this.handleLogout}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

    private handleLogout = () => {
        this.props.logout();
    };

    private goToDashboard = () => {
        window.location.replace('/tower');
    };
}

export const Navbar = withStyles(styles, { withTheme: true })(NavBar);
