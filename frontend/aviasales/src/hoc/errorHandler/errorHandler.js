import React, { Component } from 'react'

import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Aux/Aux'

const errorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            errorId: 0,
            error: null,
            message: "",
        };

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                const currentErrorId = this.state.errorId;
                this.setState({error: error, message: error.message, errorId: currentErrorId + 1});
                setTimeout(() => (errId => {
                    if (this.state.error !== null && errId === this.state.errorId) {
                        this.setState({...this.state, error: null})
                    }
                })(currentErrorId + 1), 4000)
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor)
        }

        hideErrorHandler = () => {
            this.setState({...this.state, error: null});
        };

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.hideErrorHandler}>
                        {this.state.error || this.state.message ? this.state.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
};

export default errorHandler;