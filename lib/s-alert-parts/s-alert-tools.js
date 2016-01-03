let actualGlobalConfig;

const sAlertTools = {
    randomId() {
        return Math.random().toString(36).split('.')[1];
    },
    returnFirstDefined(...args) {
        let value;
        let i;
        for (i = 0; i < args.length; i++) {
            if (typeof args[i] !== 'undefined') {
                value = args[i];
                break;
            }
        }
        return value;
    },
    styleToObj(input) {
        let result = {}, i, entry,
            attributes = input && input.split(';').filter(Boolean);

        for (i = 0; i < attributes.length; i++) {
            entry = attributes[i].split(':');
            result[entry.splice(0,1)[0].trim()] = entry.join(':').trim();
        }
        return result;
    },
    setGlobalConfig(config) {
        if (typeof config === 'object') {
            actualGlobalConfig = config;
        }
    },
    getGlobalConfig() {
        return actualGlobalConfig;
    }
};

export default sAlertTools;