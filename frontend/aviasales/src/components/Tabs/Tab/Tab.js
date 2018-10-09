import React from "react"
import PropTypes from "prop-types"

const tab = props => {
    const className = "tabs-collection__single-tab" + (props.isActive ? " tabs-collection__single-tab_active" : "");
    return (
        <div className={className} onClick={props.onClick}>{props.label}</div>
    )
};

tab.propTypes = {
    isActive: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

export default tab