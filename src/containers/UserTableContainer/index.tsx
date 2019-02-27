import * as React from 'react';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
} from 'react-redux';
import {
    AppState,
    getUsers,
    getDataByFilter,
    selectUsers,
    selectUsersTotal,
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
    total: number;
    users: UserInterface[];
}

interface DispatchProps {
    getUsers: typeof getUsers;
    getDataByFilter: typeof getDataByFilter;
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

    public render() {
        const { users, total } = this.props;
        const { order, orderBy, page, rowsPerPage } = this.state;

        return (
            <InfoTable
                dataLength={total}
                rows={this.usersRows}
                data={users}
                order={order}
                orderBy={orderBy}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={this.handleChangePage}
            />
        );
    }

    private handleChangePage = (page: number) => {
        this.setState({ page });
        this.props.getUsers({ limit: tablePageLimit, page: page + 1})
    };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, AppState> =
    (state: AppState): ReduxProps => ({
        users: selectUsers(state),
        total: selectUsersTotal(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        getUsers: payload => dispatch(getUsers(payload)),
        getDataByFilter: payload => dispatch(getDataByFilter(payload)),
    });

export const UsersTableContainer = connect(mapStateToProps, mapDispatchToProps)(DashboardUserTable);
