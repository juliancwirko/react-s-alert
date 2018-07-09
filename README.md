# React sAlert component

sAlert is a React component which provides alerts or notifications with rich configuration possibilities.
This is a rewritten version of Meteor/Blaze sAlert package which you can find here: [s-alert.meteor.com](http://s-alert.meteor.com).

## Demo

The demo website and provided source code are the best learning resources.

- [live demo app](http://react-s-alert.jsdemo.be/)
- [demo app source code](https://github.com/juliancwirko/react-s-alert-demo)

## Usage with React

Here is what you need to do to make it work.
**Of course you need to have React and ReactDOM installed in your project.**

### 1. Install the package

```
npm install react-s-alert --save
```

### 2. Import component

With ES2015:
```
import Alert from 'react-s-alert';
```

With ES5:
```
var Alert = require('react-s-alert').default;
```

### 3. Import (or copy) CSS files

All you need to do is to import (or copy) a default CSS file and some or all CSS files with effects which you want to use. A default CSS file is mandatory. With Webpack you could do something like:

With ES2015:
```javascript
// mandatory
import 'react-s-alert/dist/s-alert-default.css';

// optional - you can choose the effect you want
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
```

With ES5:
```javascript
// mandatory
require('react-s-alert/dist/s-alert-default.css');

// optional - you can choose the effect you want
require('react-s-alert/dist/s-alert-css-effects/slide.css');
require('react-s-alert/dist/s-alert-css-effects/scale.css');
require('react-s-alert/dist/s-alert-css-effects/bouncyflip.css');
require('react-s-alert/dist/s-alert-css-effects/flip.css');
require('react-s-alert/dist/s-alert-css-effects/genie.css');
require('react-s-alert/dist/s-alert-css-effects/jelly.css');
require('react-s-alert/dist/s-alert-css-effects/stackslide.css');
```

CDN:
- https://cdn.jsdelivr.net/npm/react-s-alert@1.4.1/dist/s-alert-default.css
- https://cdn.jsdelivr.net/npm/react-s-alert@1.4.1/dist/s-alert-css-effects/bouncyflip.css
- https://cdn.jsdelivr.net/npm/react-s-alert@1.4.1/dist/s-alert-css-effects/flip.css
- https://cdn.jsdelivr.net/npm/react-s-alert@1.4.1/dist/s-alert-css-effects/genie.css
- https://cdn.jsdelivr.net/npm/react-s-alert@1.4.1/dist/s-alert-css-effects/jelly.css
- https://cdn.jsdelivr.net/npm/react-s-alert@1.4.1/dist/s-alert-css-effects/scale.css
- https://cdn.jsdelivr.net/npm/react-s-alert@1.4.1/dist/s-alert-css-effects/slide.css
- https://cdn.jsdelivr.net/npm/react-s-alert@1.4.1/dist/s-alert-css-effects/stackslide.css

(you can change versions in URL if needed)


You can also copy the files and include it another way in your app. It depends on your workflow.

**If you are using CSS Modules for now you need to import these files globally.** (You can check the demo website Webpack config file).

### 4. Place sAlert component in your main app component

You need to place the main sAlert container. The best place for it is at the end of your main app component. For Example:

```javascript
import React from 'react';
import {Router} from 'react-router';
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <span>
                    {this.props.children}
                </span>
                <Alert stack={{limit: 3}} />
            </div>
        )
    }
}

export default Main;
```

### 5. Make calls to activate alerts

You can activate your alerts in many different places in the app. You need to call proper methods. For Example:

Methods which you can use:

- **Alert.warning(message, configObj)**
- **Alert.error(message, configObj)**
- **Alert.info(message, configObj)**
- **Alert.success(message, configObj)**
- **Alert.close(alertId)**
- **Alert.closeAll()**

sAlert methods will return the already created alertId.

Example usage:
```javascript
import React from 'react';
import Alert from 'react-s-alert';

class Home extends React.Component {
    handleClick1(e) {
        e.preventDefault();
        Alert.warning('<h1>Test message 1</h1>', {
            position: 'top-right',
            effect: 'scale',
            onShow: function () {
                console.log('aye!')
            },
            beep: false,
            timeout: 'none',
            offset: 100
        });
    }
    handleClick2(e) {
        e.preventDefault();
        Alert.info('Test message 2', {
            position: 'bottom-left',
            effect: 'bouncyflip',
            timeout: 'none'
        });
    }
    handleClick3(e) {
        e.preventDefault();
        Alert.error('Test message 3', {
            position: 'bottom-right',
            effect: 'slide',
            timeout: 'none'
        });
    }
    handleCloseAll(e) {
        e.preventDefault();
        Alert.closeAll();
    }
    render() {
        return (
            <div>
                <div>
                    <a href="#" onClick={this.handleClick1}>Click 1</a> |
                    <a href="#" onClick={this.handleClick2}>Click 2</a> |
                    <a href="#" onClick={this.handleClick3}>Click 3</a> |
                    <a href="#" onClick={this.handleCloseAll}>Close All</a>
                </div>
            </div>
        )
    }
}

export default Home;
```

You always need to provide a `message`. For example

```javascript
Alert.error('Test message 3');
```

You can also provide a react component:

```javascript
Alert.error(<MyComponent props1={props1} props2={props2}/>);
```

You don't need to provide the configuration object here, just remember to provide it globally.

## Configuration details

With sAlert you can place your configuration as a global config in the main sAlert container, for example:

```javascript
<Alert stack={{limit: 3}} html={true} />
```

You can also overwrite these global settings in the particular method call. For example, here we will overwrite the global settings for 'html' in our error alert call:

```javascript
Alert.error('Error message...', {
    position: 'bottom-right',
    effect: 'slide',
    html: false
});
```

### All possible configuration options:

#### First - only global configuration options
You can set it up only in the main sAlert component props

##### 1. `stack`
You can stack your alerts or just display them in the same place.

Possible stack values:

- **true** or **false**
- object with:
    - **limit** (you can limit your alerts displayed on screen)
    - **spacing** (you can change the space around your alerts)

Examples:
```javascript
<Alert stack={{limit: 3, spacing: 50}} />
```
or
```javascript
<Alert stack={true} />
```

##### 2. `contentTemplate`
You can prepare your own content template even with additional fields (More details can be found later on in this README.)

Examples:

```javascript
<Alert contentTemplate={MyContentTemplate} />
```

Here you can also use all configuration options listed below.

#### Configuration options with a single sAlert method call

##### 1. `effect`
You can provide the name of the animations effect, you also need to import proper CSS file.

Example:

In method call:
```javascript
Alert.success('Message...', {
    effect: 'genie'
});
```

In global config:
```javascript
<Alert effect='genie' />
```

Possible effects names:

- **slide**
- **scale**
- **bouncyflip**
- **flip**
- **genie**
- **jelly**
- **stackslide**

Remember that you need to import the CSS files for the effects. See above.

##### 2. `position`
Where the alert should appear.

Example:

In method call:
```javascript
Alert.success('Message...', {
    position: 'top-right'
});
```

In global config:
```javascript
<Alert position='top-right' />
```

Possible positions:

- **top** (full width)
- **bottom** (full width)
- **top-right**
- **top-left**
- **bottom-right**
- **bottom-left**


##### 3. `timeout`

You can set up the timeout in ms.

Example:

In method call:
```javascript
Alert.success('Message...', {
    timeout: 5000
});
```

In global config:
```javascript
<Alert timeout={5000} />
```

Possible timeout values:

- **(Number - ms)**
- **'none'**

##### 4. `html`

You can configure if your alert should display HTML formated messages.

Example:

In method call:
```javascript
Alert.success('<h1>Message...</h1>', {
    html: true
});
```

In global config:
```javascript
<Alert html={true} />
```

Possible 'html' values:

- **true**
- **false**

##### 5. `offset`

In px. Will be added to first alert (bottom or top - depends on the position in config).

Example:

In method call:
```javascript
Alert.success('Message...', {
    offset: 150
});
```

In global config:
```javascript
<Alert offset={150} />
```

Possible offset values:

- **(Number - px)**

##### 6. `beep`

You can set up your audio 'beeps'. Just configure your audio file path. (.mp3 files should work in every browser.) You can also configure 4 paths for 4 conditions.

**There is no default audio sample in the package.**
You should use sound samples which you know that you have the right to use it.

Example:

In method call:
```javascript
Alert.success('Message...', {
    beep: '/path-to-audio/file.mp3'
});
```

In global config:
```javascript
<Alert beep={{
    info: '/path-to-audio/file-info.mp3',
    error: '/path-to-audio/file-error.mp3',
    warning: '/path-to-audio/file-warning.mp3',
    success: '/path-to-audio/file-success.mp3'}} />
```
or just one for all:

```javascript
<Alert beep='/path-to-audio/file.mp3' />
```

Possible 'beep' values:

- **(String - audio file path)** (one audio file for all alerts)
- **(Object)**
    - {info: '/path/file.mp3', error: '/path/file.mp3', warning: '/path/file.mp3', success: '/path/file.mp3'}

##### 7. `preserveContext`
Makes sure that your Alert always has the parent's context.
It is needed because the Alert's height, which is needed for calculating the position of each element in the stack, is measured by directly mounting an Alert into DOM by using `ReactDOM.render`. If you want to include any custom JSX inside your Alert, e.g. for  `Material UI`, which uses context for passing theme configuration, you will need this option to be set to **true**.

This options enables the usage of the new `ReactDOM.unstable_renderSubtreeIntoContainer` function, which works exactly the same as `ReactDOM.render`, but keeps the context from the parent's component. Even though this option is named as "unstable", it works perfectly fine.

Possible preserveContext values:

- **true** or **false** (Defaults to **false**)

Example:

In method call:
```javascript
Alert.success('Message...', {
    preserveContext: true
});
```

In global config:
```javascript
<Alert preserveContext />
```

##### 8. `onShow`

Execute a callback function. onShow will fire the function when the alert appears.

Example:

In method call:
```javascript
Alert.success('Message...', {
    onShow: function () {
        console.log('onShow Fired!');
    }
});
```

In global config:
```javascript
<Alert onShow={this.handleOnShow} />
```

Possible 'onShow' values:

- **(Function)**

##### 9. `onClose`

Execute a callback function.  Will fire the function when the alert is closed.

Example:

In method call:
```javascript
Alert.success('Message...', {
    onClose: function () {
        console.log('onClose Fired!');
    }
});
```

In global config:
```javascript
<Alert onClose={this.handleOnClose} />
```

Possible 'onClose' values:

- **(Function)**

##### 10. `customFields`

You can pass a customFields object for your custom content template component. You need to prepare the component to be able to display customFields values. You'll read more about it below.

Example:

In global config you need to provide custom content template component:
```javascript
<Alert contentTemplate={MyContentTemplate} />
```

In method call you can provide custom fields used in your custom template:
```javascript
Alert.success('Message...', {
    customFields: {
        specialInfo: this.getSpecialInfo();
    }
});
```

Possible 'customFields' values:

- **(Object)**

## Overwrite content template component

With sAlert you have the possibility to overwrite the `SAlertContentTmpl` core component. This is useful when you want to provide more dynamic data in your alerts or just when you want to rebuild the HTML structure of the alert. This is very useful, but might not be trivial. Standard sAlerts will take only the message you want to display and some configuration. There will be use cases when you want to display some more dynamic data or just some more HTML structures.

 I'll try to explain it by example:

Let's say that we want to have an alert with the additional dynamic data. We want the name of the customer, and a confirmation button which will close the alert.

Here is what we could do.

In our main app component we will use sAlert component (see above) with a custom content component:

```javascript
import MyCustomContentTemplate from './MyCustomContentTemplate';
(...)
<Alert contentTemplate={MyCustomContentTemplate} />
(...)
```

We have just told our sAlert component that we will use a custom content component instead the core one which is called `SAlertContentTmpl`. (You should copy the content of the `SAlertContentTmpl` in your custom one and add your own modifications to it).

For example our `MyCustomContentTemplate` component could look like:

```javascript
import React from 'react';
import Alert from 'react-s-alert';

class MyCustomContentTemplate extends React.Component {
    constructor(props) {
        super(props);
    }
    handleConfirm() {
        console.log('Customer confirmation!');
        Alert.close(this.props.id);
    }
    render() {
        return (
            <div className={this.props.classNames} id={this.props.id} style={this.props.styles}>
                <div className='s-alert-box-inner'>
                    {this.props.message}

                    {/* use this api to customize alert style */}
                    {this.props.condition}
                </div>
                <h3>{this.props.customFields.customerName}</h3>
                <button onClick={this.handleConfirm.bind(this)}>Confirm</button>
                <span className='s-alert-close' onClick={this.props.handleClose}></span>
            </div>
        )
    }
}

export default MyCustomContentTemplate;
```

Then you just need to pass the `customerName` value somewhere in your app. For example:

```
Alert.warning('Customer confirmation needed.', {
    customFields: {
        customerName: 'Stefan Kowalski'
    }
});
```

As you can see you should keep the other props here. These are the props which are needed to provide proper behaviour of your alerts. You need to be careful with custom content components.

## Testing and Development

Clone and install it first:

```
git clone https://github.com/juliancwirko/react-s-alert.git
cd react-s-alert
npm install
```

If you want to test (Node.js 4.0 or newer):

```
npm test
```
or
```
npm run testonly
```

If you want to transpile from ES2015 to ES5:

```
npm run prepublish
```

## Also check out

- [Meteor/React/GraphQL apps development](http://www.psd2meteor.com/)
- [Open Source Live Chat App built with Meteor](https://www.simplechat.support/)
- [Stylus Flexbox Grid](http://stylusgrid.com/)
- [React project boilerplate with Webpack, HMR, React Router](https://github.com/juliancwirko/react-boilerplate)
- [Boilerplate for creating React Npm packages with ES2015](https://github.com/juliancwirko/react-npm-boilerplate)

## License

MIT
