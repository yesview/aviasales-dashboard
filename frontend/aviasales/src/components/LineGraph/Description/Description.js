import React from "react"
import PropTypes from "prop-types"

const description = props => {
    const sublines = props.data.map(elem =>
        <div key={elem.code}
             className={"statistic-line-graph__single-event statistic-line-graph__single-event_" + elem.color}>
            <p className="statistic-line-graph__single-event-note">{elem.code === null ? "Other" : "Error " + elem.code}: {elem.count}</p>
        </div>

    );
    return (
        <div className="statistic-line-graph__description">
            {sublines}
        </div>
    )
};

description.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.number,
        count: PropTypes.number.isRequired,
        percentage: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
    })),
};

export default description