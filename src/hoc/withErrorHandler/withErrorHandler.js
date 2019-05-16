import React, { Component }from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }
        //componentWillMount
        componentDidMount () {
            this.reqInterceptor = axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request
            });
            this.resInterceptor = axios.interceptors.response.use(request => request,error => {
                this.setState({error: error})
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor)
        }

        errorConfirmHandler = () => {
            this.setState({error: null});
        }
        render () {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmHandler}>
                        {this.state.error ? this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }

    } 
}

export default withErrorHandler;