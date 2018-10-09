import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import Metric from "./Metric/Metric"

class Metrics extends PureComponent {
    render () {
        let content;
        if (this.props.data === undefined) {
            content = "No data"
        } else {
            content = this.props.metricsArray.map(metricType =>
                <Metric
                    key={metricType}
                    metricType={metricType}
                    data={this.props.data}
                    activeTab={this.props.activeTab}
                    label={this.props.label}
                />
            );
        }
        return (
            <div className="statistic-list">
                {content}
            </div>
        )
    }
}

Metrics.propTypes = {
    activeTab: PropTypes.string.isRequired,
    metricsArray: PropTypes.array.isRequired,
    data: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
};

export default Metrics