import * as actionTypes from "../actions/actionTypes"

const initialState = {
    tabs: {
        last_hour: {
            fetched: false,
            label: "Last hour",
            componentError: null,
        },
        today: {
            fetched: false,
            label: "Today",
            componentError: null,
        },
        yesterday: {
            fetched: false,
            label: "Yesterday",
            componentError: null,
        },
        last_3days: {
            fetched: false,
            label: "Last 3 days",
            componentError: null,
        },
    },
    activeTab: "yesterday",
    tabsArray: ["last_hour", "today", "yesterday", "last_3days"],
    metricsArray: ["searches", "clicks", "bookings"],
};

const dataReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_ACTIVE: return {...state, activeTab: action.tabId};
        case actionTypes.FETCH_DATA_SUCCESS: return {
            ...state,
            tabs: {
                ...state.tabs, [action.tabId]: {
                    ...state.tabs[action.tabId], ...action.data, fetched: true, componentError: null
                }
            }
        };
        case actionTypes.FETCH_DATA_FAILURE: return {
            ...state,
            tabs: {
                ...state.tabs, [action.tabId]: {
                    ...state.tabs[action.tabId], fetched: false, componentError: action.error
                }
            }
        };
        default: return state
    }
};

export default dataReducer;