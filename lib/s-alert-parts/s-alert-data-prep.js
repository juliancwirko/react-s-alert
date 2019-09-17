import React from 'react';
import ReactDOM from 'react-dom';
import SAlertContent from '../SAlertContent';
import sAlertStore from './s-alert-store';
import sAlertTools from './s-alert-tools';

const getAlertData = function (sAlertPosition) {
    let positionTop = 0;
    let positionBottom = 0;
    let padding = 0;
    let alerts = {};
    let style;
    let docElement;
    let positionTypeTop;
    let positionTypeBottom;
    let checkFirst = function (type, objId) {
        const collectionOfType = sAlertCollection.filter(obj => obj.position === type || sAlertGlobalConfig.position === type);
        return collectionOfType && collectionOfType[0].id === objId;
    };
    let positionFunc = function (position, positionType, alert, sAlertComputedStyle) {
        padding = aStack.spacing || parseInt(sAlertComputedStyle[positionType]);
        if (checkFirst(aPosition, alert.id) && aOffset) {
            position = parseInt(aOffset);
        }
        if (!(checkFirst(aPosition, alert.id) && aStack.spacing)) {
            position = position + parseInt(padding);
        }
        style = positionType + ': ' + position + 'px;';
        position = position + parseInt(sAlertComputedStyle['height']);
        return position;
    };

    let sAlertGlobalConfig = sAlertTools.getGlobalConfig();
    let aStack;
    let aContentTemplate;
    let aOffset;
    let aMessage;
    let aHtml;
    let aCustomFields;
    let aPosition;

    let query = {};
    if (sAlertPosition === 'left') {
        query = item => (item.position === 'top-left' || item.position === 'bottom-left') || (!item.position && (sAlertGlobalConfig.position === 'top-left' || sAlertGlobalConfig.position === 'bottom-left'));
    }
    if (sAlertPosition === 'right') {
        query = item => (item.position === 'top-right' || item.position === 'bottom-right') || (!item.position && (sAlertGlobalConfig.position === 'top-right' || sAlertGlobalConfig.position === 'bottom-right'));
    }
    if (sAlertPosition === 'full-top') {
        query = item => item.position === 'top' || (!item.position && sAlertGlobalConfig.position === 'top');
    }
    if (sAlertPosition === 'full-bottom') {
        query = item => item.position === 'bottom' || (!item.position && sAlertGlobalConfig.position === 'bottom');
    }

    let currentState = sAlertStore.getState();
    let sAlertCollection = currentState.slice().filter(query);

    return sAlertCollection.map(alert => {
        aStack = sAlertGlobalConfig.stack;
        aContentTemplate = sAlertGlobalConfig.contentTemplate;
        aOffset = sAlertTools.returnFirstDefined(alert.offset, sAlertGlobalConfig.offset);
        aMessage = sAlertTools.returnFirstDefined(alert.message, sAlertGlobalConfig.message);
        aHtml = sAlertTools.returnFirstDefined(alert.html, sAlertGlobalConfig.html);
        aCustomFields = sAlertTools.returnFirstDefined(alert.customFields, sAlertGlobalConfig.customFields);
        aPosition = sAlertTools.returnFirstDefined(alert.position, sAlertGlobalConfig.position);
        positionTypeTop = (aPosition) && /top/g.test(aPosition);
        positionTypeBottom = (aPosition) && /bottom/g.test(aPosition);
        if (aStack) {
            // checking alert box height - needed to calculate position
            docElement = document.createElement('div');
            docElement.classList.add('s-alert-box-height');

            // mock element, needed for positions calculations
            let reactElement = React.createElement(SAlertContent, {
                key: sAlertTools.randomId(),
                id: sAlertTools.randomId(),
                condition: alert.condition,
                message: aMessage,
                position: aPosition,
                effect: alert.effect,
                boxPosition: alert.boxPosition,
                beep: false,
                timeout: 'none',
                html: aHtml,
                contentTemplate: aContentTemplate,
                customFields: aCustomFields
            });
            let reactComponent = ReactDOM.createPortal(reactElement, docElement);

            document.body.appendChild(docElement);
            const sAlertComputedStyle = getComputedStyle(ReactDOM.findDOMNode(reactComponent));
            if (positionTypeTop) {
                positionTop = positionFunc(positionTop, 'top', alert, sAlertComputedStyle);
            }
            if (positionTypeBottom) {
                positionBottom = positionFunc(positionBottom, 'bottom', alert, sAlertComputedStyle);
            }
            if (sAlertPosition === 'left') {
                style = style + 'left: ' + (aStack.spacing || parseInt(sAlertComputedStyle.left)) + 'px;';
            }
            if (sAlertPosition === 'right') {
                style = style + 'right: ' + (aStack.spacing || parseInt(sAlertComputedStyle.right)) + 'px;';
            }
            alerts = Object.assign({}, alert, {boxPosition: style});
            ReactDOM.unmountComponentAtNode(docElement);
            docElement.parentNode.removeChild(docElement);
        } else if (aOffset && positionTypeTop) {
            alerts = Object.assign({}, alert, {boxPosition: 'top: ' + parseInt(aOffset) + 'px;'});
        } else if (aOffset && positionTypeBottom) {
            alerts = Object.assign({}, alert, {boxPosition: 'bottom: ' + parseInt(aOffset) + 'px;'});
        } else {
            alerts = alert;
        }
        return alerts;
    });
};

export default getAlertData;
