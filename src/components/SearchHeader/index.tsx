import {
    createStyles,
    IconButton,
    MenuItem,
    Theme,
    TextField,
    withStyles,
    WithStyles,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import classNames from 'classnames';
import * as React from 'react';


const styles = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    margin: {
      margin: theme.spacing.unit,
    },
    textField: {
      flexBasis: 200,
    },
    iconButton: {
        padding: 10,
    },
    menu: {
        width: 200,
    },
});

export interface DataItemInterface {
    label: string;
    value: string;
}

interface StyleProps extends WithStyles<typeof styles> {
    theme: Theme;
}

interface OwnProps {
    data: DataItemInterface[];
    searchPoint: DataItemInterface;
    searchValue: string;
    handleChangeSearchValue: (value: string) => void;
    handleChangeSearchPoint: (value: string) => void;
    handleSearch: (e?: any) => void;
}

type Props = StyleProps & OwnProps;

class SearchHeaderComponent extends React.Component<Props> {
    render() {
        const { classes, data, searchValue, searchPoint } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off" onSubmit={e => this.props.handleSearch(e)}>
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Search by"
                    className={classNames(classes.margin, classes.textField)}
                    value={searchPoint.value}
                    onChange={e => this.props.handleChangeSearchPoint(e.target.value)}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    margin="normal"
                    variant="outlined"
                >
                    {data.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="outlined-adornment-weight"
                    className={classNames(classes.margin, classes.textField)}
                    variant="outlined"
                    label={searchPoint.label}
                    value={searchValue}
                    onChange={e => this.props.handleChangeSearchValue(e.target.value)}
                    InputProps={{
                        endAdornment: <IconButton className={classes.iconButton} aria-label="Search" onClick={this.props.handleSearch}><SearchIcon /></IconButton>,
                    }}
                />
            </form>
        );
    }
}

export const SearchHeader = withStyles(styles, { withTheme: true })(SearchHeaderComponent);
