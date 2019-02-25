import {
    ADD_USER_LABEL_FETCH,
    DELETE_USER_LABEL_FETCH,
    EDIT_USER_LABEL_FETCH,
} from '../constants';

export interface AddUserLabelFetch {
    type: typeof ADD_USER_LABEL_FETCH,
    payload: {
        uid: string,
        key: string,
        value: string,
        scope: string,
    };
}

export interface DeleteUserLabelFetch {
    type: typeof DELETE_USER_LABEL_FETCH,
    payload: {
        uid: string,
        key: string,
        scope: string,
    };
}

export interface EditUserLabelFetch {
    type: typeof EDIT_USER_LABEL_FETCH,
    payload: {
        uid: string,
        key: string,
        value: string,
        scope: string,
    };
}

export type LabelAction = AddUserLabelFetch
    | DeleteUserLabelFetch
    | EditUserLabelFetch;

export const addNewLabel = (payload: AddUserLabelFetch['payload']): AddUserLabelFetch => ({
    type: ADD_USER_LABEL_FETCH,
    payload,
});

export const deleteLabel = (payload: DeleteUserLabelFetch['payload']): DeleteUserLabelFetch => ({
    type: DELETE_USER_LABEL_FETCH,
    payload,
});

export const editLabel = (payload: EditUserLabelFetch['payload']): EditUserLabelFetch => ({
    type: EDIT_USER_LABEL_FETCH,
    payload,
});
