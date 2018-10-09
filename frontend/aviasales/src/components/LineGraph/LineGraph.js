import React, { PureComponent } from "react"
import PropTypes from 'prop-types'

import Aux from "../../hoc/Aux/Aux"
import Line from "./Line/Line"
import Description from "./Description/Description"

const COLORS = ["yellow", "purple", "blue"];
const COLOR_FOR_OTHER = "grey";

const generatePercentage = arr => {
    let others;
    let errors = arr.filter(elem => {
        if (elem.code === null) {
            others = elem;
            return false
        }
        return true
    });
    errors.sort((a, b) => b - a);
    const total = arr.reduce((curr, elem) => curr + elem.count, 0);
    errors.push(others);
    // We don't want to mutate the original props, so we will make a new array and
    // push in this array copies of error objects with some additional properties
    let newErrors = [];
    errors.forEach((elem, index) => {
        let newElem = {...elem};
        newElem.percentage = Math.ceil((100 * newElem.count / total));
        newElem.color = newElem.code === null ? COLOR_FOR_OTHER : COLORS[index];
        newErrors.push(newElem)
    });
    return newErrors
};

class LineGraph extends PureComponent {

    render () {
        return (
            <Aux>
                {this.props.errors && this.props.errors.length ? (
                    <div className="statistic-line-graph">
                        <Line data={generatePercentage(this.props.errors)} />
                        <Description data={generatePercentage(this.props.errors)} />
                    </div>
                ) : null}
            </Aux>
        )
    }
}

LineGraph.propTypes = {
    errors: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.number,
        count: PropTypes.number.isRequired,
    })),
    activeTab: PropTypes.string.isRequired,
};

export default LineGraph