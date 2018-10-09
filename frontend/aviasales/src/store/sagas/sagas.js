import { call, put, takeEvery } from 'redux-saga/effects'
import axios from '../../axios-dashboard'

import * as actionTypes from '../actions/actionTypes'

function* fetchData(action) {
    try {
        const activeTabData = yield call(axios.get, "/" + action.activeTab);
        if (activeTabData === undefined) throw new Error("Could not download data.");
        yield put({type: actionTypes.FETCH_DATA_SUCCESS, data: activeTabData.data, tabId: action.activeTab});
    } catch (e) {
        yield put({type: actionTypes.FETCH_DATA_FAILURE, error: e.message, tabId: action.activeTab});
    }
}

function* switchTabs(action) {
    if (action.fetched) {
        yield put({type: actionTypes.CHANGE_ACTIVE, tabId: action.tabId});
    } else {
        try {
            yield put({type: actionTypes.CHANGE_ACTIVE, tabId: action.tabId});
            const response = yield call(axios.get, "/" + action.tabId);
            if (response === undefined) throw new Error("Could not download data.");
            yield put({type: actionTypes.FETCH_DATA_SUCCESS, data: response.data, tabId: action.tabId});
        } catch (e) {
            yield put({type: actionTypes.FETCH_DATA_FAILURE, error: e.message, tabId: action.tabId});
        }
    }
}

export function* dashboardSaga() {
    yield takeEvery(actionTypes.FETCH_DATA, fetchData);
    yield takeEvery(actionTypes.SWITCH_TABS, switchTabs);
}

export default dashboardSaga;
