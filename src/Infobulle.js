
import React from 'react';
import BeforeAfterSlider from 'react-before-after-slider';
import * as after from './assets/avant.png'
import * as before from './assets/apres.png'

export class Infobulle extends React.Component {
    state = {
    }
    render() {
        return (
        <div className="infobule">
            <BeforeAfterSlider
                before={before}
                after={after}
                width={640}
                height={480}
            />
        </div>
        );
        
    }
}

export default Infobulle;
