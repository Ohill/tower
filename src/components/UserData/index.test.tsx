import * as React from 'react';
import { UserData, UserDataProps } from './index';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const defaults: UserDataProps = {
    addNewLabel: jest.fn(),
    changeLabelName: jest.fn(),
    changeLabelScope: jest.fn(),
    changeLabelValue: jest.fn(),
    closeModal: jest.fn(),
    deleteUserLabel: jest.fn(),
    documentsRows: [{
        'key': '',
        'alignRight': false,
        'label': '',
    }],
    editLabel: jest.fn(),
    handleChangePage: jest.fn(),
    handleChangeRole: jest.fn(),
    handleChangeUserOTP: jest.fn(),
    handleChangeUserState: jest.fn(),
    isAddLabelModalOpened: false,
    isEditLabelModalOpened: false,
    newLabelName: '',
    newLabelScope: 'public',
    newLabelValue: '',
    openAddLabelModal: jest.fn(),
    openEditLabelModal:  jest.fn(),
    page: 0,
    rowsPerPage: 0,
    showMore: false,
    showMoreUserInfo: jest.fn(),
    user: {
        "email": "admin@barong.io",
        "level": 3,
        "profile": {
            "first_name": "Admin",
            "last_name": "Barongovich",
            "dob": "2019-01-09",
            "address": "Kievan Rus",
            "postcode": "007007",
            "city": "Kiev",
            "country": "ua",
            "metadata": null
        },
        "otp": true,
        "role": "admin",
        "state": "active",
        "uid": "ID3237511380",
        "created_at": "2019-01-10T12:14:15Z",
        "updated_at": "2019-01-10T12:25:15Z",
        "documents": [],
        "labels": [
            {
                "key":"email",
                "value":"verified",
                "scope":"private",
                "created_at":"2019-01-10T12:14:16Z",
                "updated_at":"2019-01-10T12:14:16Z"
            },
            {
                "key":"phone",
                "value":"verified",
                "scope":"private",
                "created_at":"2019-01-10T12:14:16Z",
                "updated_at":"2019-01-10T12:14:16Z"
            },
            {
                "key":"documents",
                "value":"verified",
                "scope":"private",
                "created_at":"2019-01-10T12:14:16Z",
                "updated_at":"2019-01-10T12:14:16Z"
            },
            {
                "key":"Public label",
                "value":"verified",
                "scope":"public",
                "created_at":"2019-01-10T12:14:16Z",
                "updated_at":"2019-01-10T12:14:16Z"
            }
        ],
        "phones": [
            {
                "country": "UA",
                "number": "380000000000",
                "validated_at": "2019-01-14T13:54:48.000Z"
            },
            {
                "country": "UA",
                "number": "380111111111",
                "validated_at": "2019-01-13T13:54:48.000Z"
            },
            {
                "country": "UA",
                "number": 380222222222,
                "validated_at": null
            }
        ]
    }
};

const setup = (props: Partial<UserDataProps> = {}) =>
    Enzyme.shallow(<UserData {...{ ...defaults, ...props }} />);

describe('UserData Component', () => {
    let wrapper = setup();

    beforeEach(() => {
        wrapper = setup();
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
