import * as React from 'react';
import {
    createStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Tooltip,
    Theme,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
    convertToOtp,
    convertToUTCTime,
    getSorting,
    stableSort,
} from '../../helpers';

interface InfoTableProps {
    rows: { key: string; alignRight: boolean; label: string; }[];
    data: any;
    order: string;
    orderBy: string;
    page: number;
    rowsPerPage: number;
    handleChangePage: (page: any) => void;
    handleChangeRowsPerPage: (value: any) => void;
    onRequestSort?: (event: any, property: any) => void;
    hidePagination?: boolean;
}

const styles = (theme: Theme) => (createStyles({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    link: {
        cursor: 'pointer',
        textDecoration: 'none',
        color: '#3598D5',
        fontSize: '16px',
    },
}));

interface StyleProps extends WithStyles<typeof styles> {
    theme: Theme;
}

type SortType = 'desc' | 'asc';

type Props = StyleProps & InfoTableProps;

class TableComponent extends React.Component<Props> {
    render() {
        const {
            classes,
            rows,
            data,
            order,
            orderBy,
            rowsPerPage,
            page,
            hidePagination,
        } = this.props;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <div className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        {this.getHeaderForTable()}
                        <TableBody>
                            {stableSort(data, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((n: any, i: number) => {
                                    return (
                                        <TableRow key={i}>
                                            {rows.map((row: any, index: number) => {
                                                return (
                                                    <TableCell key={index} component="th" align={row.alignRight ? 'right' : 'left'}>
                                                        { row.key === 'email' ? (<Link to={`/users/${n.uid}`} className={classes.link}>{n.email}</Link>)
                                                            : row.key === 'otp' ? (convertToOtp(n.otp) === 'true' ? '2FA' : '-')
                                                            : row.key === 'upload' ? (<a target='_blank' href={n.upload.url} className={classes.link}>Image</a>)
                                                            : row.key === 'created_at' || row.key === 'validated_at' || row.key === 'updated_at' ? (convertToUTCTime(n[row.key])) : n[row.key]}
                                                    </TableCell>
                                                )
                                            })
                                            }
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                {!hidePagination ? (<TablePagination
                        component="div"
                        count={data.length}
                        rowsPerPage={this.props.rowsPerPage}
                        rowsPerPageOptions={[]}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                ) : null}
            </div>
        );
    }

    private handleChangePage = (event: any, page: any) => {
        this.props.handleChangePage(page);
    };

    private handleChangeRowsPerPage = (event: any) => {
        this.props.handleChangeRowsPerPage(event.target.value);
    };

    private createSortHandler = (property: any) => (event: any) => {
        if (this.props.onRequestSort) {
            this.props.onRequestSort(event, property);
        }
    };

    private getHeaderForTable = () => {
        const { order, orderBy } = this.props;

        return (
            <TableHead>
                <TableRow>
                    {this.props.rows.map((row: {key: string, alignRight: boolean, label: string}) => (
                        <TableCell
                            key={row.key}
                            align={row.alignRight ? 'right' : 'left'}
                        >
                            <Tooltip
                                title="Sort"
                                enterDelay={300}
                            >
                                <TableSortLabel
                                    active={orderBy === row.key}
                                    direction={order as SortType}
                                    onClick={this.createSortHandler(orderBy)}
                                >
                                    {row.label}
                                </TableSortLabel>
                            </Tooltip>
                        </TableCell>
                    ), this)}
                </TableRow>
            </TableHead>
        );
    };
}

export const InfoTable = withStyles(styles, { withTheme: true })(TableComponent);
