import React from "react"
import PropTypes from "prop-types"

const processErrors = value => {
    let result = "";
    if (value === undefined) {
        return "No data";
    } else if (value === null) {
        return "0%";
    } else {
        result = value.toFixed(2) + "%";
        if (result === 0) {
            return "less than 0.01%"
        }
        return result
    }
};

const averageCalculator = {
    last_3days: () => undefined,
    yesterday: average => average / 3,
    today: average => average / 72 * new Date().getHours(),
    last_hour: average => average / 72,
};

const error = props => {
    let average;
    let additionalClass;
    if (props.average.fetched) {
        average = averageCalculator[props.activeTab](props.average.errorStat[props.errType].value);
        additionalClass = props.value > average ? " error-statistic-element_failure" : "";
        average = processErrors(average)
    } else {
        average = "Loading";
        additionalClass = " error-statistic-element_awaiting"
    }

    return (
        <div className={"error-statistic-element" + additionalClass}>
            <p className="error-statistic-element__main-info">{props.label}: {processErrors(props.value)}</p>
            <p className="error-statistic-element__additional-info">Average: {average}</p>
        </div>
    )
};

error.propTypes = {
    label: PropTypes.string.isRequired,
    errType: PropTypes.string.isRequired,
    value: PropTypes.number,
    activeTab: PropTypes.string.isRequired,
    average: PropTypes.shape({
        fetched: PropTypes.bool.isRequired,
        errorStat: PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.number,
        })
    }),
};

export default error