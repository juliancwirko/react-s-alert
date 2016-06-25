import React from 'react';
import ReactDOM from 'react-dom';
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
    componentWillMount() {
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
    }
    componentDidMount() {
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

        return React.createElement(contentTemplate, {classNames, id, styles, message, handleClose, customFields});
    }
}

SAlertContent.propTypes = {
    condition: React.PropTypes.string.isRequired,
    message: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.node
    ]),
    position: React.PropTypes.string.isRequired,
    boxPosition: React.PropTypes.string,
    id: React.PropTypes.string.isRequired,
    effect: React.PropTypes.string,
    beep: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.object,
        React.PropTypes.bool
    ]),
    timeout: React.PropTypes.oneOfType([
        React.PropTypes.oneOf(['none']),
        React.PropTypes.number
    ]),
    html: React.PropTypes.bool,
    onClose: React.PropTypes.func,
    onShow: React.PropTypes.func,
    customFields: React.PropTypes.object,
    contentTemplate: React.PropTypes.func
};

export default SAlertContent;
