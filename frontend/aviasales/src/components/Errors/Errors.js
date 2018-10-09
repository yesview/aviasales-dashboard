import React, { Component } from "react"
import PropTypes from "prop-types"

import Error from "./Error/Error"

class Errors extends Component {

    shouldComponentUpdate(nextProps) {
        return this.props.activeTab !== nextProps.activeTab || this.props.average.fetched !== nextProps.average.fetched;
    }

    render () {
        const errors = Object.keys(this.props.errors).map(errType =>
            <Error
                label={this.props.errors[errType].label}
                value={this.props.errors[errType].value}
                average={this.props.average}
                errType={errType}
                key={errType}
                activeTab={this.props.activeTab}
            />
        );

        return (
            <div className="error-statistic">
                {errors}
            </div>
        )
    }
}

Errors.propTypes = {
    errors: PropTypes.objectOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.number,
    })),
    average: PropTypes.shape({
        fetched: PropTypes.bool.isRequired,
        errorStat: PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.number,
        })
    }),
    activeTab: PropTypes.string.isRequired,
};

export default Errors