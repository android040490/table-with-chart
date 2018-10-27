
import * as Api from 'API';

import {
    FETCH_STUDENTS_START,
    FETCH_STUDENTS_SUCCESS,
    FETCH_STUDENTS_FAILURE,
    CHANGE_EXAM_POINT
} from 'redux-store/actionTypes';

export const getStudents = () => (dispatch) => {
    dispatch({type : FETCH_STUDENTS_START})

    Api.fetchStudents()
        .then( (resp) => {
            dispatch({
                type: FETCH_STUDENTS_SUCCESS,
                payload: resp
            })
        })
        .catch((err) => {
            dispatch({
                type: FETCH_STUDENTS_FAILURE,
                payload: err,
                error: true
            })
        })
}

export const changeExamPoint = (student, examPoint) => (dispatch) => {
    dispatch({
        type : CHANGE_EXAM_POINT,
        payload : {
            student,
            examPoint
        }
    })
}

