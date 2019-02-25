import * as React from 'react';
import {
    connect,
    MapDispatchToPropsFunction,
} from 'react-redux';
import {
    UsersTableContainer,
} from '../';
import {
    Layout,
} from '../../components';
import {
    logout,
} from '../../modules';

interface DispatchProps {
    logout: typeof logout;
}

type Props = DispatchProps;

class DashboardScreen extends React.Component<Props> {
    public render() {
        return (
            <Layout logout={this.userLogout}>
                <UsersTableContainer />
            </Layout>
        );
    }

    private userLogout = () => {
        this.props.logout();
    };
}

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        logout: () => dispatch(logout()),
    });

export const Dashboard = connect(null, mapDispatchToProps)(DashboardScreen);
