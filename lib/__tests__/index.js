import {mount, configure} from 'enzyme';
import {expect} from 'chai';

import React from 'react';
import ReactDOM from 'react-dom';
import Alert from '../SAlert';
import sAlertStore from '../s-alert-parts/s-alert-store';
import SAlertContent from '../SAlertContent';
import SAlertContentTmpl from '../SAlertContentTmpl';
import getAlertData from '../s-alert-parts/s-alert-data-prep';
import sAlertTools from '../s-alert-parts/s-alert-tools';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Alert warning function', () => {
    let renderedComp;
    before(() => {
        renderedComp = mount(<Alert />);
        Alert.warning('Test warning message...', {timeout: 'none', stack: true, position: 'top-right'});
    });

    it('should be s-alert warning in the s-alert store', () => {
        expect(sAlertStore.getState()[0].message).to.equal('Test warning message...');
        expect(sAlertStore.getState()[0].condition).to.equal('warning');
    });
    it('should be ".s-alert-warning" element in the DOM', () => {
        expect(renderedComp.find('.s-alert-warning').length).to.be.equal(1);
    });

    after(() => Alert.closeAll());
});

describe('Alert info function', () => {
    let renderedComp;
    before(() => {
        renderedComp = mount(<Alert />);
        Alert.info('Test info message...', {timeout: 'none', stack: true, position: 'top-right'});
    });

    it('should be s-alert info in the s-alert store', () => {
        expect(sAlertStore.getState()[0].message).to.equal('Test info message...');
        expect(sAlertStore.getState()[0].condition).to.equal('info');
    });
    it('should be ".s-alert-info" element in the DOM', () => {
        expect(renderedComp.find('.s-alert-info').length).to.be.equal(1);
    });

    after(() => Alert.closeAll());
});

describe('Alert success function', () => {
    let renderedComp;
    before(() => {
        renderedComp = mount(<Alert />);
        Alert.success('Test success message...', {timeout: 'none', stack: true, position: 'top-right'});
    });

    it('should be s-alert success in the s-alert store', () => {
        expect(sAlertStore.getState()[0].message).to.equal('Test success message...');
        expect(sAlertStore.getState()[0].condition).to.equal('success');
    });
    it('should be ".s-alert-success" element in the DOM', () => {
        expect(renderedComp.find('.s-alert-success').length).to.be.equal(1);
    });

    after(() => Alert.closeAll());
});

describe('Alert error function', () => {
    let renderedComp;
    before(() => {
        renderedComp = mount(<Alert />);
        Alert.error('Test error message...', {timeout: 'none', stack: true, position: 'top-right'});
    });

    it('should be s-alert error in the s-alert store', () => {
        expect(sAlertStore.getState()[0].message).to.equal('Test error message...');
        expect(sAlertStore.getState()[0].condition).to.equal('error');
    });
    it('should be ".s-alert-error" element in the DOM', () => {
        expect(renderedComp.find('.s-alert-error').length).to.be.equal(1);
    });

    after(() => Alert.closeAll());
});

describe('sAlert close function by alert id', () => {
    let renderedComp;
    let sAlertId;

    before(() => {
        renderedComp = mount(<Alert />);
        sAlertId = Alert.success('Test success message...', {timeout: 'none', stack: true, position: 'top-right'});
    });

    it('should be s-alert in store and element in DOM', () => {
        let alerts = sAlertStore.getState().slice().filter(a => a.id === sAlertId);
        expect(alerts.length).to.not.equal(0);
        expect(renderedComp.find('.s-alert-box').length).to.be.equal(1);
    });
    it('should be no s-alert in store after Alert.close function is called', () => {
        Alert.close(sAlertId);
        let alerts = sAlertStore.getState().slice().filter(a => a.id === sAlertId);
        expect(alerts.length).to.equal(0);
    });
    it('should be no s-alert element in the DOM after sAlert.close function is called', () => {
        expect(renderedComp.find('.s-alert-box').length).to.be.equal(0);
    });

    after(() => Alert.closeAll());
});


describe('sAlert 1000ms timeout', () => {
    let renderedComp;
    let sAlertId;

    before((done) => {
        renderedComp = mount(<Alert />);
        sAlertId = Alert.success('Test success message...', {timeout: 1000, stack: true, position: 'top-right'});
        setTimeout(() => {
            done();
        }, 1500);
    });

    it('should not be s-alert document in the collection after 1500ms', (done) => {
        let alerts = sAlertStore.getState().slice().filter(a => a.id === sAlertId);
        expect(alerts.length).to.equal(0);
        done();
    });

    after(() => Alert.closeAll());
});

describe('sAlert position bottom-left', () => {
    let renderedComp;
    let sAlertId;

    before(() => {
        renderedComp = mount(<Alert />);
        sAlertId = Alert.success('Test position...', {position: 'bottom-left', timeout: 'none'});
    });

    it('should have s-alert-bottom-left class', () => {
        expect(renderedComp.find('.s-alert-bottom-left')).to.have.length(1);
    });
    it('should have document with position bottom-left in the store', () => {
        let alerts = sAlertStore.getState().slice().filter(a => a.id === sAlertId);
        expect(alerts[0].position).to.equal('bottom-left');
    });

    after(() => Alert.closeAll());
});

describe('sAlert global position config', () => {
    let renderedComp;
    let sAlertId;

    before(() => {
        renderedComp = mount(<Alert position='bottom-right' timeout='none' />);
        sAlertId = Alert.success('Test global position...');
    });

    it('should have s-alert-bottom-right class', () => {
        expect(renderedComp.find('.s-alert-bottom-right')).to.have.length(1);
    });

    after(() => Alert.closeAll());
});

describe('sAlert position full width top', () => {
    let renderedComp;
    let sAlertId;

    before(() => {
        renderedComp = mount(<Alert />);
        sAlertId = Alert.success('Test position...', {position: 'top', timeout: 'none'});
    });

    it('should have s-alert-top class', () => {
        expect(renderedComp.find('.s-alert-top')).to.have.length(1);
    });
    it('should have document with position top in the store', () => {
        let alerts = sAlertStore.getState().slice().filter(a => a.id === sAlertId);
        expect(alerts[0].position).to.equal('top');
    });

    after(() => Alert.closeAll());
});

describe('sAlert offset', () => {
    let renderedComp;
    let sAlertId;

    before(() => {
        renderedComp = mount(<Alert />);
        sAlertId = Alert.success('Test position...', {position: 'top', timeout: 'none', offset: 100});
    });
    it('should have document with offset in the store', () => {
        let alerts = sAlertStore.getState().slice().filter(a => a.id === sAlertId);
        expect(alerts[0].offset).to.equal(100);
    });

    after(() => Alert.closeAll());
});

describe('sAlert stack', () => {
    let renderedComp;
    let sAlertId;

    before(() => {
        renderedComp = mount(<Alert />);
        sAlertId = Alert.success('Test position...', {position: 'top', timeout: 'none', stack: true});
    });
    it('should have document with stack in the store', () => {
        let alerts = sAlertStore.getState().slice().filter(a => a.id === sAlertId);
        expect(alerts[0].stack).to.be.true;
    });

    after(() => Alert.closeAll());
});

describe('sAlert onShow function callback', () => {
    let renderedComp;
    let sAlertId1;
    let isShowed1 = false;

    before(() => {
        renderedComp = mount(<Alert />);
        sAlertId1 = Alert.success('Test position...', {
            position: 'top',
            timeout: 'none',
            onShow: () => {
                isShowed1 = true
            }
        });
    });
    it('should get called when specifically openning the alert', () => {
        expect(isShowed1).to.be.true;
    });

    after(() => Alert.closeAll());
});


describe('sAlert onClose function callback', () => {
    let renderedComp;
    let sAlertId1;
    let sAlertId2;
    let isClosed1 = false;
    let isClosed2 = false;

    before(() => {
        renderedComp = mount(<Alert />);
        sAlertId1 = Alert.success('Test position...', {
            position: 'top',
            timeout: 'none',
            onClose: () => {
                isClosed1 = true
            }
        });
        sAlertId2 = Alert.success('Test position...', {
            position: 'top',
            timeout: 'none',
            onClose: () => {
                isClosed2 = true
            }
        });
    });
    it('should get called when specifically closing the alert', () => {
        Alert.close(sAlertId1);
        expect(isClosed1).to.be.true;
        expect(isClosed2).to.be.false;
    });

    after(() => Alert.closeAll());
});

describe('sAlert tools', () => {
    it('should generate random id', () => {
        let random1 = sAlertTools.randomId();
        let random2 = sAlertTools.randomId();
        expect(random1).to.not.be.equal(random2);
    });
    it('should return first defined value', () => {
        expect(sAlertTools.returnFirstDefined(undefined, false, 0)).to.be.equal(false);
        expect(sAlertTools.returnFirstDefined(undefined, undefined, 0)).to.be.equal(0);
        expect(sAlertTools.returnFirstDefined(1, undefined, 0)).to.be.equal(1);
    });
    it('should return styles object from string', () => {
        let styleObj = sAlertTools.styleToObj('color: red; width: 100px');
        expect(styleObj).to.be.an.instanceof(Object);
        expect(styleObj).to.have.property('color', 'red');
        expect(styleObj).to.have.property('width', '100px');
    });
});