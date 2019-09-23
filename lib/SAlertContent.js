import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import sAlertTools from './s-alert-parts/s-alert-tools';
import sAlertStore from './s-alert-parts/s-alert-store';
import SAlertContentTmpl from './SAlertContentTmpl';

class SAlertContent extends React.Component {
    constructor(props) {
        super(props);
    }
    handleCloseAlert() {
        let closingTimeout;
        const alertId = this.props.id;
        const currentAlertElem = ReactDOM.findDOMNode(this);
        const animationClose = () => {
            currentAlertElem.style.display = 'none';
            sAlertStore.dispatch({type: 'REMOVE', data: {id: alertId}});
            clearTimeout(closingTimeout);
        };
        if (document.hidden || document.webkitHidden || !currentAlertElem.classList.contains('s-alert-is-effect')) {
            sAlertStore.dispatch({type: 'REMOVE', data: {id: alertId}});
        } else {
            currentAlertElem.classList.remove('s-alert-show');
            closingTimeout = setTimeout(function () {
                currentAlertElem.classList.add('s-alert-hide');
            }, 100);
            currentAlertElem.removeEventListener('webkitAnimationEnd', animationClose, false);
            currentAlertElem.removeEventListener('animationend', animationClose, false);
            currentAlertElem.addEventListener('webkitAnimationEnd', animationClose, false);
            currentAlertElem.addEventListener('animationend', animationClose, false);
        }
        // stop audio when closing
        this.alertAudio && this.alertAudio.load();
    }
    componentDidMount() {
        let beep = this.props.beep;
        let condition = this.props.condition;
        if (beep && typeof beep === 'string') {
            this.alertAudio = new Audio(beep);
            this.alertAudio.load();
            this.alertAudio.play();
        }
        if (beep && typeof beep === 'object' && condition === 'info') {
            this.alertAudio = new Audio(beep.info);
            this.alertAudio.load();
            this.alertAudio.play();
        }
        if (beep && typeof beep === 'object' && condition === 'error') {
            this.alertAudio = new Audio(beep.error);
            this.alertAudio.load();
            this.alertAudio.play();
        }
        if (beep && typeof beep === 'object' && condition === 'success') {
            this.alertAudio = new Audio(beep.success);
            this.alertAudio.load();
            this.alertAudio.play();
        }
        if (beep && typeof beep === 'object' && condition === 'warning') {
            this.alertAudio = new Audio(beep.warning);
            this.alertAudio.load();
            this.alertAudio.play();
        }

        if (typeof this.props.timeout === 'number') {
            this.closeTimer = setTimeout(() => {
                this.handleCloseAlert()
            }, this.props.timeout);
        }
        if (this.props.onShow) {
            this.props.onShow();
        }
    }
    componentWillUnmount() {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
        }
        if (this.props.onClose) {
            this.props.onClose();
        }
    }
    render() {
        const classNames = `s-alert-box s-alert-${this.props.condition} s-alert-${this.props.position} ${this.props.effect ? `s-alert-is-effect s-alert-effect-${this.props.effect}` : ''} s-alert-show`;
        const message = this.props.html ? <span dangerouslySetInnerHTML={{__html: this.props.message}} /> : this.props.message;
        const styles = this.props.boxPosition ? sAlertTools.styleToObj(this.props.boxPosition) : {};
        const id = this.props.id;
        const handleClose = this.handleCloseAlert.bind(this);
        const contentTemplate = this.props.contentTemplate || SAlertContentTmpl;
        const customFields = this.props.customFields || {};
        const condition = this.props.condition

        return React.createElement(contentTemplate, {classNames, id, styles, message, handleClose, customFields, condition});
    }
}

SAlertContent.propTypes = {
    condition: PropTypes.string.isRequired,
    message: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    position: PropTypes.string.isRequired,
    boxPosition: PropTypes.string,
    id: PropTypes.string.isRequired,
    effect: PropTypes.string,
    beep: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.bool
    ]),
    timeout: PropTypes.oneOfType([
        PropTypes.oneOf(['none']),
        PropTypes.number
    ]),
    html: PropTypes.bool,
    onClose: PropTypes.func,
    onShow: PropTypes.func,
    customFields: PropTypes.object,
    contentTemplate: PropTypes.func
};

export default SAlertContent;
