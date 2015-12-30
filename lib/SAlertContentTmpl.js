import React from 'react';

class SAlertContentTmpl extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={this.props.classNames} id={this.props.id} style={this.props.styles}>
                <div className='s-alert-box-inner'>
                    {this.props.message}
                </div>
                <span className='s-alert-close' onClick={this.props.handleClose}></span>
            </div>
        )
    }
}

SAlertContentTmpl.propTypes = {
    id: React.PropTypes.string.isRequired,
    classNames: React.PropTypes.string.isRequired,
    styles: React.PropTypes.object.isRequired,
    message: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.object
    ]).isRequired,
    handleClose: React.PropTypes.func.isRequired,
    customFields: React.PropTypes.object
};

export default SAlertContentTmpl;