import React from 'react';
import ReactDOM from "react-dom";
import Alert from '../lib/SAlert';
import '../lib/s-alert-default.css';

// optional - you can choose the effect you want
import '../lib/s-alert-css-effects/slide.css';
import '../lib/s-alert-css-effects/scale.css';
import '../lib/s-alert-css-effects/bouncyflip.css';
import '../lib/s-alert-css-effects/flip.css';
import '../lib/s-alert-css-effects/genie.css';
import '../lib/s-alert-css-effects/jelly.css';
import '../lib/s-alert-css-effects/stackslide.css';

class App extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.alert(500);
        this.alert(1000);
    }

    alert(timeout) {
        setTimeout(() => {
            Alert.error('Test message 3', {
                position: 'bottom-center',
                effect: 'slide',
                timeout: 'none'
            });
        }, timeout);
    }

    render() {
        return (
            <div>
                Hello
                <Alert
                    stack={{limit: 3}}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <App>

    </App>
    ,
    document.getElementById("BODY")
);
