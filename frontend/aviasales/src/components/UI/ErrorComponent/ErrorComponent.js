import React from "react";

const errorComponent = (props) => {
    return (
        <div className="error">{props.children}</div>
    );
};

export default errorComponent;
