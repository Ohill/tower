import * as React from 'react';
import {
    createStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Theme,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
    convertToOtp,
    convertToUTCTime,
} from '../../helpers';

interface InfoTableProps {
    dataLength: number;
    rows: { key: string; alignRight: boolean; label: string; }[];
    data: any;
    page: number;
    rowsPerPage: number;
    handleChangePage: (page: any) => void;
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

type Props = StyleProps & InfoTableProps;

class TableComponent extends React.Component<Props> {
    public render() {
        const {
            classes,
            rows,
            data,
            page,
            hidePagination,
            dataLength,
        } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        {this.getHeaderForTable()}
                        <TableBody>
                            {data.map((n: any, i: number) => {
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
                                            )})
                                        }
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
                {!hidePagination ? (<TablePagination
                        component="div"
                        count={Number(dataLength)}
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
                    />
                ) : null}
            </div>
        );
    }

    private handleChangePage = (event: any, page: number) => {
        this.props.handleChangePage(page);
    };

    private getHeaderForTable = () => {
        return (
            <TableHead>
                <TableRow>
                    {this.props.rows.map((row: {key: string, alignRight: boolean, label: string}) => (
                        <TableCell
                            key={row.key}
                            align={row.alignRight ? 'right' : 'left'}
                        >
                            {row.label}
                        </TableCell>
                    ), this)}
                </TableRow>
            </TableHead>
        );
    };
}

export const InfoTable = withStyles(styles, { withTheme: true })(TableComponent);
