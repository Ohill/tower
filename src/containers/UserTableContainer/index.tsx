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
    SearchHeader,
    DataItemInterface,
} from '../../components';
import {
    tablePageLimit,
} from '../../api/config';

interface UserTableState {
    page: number;
    rowsPerPage: number;
    searchPoint: DataItemInterface;
    searchValue: string;
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
            page: 0,
            rowsPerPage: tablePageLimit,
            searchPoint: this.dropdownValues[0],
            searchValue: '',
        };
    }

    private usersRows = [
        { key: 'email', alignRight: false, label: 'Email' },
        { key: 'otp', alignRight: true, label: 'Authorization method' },
        { key: 'level', alignRight: true, label: 'Level' },
        { key: 'role', alignRight: true, label: 'Role' },
        { key: 'uid', alignRight: true, label: 'UID' },
    ];

    private dropdownValues = [
        {
            label: 'All Users',
            value: 'all',
        },
        {
            label: 'Email',
            value: 'email',
        },
        {
            label: 'Authorization method',
            value: 'otp',
        },
        {
            label: 'Level',
            value: 'level',
        },
        {
            label: 'Role',
            value: 'role',
        },
        {
            label: 'UID',
            value: 'uid',
        },
        {
            label: 'State',
            value: 'state',
        },
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
        const {
            page,
            rowsPerPage,
            searchPoint,
            searchValue,
        } = this.state;

        return (
            <React.Fragment>
                <SearchHeader
                    data={this.dropdownValues}
                    searchValue={searchValue}
                    handleChangeSearchValue={this.handleChangeSearchValue}
                    searchPoint={searchPoint}
                    handleChangeSearchPoint={this.handleChangeSearchPoint}
                    handleSearch={this.handleSearch}
                />
                <InfoTable
                    dataLength={total}
                    rows={this.usersRows}
                    data={users}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={this.handleChangePage}
                />
            </React.Fragment>
        );
    }

    private handleChangeSearchPoint = (value: string) => {
        const item = this.dropdownValues.find(item => item.value === value);
        if (item) {
            this.setState({
                searchPoint: item,
                searchValue: '',
            });
        }
    };

    private handleChangeSearchValue = (value: string) => {
        this.setState({
            searchValue: value,
        });
    };

    private handleChangePage = (page: number) => {
        const { searchValue, searchPoint } = this.state;
        this.setState({ page });
        if (searchPoint.value === 'all') {
            this.props.getUsers({ limit: tablePageLimit, page: page + 1});
        } else {
          const requestObject = {
              field: searchPoint.value,
              value: searchValue.toLowerCase(),
              page: page + 1,
              limit: tablePageLimit,
          };
          this.props.getDataByFilter(requestObject);
        }
    };

    private handleSearch = (e?: any) => {
        if (e) {
            e.preventDefault();
        }
        const { searchValue, searchPoint } = this.state;
        if (searchPoint.value === 'all') {
            this.props.getUsers({ limit: tablePageLimit, page: 1});
        } else {
            const requestObject = {
                field: searchPoint.value,
                value: searchValue.toLowerCase(),
                page: 1,
                limit: tablePageLimit,
            };
            this.props.getDataByFilter(requestObject);
        }
        this.setState({
            page: 0,
        });
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
