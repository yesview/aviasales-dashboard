import React from "react";
import PropTypes from "prop-types"

import Aux from "../../../../hoc/Aux/Aux"
import clicks from "../Clicks/Clicks";

const searches = props => {
    const searches = props.data.searches;
    const mobile_traffic = searches.mobile_pessimizer ? 100 - +searches.mobile_pessimizer.toFixed(2) + "%" : "unknown";
    const web_traffic = searches.mobile_pessimizer ? 100 - +searches.web_pessimizer.toFixed(2) + "%" : "unknown";
    const note = mobile_traffic === web_traffic ?
        `You get ${mobile_traffic} traffic on mobile and desktop devices.` :
        `You get ${mobile_traffic} traffic on mobile devices and ${web_traffic} on desktop devices.`;
    return (
        <Aux>
            <p className="statistic-list-element__info-main">Mobile traffic: {mobile_traffic}</p>
            <p className="statistic-list-element__info-main">Web traffic: {web_traffic}</p>
            <p className="statistic-list-element__info-description">{note}</p>
            <p className="statistic-list-element__info-help">Help: <a className="small-link" href="">Searches</a>, <a
                className="small-link" href="">Pessimization</a></p>
        </Aux>
    );
};

clicks.propTypes = {
    data: PropTypes.shape({
        searches: PropTypes.shape({
            mobile_pessimizer: PropTypes.number.isRequired,
            web_pessimizer: PropTypes.number.isRequired
        }),
    }),
};

export default searches;

