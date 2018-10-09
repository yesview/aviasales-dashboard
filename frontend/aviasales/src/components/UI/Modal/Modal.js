import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux'

class Modal extends Component{

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }

    render() {
        return(
            <Aux>
                <div
                    className="modal"
                    style={{
                        transform: this.props.show ? 'translateX(0)' : 'translateX(100vw)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    <div className="modal__close" onClick={this.props.modalClosed}></div>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal;
