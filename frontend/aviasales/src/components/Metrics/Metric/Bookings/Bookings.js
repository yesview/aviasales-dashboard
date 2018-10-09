import React from "react";
import PropTypes from "prop-types"

import Aux from "../../../../hoc/Aux/Aux"
import { numberToString } from "../../../../utils"

const bookings = (props) => {
    const bookingsData = props.data.bookings;
    const check = bookingsData.avg_price ? numberToString(props.data.bookings.avg_price.toFixed(0)) : "No data";
    const str = bookingsData.str ? props.data.bookings.str.toFixed(2) + "%" : "No data";
    return (
        <Aux>
            <p className="statistic-list-element__info-main">STR: {str}</p>
            <p className="statistic-list-element__info-main">Avg. Check: {check}₽</p>
            <p className="statistic-list-element__info-description">Conversion from clicks to bookings on all
                devices.</p>
            <p className="statistic-list-element__info-help">Help: <a className="small-link" href="">STR</a>, <a
                className="small-link" href="">Bookings</a>, <a className="small-link" href="">Avg. Check</a></p>
        </Aux>
    );
};

bookings.propTypes = {
    data: PropTypes.shape({
        bookings: PropTypes.shape({
            avg_price: PropTypes.number,
            str: PropTypes.number,
        })
    }),
};

export default bookings;
