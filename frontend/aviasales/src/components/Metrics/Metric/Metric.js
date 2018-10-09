import React from "react"
import PropTypes from "prop-types"

import Searches from "./Searches/Searches"
import Clicks from "./Clicks/Clicks"
import Bookings from "./Bookings/Bookings"
import { numberToString } from "../../../utils"


const metricTypes = {
    searches: data => <Searches data={data}/>,
    clicks: data => <Clicks data={data}/>,
    bookings: data => <Bookings data={data}/>
};

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

const previousNote = {
    last_3days: () => {
        let date = new Date();
        date.setDate(date.getDate()-1);
        let dayIndexes = [];
        for (let i = 0; i < 3; i++) {
            dayIndexes[i] = date.getDay()-i >= 0 ? date.getDay()-i : days.length - (date.getDay()-i * -1)
        }
        return `Last ${days[dayIndexes[2]]}, ${days[dayIndexes[1]]} and ${days[dayIndexes[0]]}`
    },
    yesterday: () => {
        let date = new Date();
        date.setDate(date.getDate()-1);
        return `Last ${days[date.getDay()]}`;
    },
    today: () => {
        let date = new Date();
        return `Last ${days[date.getDay()]} 00:00-${new Date().getHours()}:00`
    },
    last_hour: () => {
        let date = new Date();
        let fullCurrentHours = new Date().getHours();
        let day;
        let startingHours;
        if (fullCurrentHours === 0) {
            day = days[date.getDay()-1 >= 0 ? date.getDay()-1 : days.length - ((date.getDay()-1) * -1)];
            startingHours = 23;
        } else {
            day = days[date.getDay()];
            startingHours = fullCurrentHours-1
        }
        return `Last ${day} ${startingHours}:00-${fullCurrentHours}:00`
    }
};

const metric = props => {
    const previous = props.data[props.metricType].previous;
    const current = props.data[props.metricType].current;
    const diff = ((100 * current) / previous - 100).toFixed(0);
    const activeTab = props.activeTab;
    const diffBlock = diff === 0 ? null : (
        <p className={"statistic-list-element__diff" + (diff < 0 ? " statistic-list-element__diff_failure" : "")}>
            {diff < 0 ? "-" + diff * -1 : "+" + diff}%
        </p>
    );
    return (
        <div className="statistic-list-element">
            <div className="statistic-list-element__logo-block">
                <div className={`semaphore-image semaphore-image__${props.metricType}`}>
                    <div className={"semaphore-image__semaphore" + (diff < 0 ? " semaphore-image__semaphore_failure" : "")}></div>
                </div>
            </div>
            <div className="statistic-list-element__body-wrap">
                <div className="statistic-list-element__main-info-wrap">
                    <div className="statistic-list-element__metrics-name-wrap">
                        <p className="statistic-list-element__metrics-name">{props.data[props.metricType].label}</p>
                        {diffBlock}
                    </div>
                    <div className="statistic-list-element__metrics-value-wrap" style={numberToString(current).toString().length > 11 ? {flexWrap: "wrap"} : {}}>
                        <p className="statistic-list-element__metrics-value">{numberToString(current)}</p>
                        <p className="statistic-list-element__metrics-time">{props.label}</p>
                    </div>
                    <div className="statistic-list-element__metrics-value-wrap"
                         style={numberToString(previous).toString().length > 11 ? {flexWrap: "wrap"} : {}}
                    >
                        <p className="statistic-list-element__metrics-value statistic-list-element__metrics-value_transparent">
                            {numberToString(previous)}
                        </p>
                        <p className="statistic-list-element__metrics-time statistic-list-element__metrics-time_transparent">
                            {previousNote[activeTab]()}
                        </p>
                    </div>
                </div>
                <div className="statistic-list-element__info-wrap">
                    {metricTypes[props.metricType](props.data)}
                </div>
            </div>
        </div>
    )
};

metric.propTypes = {
    activeTab: PropTypes.string.isRequired,
    metricType: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    data: PropTypes.objectOf(PropTypes.shape({
        previous: PropTypes.number.isRequired,
        current: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired
    })),
};

export default metric
