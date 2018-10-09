import React, { Component } from "react";
import { connect } from "react-redux"

import Aux from "../../hoc/Aux/Aux"
import errorHandler from "../../hoc/errorHandler/errorHandler"
import Tabs from "../../components/Tabs/Tabs"
import Spinner from "../../components/UI/Spinner/Spinner"
import Errors from "../../components/Errors/Errors"
import LineGraph from "../../components/LineGraph/LineGraph"
import Metrics from "../../components/Metrics/Metrics"
import ErrorComponent from "../../components/UI/ErrorComponent/ErrorComponent"

import axios from "../../axios-dashboard"
import * as actions from "../../store/actions/tabs"


class Dashboard extends Component {

    componentDidMount() {
        const activeTab = this.props.data.activeTab;
        const highestTab = this.props.data.tabsArray[this.props.data.tabsArray.length-1];
        if (!this.props.data.tabs[activeTab].fetched) {
            this.props.fetchData(activeTab);
            if (highestTab !== activeTab) {
                this.props.fetchData(highestTab);
            }
        }
    }

    render () {
        const tabsObj = this.props.data.tabs;
        const tabsArray = this.props.data.tabsArray;
        const activeTab = this.props.data.activeTab;
        const highestTab = tabsArray[tabsArray.length-1];
        const tabs = (
            <Tabs
                tabs={tabsObj}
                tabsArray={tabsArray}
                activeTab={activeTab}
                switchTab={(tabId, fetched) => this.props.switchTabs(tabId, fetched)}
            />
        );

        let main_content, errors, lineGraph, metrics;
        if (tabsObj[activeTab].componentError !== null) {
            main_content = <ErrorComponent>{tabsObj[activeTab].componentError}</ErrorComponent>
        }
        else if (!tabsObj[activeTab].fetched) {
            main_content = <Spinner />
        } else {
            errors = !tabsObj[activeTab].errorStat ? <ErrorComponent>Did not get error statistic</ErrorComponent> : (
                <Errors
                    errors={tabsObj[activeTab].errorStat}
                    average={{fetched: tabsObj[highestTab].fetched, errorStat: tabsObj[highestTab].errorStat}}
                    activeTab={activeTab}
                />
            );
            lineGraph = !tabsObj[activeTab].errors ? <ErrorComponent>Did not get error statistic</ErrorComponent> : (
                <LineGraph
                    errors={tabsObj[activeTab].errors}
                    activeTab={activeTab}
                />
            );
            metrics = !tabsObj[activeTab].metrics ? <ErrorComponent>Did not get data to show metric</ErrorComponent> : (
                <Metrics
                    data={tabsObj[activeTab].metrics}
                    label={tabsObj[activeTab].label}
                    metricsArray={this.props.data.metricsArray}
                    activeTab={activeTab}
                />
            );
            main_content = (
                <Aux>
                    {errors}
                    {lineGraph}
                    {metrics}
                </Aux>
            )
        }


        return (
            <div className="main">
                <h1 className="main-header">Main metrics</h1>
                {tabs}
                {main_content}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        switchTabs: (tabId, fetched) => dispatch(actions.switchTabs(tabId, fetched)),
        fetchData: activeTab => dispatch(actions.fetchData(activeTab))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(Dashboard, axios));