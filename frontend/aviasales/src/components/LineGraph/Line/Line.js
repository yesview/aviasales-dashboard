import React from "react"
import PropTypes from "prop-types"

const line = props => {
    const sublines = props.data.map(elem =>
        <div className={"statistic-line-graph__subline statistic-line-graph__subline_" + elem.color}
            style={{width: elem.percentage + "%"}} key={elem.code}>
        </div>
    );
    return (
        <div className="statistic-line-graph__line">
            {sublines}
        </div>
    )
};

line.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.number,
        count: PropTypes.number.isRequired,
        percentage: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
    })),
};

export default line