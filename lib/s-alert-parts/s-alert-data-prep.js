import sAlertStore from './s-alert-store';
import sAlertTools from './s-alert-tools';

const getAlertData = function (sAlertPosition) {
    let sAlertGlobalConfig = sAlertTools.getGlobalConfig();

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

    return sAlertCollection;
};

export default getAlertData;
