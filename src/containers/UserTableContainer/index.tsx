import * as React from 'react';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
} from 'react-redux';
import {
    AppState,
    getUsers,
    selectUsers,
    UserInterface,
} from '../../modules';
import {
    InfoTable,
} from '../../components';
import {
    tablePageLimit,
} from '../../api/config';

interface UserTableState {
    order: string;
    orderBy: string;
    page: number;
    rowsPerPage: number;
}

interface ReduxProps {
    users: UserInterface[];
}

interface DispatchProps {
    getUsers: typeof getUsers;
}

type Props = ReduxProps & DispatchProps;

class DashboardUserTable extends React.Component<Props, UserTableState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            order: 'asc',
            orderBy: this.usersRows[0].key,
            page: 0,
            rowsPerPage: tablePageLimit,
        };
    }

    private usersRows = [
        { key: 'email', alignRight: false, label: 'Email' },
        { key: 'otp', alignRight: true, label: 'Authorization method' },
        { key: 'level', alignRight: true, label: 'Level' },
        { key: 'role', alignRight: true, label: 'Role' },
        { key: 'uid', alignRight: true, label: 'UID' },
    ];

    public componentDidMount() {
        if (!this.props.users.length) {
            this.props.getUsers({
                limit: this.state.rowsPerPage,
                page: this.state.page + 1,
            });
        }
    }

    public componentWillReceiveProps(next: Props) {
        if (next.users.length < 50) {
            this.setState({
                rowsPerPage: next.users.length
            });
        } else {
            this.setState({
                rowsPerPage: tablePageLimit
            });
        }
    }

    public render() {
        const { users } = this.props;
        const { order, orderBy, page, rowsPerPage } = this.state;

        return (
            <InfoTable
                rows={this.usersRows}
                data={users}
                order={order}
                orderBy={orderBy}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={this.handleChangePage}
                handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                onRequestSort={this.handleRequestSort}
            />
        );
    }

    private handleChangePage = (page: number) => {
        this.setState({
            page: Number(page),
        });

        this.props.getUsers({ limit: tablePageLimit, page: Number(page + 1)})
    };

    private handleChangeRowsPerPage = (value: number) => {
        this.setState({
            rowsPerPage: Number(value),
        });
    };

    private handleRequestSort = (event: any, property: any) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        users: selectUsers(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getUsers: payload => dispatch(getUsers(payload)),
    });

export const UsersTableContainer = connect(mapStateToProps, mapDispatchToProps)(DashboardUserTable);
