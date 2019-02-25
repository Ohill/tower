import {
    createStyles,
    Theme,
    withStyles,
    WithStyles,
} from '@material-ui/core';
import * as React from 'react';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import {
    AlertMessage,
} from '../../components';
import {
    alertDelete,
    alertDeleteByIndex,
    AlertState,
    AppState,
    selectAlertState,
} from '../../modules';
import {
    convertError
} from '../../helpers';

interface ReduxProps {
    alerts: AlertState;
}

interface DispatchProps {
    alertDelete: typeof alertDelete;
    alertDeleteByIndex: typeof alertDeleteByIndex;
}

interface StyleProps extends WithStyles<typeof styles> {
    theme: Theme;
}

type Props = ReduxProps & DispatchProps & StyleProps;

const styles = (theme: Theme) => createStyles({
    wrapper: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
});

class AlertComponent extends React.Component<Props> {
    public deleteAlertByIndex = (key: number) => {
        this.props.alertDeleteByIndex(key);
    };

    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.wrapper}>
                {this.props.alerts.alerts.map((w, k) => (
                    <div key={k} onClick={() => this.deleteAlertByIndex(k)}>
                        {w.message && w.message.map((e, i) =>
                            <AlertMessage key={i} message={convertError(e)} type={w.type as 'error' | 'snackbar' | 'success'} />)}
                    </div>)
                )}
            </div>
        );
    }
}

const mapStateToProps = (state: AppState): ReduxProps => ({
    alerts: selectAlertState(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        alertDelete: () => dispatch(alertDelete()),
        alertDeleteByIndex: payload => dispatch(alertDeleteByIndex(payload)),
    });

export const Alerts = withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(AlertComponent));
