import * as actionTypes from './actionTypes'

export const switchTabs = (tabId, fetched) => {
    return {
        type: actionTypes.SWITCH_TABS,
        tabId: tabId,
        fetched: fetched,
    }
};

export const fetchData = activeTab => {
    return {
        type: actionTypes.FETCH_DATA,
        activeTab: activeTab,
    }
};
