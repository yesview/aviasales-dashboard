import React from "react";
import PropTypes from "prop-types"

import Aux from "../../../../hoc/Aux/Aux"

const FAILURE_CTR = 1;

const clicks = (props) => {
    const clicksData = props.data.clicks;
    const searchesData = props.data.searches;
    let ctr, failure;
    if (clicksData.ctr) {
        ctr = clicksData.ctr.toFixed(2);
        failure = ctr < FAILURE_CTR ? " statistic-list-element__info-main_failure" : "";
        ctr += "%"
    } else if (clicksData.current && searchesData.current) {
        ctr = ((clicksData.current / searchesData.current) * 100).toFixed(2);
        failure = ctr < FAILURE_CTR ? " statistic-list-element__info-main_failure" : "";
        ctr += "%"
    } else {
        ctr = "No data";
    }
    return (
        <Aux>
            <p className={"statistic-list-element__info-main" + failure}>CTR: {ctr}</p>
            <p className="statistic-list-element__info-description">Conversion from searches to clicks on all
                devices.</p>
            <p className="statistic-list-element__info-help">Help: <a className="small-link" href="">CTR</a>, <a
                className="small-link" href="">Clicks</a></p>
        </Aux>
    );
};

clicks.propTypes = {
    data: PropTypes.shape({
        clicks: PropTypes.shape({current: PropTypes.number.isRequired}),
        searches: PropTypes.shape({current: PropTypes.number.isRequired}),
    }),
};

export default clicks;
