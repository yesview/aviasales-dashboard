export const numberToString = num => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\xa0");
};

export const parseData = (initialState, data) => {
    const TABS = ["last_hour", "today", "yesterday", "last_3days"];
    const ERROR_TYPES = ["errors", "timeout", "zeroes"];
    const METRIC_TYPES = ["bookings", "searches", "clicks"];
    const SUB_METRICS = {avg_price: "bookings", str: "searches", ctr: "clicks"};
    let newState = {...initialState};
    TABS.forEach(tab => {
        newState.tabs[tab] = {...initialState[tab], fetched: true, errorStat: {}, metrics: {}};
        METRIC_TYPES.forEach(metricType => {
            newState.tabs[tab].metrics[metricType] = {};
        });
    });

    for (let element in data.data[0]) {
        let elementIsUsed = false;
        for (let i = 0; i < ERROR_TYPES.length; i++) {
            let errorType = ERROR_TYPES[i];
            if (element.startsWith(errorType)) {
                for (let j = 0; j < TABS.length; j++) {
                    let tab = TABS[j];
                    if (element.slice(errorType.length + 1) === tab) {
                        newState.tabs[tab].errorStat[errorType] = data.data[0][element];
                        break
                    }
                }
                elementIsUsed = true;
                break
            }
        }
        if (elementIsUsed) continue;

        for (let i = 0; i < METRIC_TYPES.length; i++) {
            let metricType = METRIC_TYPES[i];
            if (element.startsWith(metricType)) {
                for (let j = 0; j < TABS.length; j++) {
                    let tab = TABS[j];
                    let timing = element.split("_")[1];
                    if (element.slice(metricType.length + timing.length + 2) === tab) {
                        newState.tabs[tab].metrics[metricType][timing] = data.data[0][element];
                        break
                    }
                }
                elementIsUsed = true;
                break
            }
        }
        if (elementIsUsed) continue;

        for (let subMetric in SUB_METRICS) {
            if (element.startsWith(subMetric)) {
                for (let i = 0; i < TABS.length; i++) {
                    let tab = TABS[i];
                    if (element.slice(subMetric.length + 1) === tab) {
                        newState.tabs[tab].metrics[SUB_METRICS[subMetric]][subMetric] = data.data[0][element];
                        break
                    }
                }
                break
            }
        }
    }
    return newState
};