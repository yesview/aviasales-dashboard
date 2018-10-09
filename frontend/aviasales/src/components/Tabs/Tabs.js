import React from "react"
import PropTypes from "prop-types"

import Tab from "./Tab/Tab"

const tabs = props => {
    const tabs = props.tabsArray.map(
        tabName => <Tab
            label={props.tabs[tabName].label}
            key={tabName}
            id={tabName}
            isActive={props.activeTab === tabName}
            onClick={() => props.switchTab(tabName, props.tabs[tabName].fetched)}
        />
    );
    return (
        <div className="tabs-collection">
            {tabs}
        </div>
    )
};

tabs.propTypes = {
    tabsArray: PropTypes.arrayOf(PropTypes.string).isRequired,
    tabs: PropTypes.objectOf(PropTypes.shape({
        fetched: PropTypes.bool.isRequired,
        label: PropTypes.string.isRequired,
    })),
    activeTab: PropTypes.string.isRequired,
};

export default tabs