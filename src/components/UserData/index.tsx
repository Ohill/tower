import {
    Button,
    createStyles,
    Grid,
    Paper,
    Switch,
    TextField,
    Theme,
    Typography,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import SvgIcon from '@material-ui/core/SvgIcon';
import React from "react";
import {
    EditLabel,
    InfoTable,
} from '../';
import {
    convertToUTCTime,
    findPhone,
} from '../../helpers';

export interface TableHeaderItemInterface {
    key: string;
    alignRight: boolean;
    label: string;
}

export interface UserDataProps {
    addNewLabel: () => void;
    editLabel: (key: string, value: string, scope: string) => void;
    changeLabelName: (value: string) => void;
    changeLabelScope: (value: string) => void;
    changeLabelValue: (value: string) => void;
    closeModal: () => void;
    deleteUserLabel: (uid: string, key: string, scope: string) => void;
    handleChangeUserState: (e: any) => void;
    handleChangeRole: (e: any) => void;
    handleChangeUserOTP: (e: any) => void;
    newLabelName: string;
    newLabelScope: string;
    newLabelValue: string;
    isAddLabelModalOpened: boolean;
    isEditLabelModalOpened: boolean;
    openAddLabelModal: () => void;
    openEditLabelModal: (key: string, value: string, scope: string) => void;
    user: any;
    page: number;
    rowsPerPage: number;
    handleChangePage: (page: any) => void;
    documentsRows: TableHeaderItemInterface[];
    showMore: boolean;
    showMoreUserInfo: (e: any) => void;
}

const styles = (theme: Theme) => createStyles({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: "75%",
    },
    menu: {
        width: 200,
    },
    label: {
        height: 40,
        paddingLeft: 16,
        borderRadius: 24,
        width: 'auto',
        cursor: "pointer",
    },
    icon: {
        width: 32,
        height: 32,
        margin: 4,
        cursor: "pointer",
    },
    labelName: {
        paddingTop: 8,
        color: "#ffffff",
        fontSize: 16,
        marginRight: 7,
    },
});

const stateTypes = [
    {
      value: 'Active',
      key: 'active',
    },
    {
      value: 'Banned',
      key: 'banned',
    },
];

const roleTypes = [
    {
        value: 'Admin',
        key: 'admin',
    },
    {
        value: 'Member',
        key: 'member',
    },
];



const countries = require('country-data').countries;

interface StyleProps extends WithStyles<typeof styles> {
    theme?: Theme;
}

type Props = StyleProps & UserDataProps;

class UserDataComponent extends React.Component<Props> {

    public render() {
        const {
            classes,
            user,
            newLabelName,
            newLabelValue,
            newLabelScope,
            page,
            handleChangeUserState,
            handleChangeRole,
            handleChangeUserOTP,
            showMore,
        } = this.props;

        return (
            <div className="user-data">
                <Grid container>
                    <a style={{ marginRight: 15 }} href='/tower'>
                        <SvgIcon className={classes.icon} viewBox="0 0 24 24">
                          <path fill="#3598D5" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
                        </SvgIcon>
                    </a>
                    <Typography variant="h4" gutterBottom component="h4" style={{ color: "#3598D5" }}>
                        Account info
                    </Typography>
                </Grid>
                <Paper style={{ padding: 20, marginBottom: 15 }}>
                    <Typography variant="h3" gutterBottom component="h3">
                        {user.email}
                    </Typography>
                    <br/>
                    <Grid container justify={"space-between"} style={{ marginTop: 20, marginBottom: 40 }}>
                        <Grid item xs={3}>
                            <Typography variant="h6" component="h6" gutterBottom>
                                <b>Level</b>
                            </Typography>
                            <Typography variant="h6" gutterBottom component="h6" style={{ color: "#757575" }}>
                                {user.level}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h6" gutterBottom component="h6">
                                <b>UID</b>
                            </Typography>
                            <Typography variant="h6" gutterBottom component="h6" style={{ color: "#757575" }}>
                                {user.uid}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h6" gutterBottom component="h6">
                                <b>Phone number</b>
                            </Typography>
                            <Typography variant="h6" gutterBottom component="h6" style={{ color: "#757575" }}>
                                {user.phones.length > 0 ? findPhone(user.phones).number : '-'}
                            </Typography>
                        </Grid>
                        <Grid item xs={3} style={{ paddingTop: 5 }}>
                            <Typography variant="h6" gutterBottom component="h6">
                                <TextField
                                    select
                                    value={user.state}
                                    label="State"
                                    variant="outlined"
                                    className={classes.textField}
                                    onChange={handleChangeUserState}
                                    SelectProps={{
                                        native: true,
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                    }}
                                >
                                    {stateTypes.map(option => (
                                        <option key={option.key} value={option.key}>
                                            {option.value}
                                        </option>
                                    ))}
                                </TextField>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container justify={"space-between"} style={{ marginTop: 20, marginBottom: 40 }}>
                        <Grid item xs={3}>
                            <Typography variant="h6" component="h6" gutterBottom>
                                <b>First name</b>
                            </Typography>
                            <Typography variant="h6" gutterBottom component="h6" style={{ color: "#757575" }}>
                                {user.profile !== null ? user.profile.first_name : '-'}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h6" gutterBottom component="h6">
                                <b>Last name</b>
                            </Typography>
                            <Typography variant="h6" gutterBottom component="h6" style={{ color: "#757575" }}>
                                {user.profile !== null ? user.profile.last_name : '-'}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h6" gutterBottom component="h6">
                                <b>Day of Birth</b>
                            </Typography>
                            <Typography variant="h6" gutterBottom component="h6" style={{ color: "#757575" }}>
                                {user.profile !== null ? user.profile.dob : "-"}
                            </Typography>
                        </Grid>
                        <Grid item xs={3} style={{ paddingTop: 5 }}>
                            <Typography variant="h6" gutterBottom component="h6">
                                <TextField
                                    select
                                    value={user.role}
                                    label="Role"
                                    variant="outlined"
                                    className={classes.textField}
                                    onChange={handleChangeRole}
                                    SelectProps={{
                                        native: true,
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                    }}
                                >
                                    {roleTypes.map(option => (
                                        <option key={option.key} value={option.key}>
                                            {option.value}
                                        </option>
                                    ))}
                                </TextField>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container justify={"space-between"} style={{ marginTop: 20, marginBottom: 40 }}>
                        <Grid item xs={3}>
                            <Typography variant="h6" gutterBottom component="h6">
                                <b>Country</b>
                            </Typography>
                            <Typography variant="h6" gutterBottom component="h6" style={{ color: "#757575" }}>
                                {user.profile !== null ? this.displayCountry(user.profile.country) : '-'}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h6" gutterBottom component="h6">
                                <b>Validated at</b>
                            </Typography>
                            <Typography variant="h6" gutterBottom component="h6" style={{ color: "#757575" }}>
                                {user.phones.length > 0 ? convertToUTCTime(findPhone(user.phones).validated_at) : '-'}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            {user.profile === null || showMore ? (
                                <><Typography variant="h6" gutterBottom component="h6">
                                  <b>Postcode</b>
                                </Typography>
                                <Typography variant="h6" gutterBottom component="h6" style={{color: "#757575"}}>
                                    {user.profile !== null ? user.profile.postcode : '-'}
                                </Typography></>
                                ) : (
                                <Button onClick={(e) => this.props.showMoreUserInfo(e)} style={{ marginTop: 10 }}>
                                    <Typography variant="h6" component="h6" style={{ color: "#3598D5" }}>
                                        MORE USER INFO
                                    </Typography>
                                </Button>
                                )}
                        </Grid>
                        <Grid container justify={"flex-start"} item xs={3}>
                            <Grid item style={{ paddingLeft: 10, marginRight: 60 }}>
                                <Typography variant="h6" gutterBottom component="h6">
                                    <b>Authorization 2FA</b>
                                </Typography>
                                <Typography variant="h6" gutterBottom component="h6" style={{ color: "#757575" }}>
                                    {user.otp ? 'Enable' : 'Disable'}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    checked={user.otp}
                                    onChange={handleChangeUserOTP}
                                    color="primary"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    {showMore && user.profile !== null ? this.showMetadata(user.profile.metadata) : null}
                    <Typography variant="h5" gutterBottom component="h5">
                        Labels
                    </Typography>
                    <Grid container justify={"flex-start"} spacing={16}>
                        {user.labels.map((label: any, i: number) => this.getLabelData(label, i, classes))}
                        <Grid item>
                            <Button onClick={(e) => this.openAddLabelModal()}>
                                <Typography variant="h6" component="h6" style={{ color: "#3598D5" }}>
                                    ADD NEW LABEL
                                </Typography>
                            </Button>
                        </Grid>
                        <EditLabel
                            editLabel={this.props.addNewLabel}
                            handleChangeLabelName={this.props.changeLabelName}
                            handleChangeLabelScope={this.props.changeLabelScope}
                            handleChangeLabelValue={this.props.changeLabelValue}
                            modalClose={this.modalClose}
                            name={newLabelName}
                            open={this.props.isAddLabelModalOpened}
                            scope={newLabelScope}
                            value={newLabelValue}
                        />
                        <EditLabel
                            editLabel={this.props.editLabel}
                            handleChangeLabelName={this.props.changeLabelName}
                            handleChangeLabelScope={this.props.changeLabelScope}
                            handleChangeLabelValue={this.props.changeLabelValue}
                            modalClose={this.modalClose}
                            name={newLabelName}
                            open={this.props.isEditLabelModalOpened}
                            scope={newLabelScope}
                            value={newLabelValue}
                        />
                    </Grid>
                    <Typography variant="h5" gutterBottom component="h5" style={{ marginTop: 40 }}>
                        Documents
                    </Typography>
                    <InfoTable
                        dataLength={this.props.documentsRows.length}
                        rows={this.props.documentsRows}
                        data={user.documents}
                        page={page}
                        rowsPerPage={user.documents.length}
                        handleChangePage={this.props.handleChangePage}
                        hidePagination={true}
                    />
                </Paper>
                <Grid container justify={"center"} spacing={40}>
                    <Grid item>
                        <Typography style={{ color: "#757575" }}>
                            Created at: {convertToUTCTime(user.created_at)}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography style={{ color: "#757575" }}>
                            Last activity: {convertToUTCTime(user.updated_at)}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        );
    }

    private getLabelData = (label: any, i: number, classes: any) => {
        const { user } = this.props;
        switch (label.key) {
            case 'email': return (
                <Grid item key={i}>
                    <Grid container justify={"space-between"} className={classes.label} style={{ backgroundColor: "#43A047" }}>
                        <Typography onClick={(e) => this.openEditLabelModal(label.key, label.value, label.scope)} className={classes.labelName}>
                            email:{label.value}
                        </Typography>
                        <SvgIcon onClick={(e) => this.deleteLabel(user.uid, label.key, label.scope)} className={classes.icon} viewBox="0 0 32 32">
                            <path d="m15,0.25c8.15675,0 14.75,6.59325 14.75,14.75c0,8.15675 -6.59325,14.75 -14.75,14.75c-8.15675,0 -14.75,-6.59325 -14.75,-14.75c0,-8.15675 6.59325,-14.75 14.75,-14.75m5.29525,7.375l-5.29525,5.29525l-5.29525,-5.29525l-2.07975,2.07975l5.29525,5.29525l-5.29525,5.29525l2.07975,2.07975l5.29525,-5.29525l5.29525,5.29525l2.07975,-2.07975l-5.29525,-5.29525l5.29525,-5.29525l-2.07975,-2.07975z" id="svg_1" fill="#ffffff" stroke="null"/>
                        </SvgIcon>
                    </Grid>
                </Grid>
            );
            case 'phone': return (
                <Grid item key={i}>
                    <Grid container justify={"space-between"} className={classes.label} style={{ backgroundColor: "#009688" }}>
                        <Typography onClick={(e) => this.openEditLabelModal(label.key, label.value, label.scope)} className={classes.labelName}>
                            phone:{label.value}
                        </Typography>
                        <SvgIcon onClick={(e) => this.deleteLabel(user.uid, label.key, label.scope)} className={classes.icon} viewBox="0 0 32 32">
                            <path d="m15,0.25c8.15675,0 14.75,6.59325 14.75,14.75c0,8.15675 -6.59325,14.75 -14.75,14.75c-8.15675,0 -14.75,-6.59325 -14.75,-14.75c0,-8.15675 6.59325,-14.75 14.75,-14.75m5.29525,7.375l-5.29525,5.29525l-5.29525,-5.29525l-2.07975,2.07975l5.29525,5.29525l-5.29525,5.29525l2.07975,2.07975l5.29525,-5.29525l5.29525,5.29525l2.07975,-2.07975l-5.29525,-5.29525l5.29525,-5.29525l-2.07975,-2.07975z" id="svg_1" fill="#ffffff" stroke="null"/>
                        </SvgIcon>
                    </Grid>
                </Grid>
            );
            case 'document': return (
                <Grid item key={i}>
                    <Grid container justify={"space-between"} className={classes.label} style={{ backgroundColor: "#3F51B5" }}>
                        <Typography onClick={(e) => this.openEditLabelModal(label.key, label.value, label.scope)} className={classes.labelName}>
                            document:{label.value}
                        </Typography>
                        <SvgIcon onClick={(e) => this.deleteLabel(user.uid, label.key, label.scope)} className={classes.icon} viewBox="0 0 32 32">
                            <path d="m15,0.25c8.15675,0 14.75,6.59325 14.75,14.75c0,8.15675 -6.59325,14.75 -14.75,14.75c-8.15675,0 -14.75,-6.59325 -14.75,-14.75c0,-8.15675 6.59325,-14.75 14.75,-14.75m5.29525,7.375l-5.29525,5.29525l-5.29525,-5.29525l-2.07975,2.07975l5.29525,5.29525l-5.29525,5.29525l2.07975,2.07975l5.29525,-5.29525l5.29525,5.29525l2.07975,-2.07975l-5.29525,-5.29525l5.29525,-5.29525l-2.07975,-2.07975z" id="svg_1" fill="#ffffff" stroke="null"/>
                        </SvgIcon>
                    </Grid>
                </Grid>
            );
            default: return (
                <Grid item key={i}>
                    <Grid container justify={"space-between"} className={classes.label} style={{ backgroundColor: "#e0e0e0" }}>
                        <Typography onClick={(e) => this.openEditLabelModal(label.key, label.value, label.scope)} style={{ paddingTop: 8, color: "#757575", fontSize: 16, marginRight: 7 }}>
                            {label.key}
                        </Typography>
                        <SvgIcon onClick={(e) => this.deleteLabel(user.uid, label.key, label.scope)} className={classes.icon} viewBox="0 0 32 32">
                            <path d="m15,0.25c8.15675,0 14.75,6.59325 14.75,14.75c0,8.15675 -6.59325,14.75 -14.75,14.75c-8.15675,0 -14.75,-6.59325 -14.75,-14.75c0,-8.15675 6.59325,-14.75 14.75,-14.75m5.29525,7.375l-5.29525,5.29525l-5.29525,-5.29525l-2.07975,2.07975l5.29525,5.29525l-5.29525,5.29525l2.07975,2.07975l5.29525,-5.29525l5.29525,5.29525l2.07975,-2.07975l-5.29525,-5.29525l5.29525,-5.29525l-2.07975,-2.07975z" id="svg_1" fill="#ffffff" stroke="null"/>
                        </SvgIcon>
                    </Grid>
                </Grid>
            );
        }
    };

    private openAddLabelModal = () => {
        this.props.openAddLabelModal();
    };

    private openEditLabelModal = (key: string, value: string, scope: string) => {
        this.props.openEditLabelModal(key, value, scope);
    };

    private showMetadata = (metadata: any) => {
        let grids = [];
        let res = [];
        let i = 4; //container's number
        grids.push(this.getGrid('City', this.props.user.profile !== null ? this.props.user.profile.city : '-'));
        grids.push(this.getGrid('Address', this.props.user.profile !== null ? this.props.user.profile.address : '-'));

        if (metadata !== null) {
            for (var key in metadata) {
                if (metadata.hasOwnProperty(key)) {
                    grids.push(this.getGrid(key, metadata[key]));
                    if (grids.length === 4) {
                        res.push(this.wrapGrids(grids, i));
                        grids = [];
                        i += 1;
                    }
                }
            }
        }
        grids.push(
            <Grid item xs={3} key='less'>
                <Button onClick={(e) => this.props.showMoreUserInfo(e)} style={{ marginTop: 10 }}>
                    <Typography variant="h6" component="h6" style={{ color: "#3598D5" }}>
                        LESS USER INFO
                    </Typography>
                </Button>
            </Grid>
        );
        while (grids.length < 4) {
            grids.push(
                <Grid item xs={3} key={`empty${grids.length}`}/>
            )
        }
        res.push(this.wrapGrids(grids, i));
        return res;
    };

    private wrapGrids = (grids: JSX.Element[], i: number) => {
       return (
           <Grid key={`container${i}`} container justify={"space-between"} style={{marginTop: 20, marginBottom: 40}}>
               {grids}
           </Grid>
           );
       };

    private getGrid = (key: string, value: string) => {
        return (
            <Grid item xs={3} key={key}>
                <Typography variant="h6" gutterBottom component="h6">
                    <b>{key.slice(0, 1).toUpperCase() + key.slice(1)}</b>
                </Typography>
                <Typography variant="h6" gutterBottom component="h6" style={{color: "#757575"}}>
                    {value}
                </Typography>
            </Grid>
        )
    };

    private modalClose = () => {
        this.props.closeModal();
    };

    private deleteLabel = (uid: string, key: string, scope: string) => {
        this.props.deleteUserLabel(uid, key, scope);
    };

    private displayCountry = (code: string) => {
        if (code === 'null') {
            return '-';
        } else if (countries[code.toUpperCase()] !== undefined) {
            return countries[code.toUpperCase()].name;
        }
        return code;
    }
}


export const UserData = withStyles(styles)(UserDataComponent);
