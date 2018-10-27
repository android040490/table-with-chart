import R from 'ramda';

import {
    FETCH_STUDENTS_START,
    FETCH_STUDENTS_SUCCESS,
    FETCH_STUDENTS_FAILURE,
    CHANGE_EXAM_POINT
} from 'redux-store/actionTypes';

const initState = {
    ids: [],
    entities: {},
    loading: false,
    errorData: {}
};

export default function(state = initState, {type, payload, error}){
    switch (type) {
        case FETCH_STUDENTS_START:
            return {
                ...state,
                loading: true
            }

        case FETCH_STUDENTS_SUCCESS:

            return {
                ...state,
                loading: false,
                entities: R.indexBy(R.prop('name'), payload),
                ids: R.pluck('name', payload)
            }

        case FETCH_STUDENTS_FAILURE:
            
            return {
                ...state,
                loading: false,
                errorData: payload
            }

        case CHANGE_EXAM_POINT:
            let {student, examPoint} = payload
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [student] : R.assocPath(['exam', 'point'], examPoint, state.entities[student])
                }
            }
        default:
            return state
    }
}