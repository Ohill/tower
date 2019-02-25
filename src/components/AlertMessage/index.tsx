import React from 'react';
import classNames from 'classnames';
import {
    createStyles,
    SnackbarContent,
    Theme,
    withStyles,
    WithStyles,
} from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
    snackbar: {
        position: 'relative',
        zIndex: 10000,
        display: 'flex',
        margin: 10,
        backgroundColor: 'transparent',
    },
    error: {
        background: '#d32f2f !important',
    },
    success: {
        backgroundColor: '#43a047',
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

interface Props extends WithStyles<typeof styles> {
    theme: Theme;
    message: string;
    type: 'error' | 'snackbar' | 'success';
}

class AlertMessageComponent extends React.Component<Props> {
    render() {
        const { classes, message, type } = this.props;
        const cx = classNames(classes[type], classes.snackbar);
        return (
            <SnackbarContent
                className={classNames(classes[type], cx)}
                message={
                  <span id="client-snackbar" className={classes.message}>
                    {message}
                  </span>
                }
            />
        );
    }
}

export const AlertMessage = withStyles(styles, { withTheme: true })(AlertMessageComponent);
