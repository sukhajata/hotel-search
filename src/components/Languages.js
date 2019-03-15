import React from 'reactn';

import Button from '@material-ui/core/Button';

import { getLanguage } from '../services/api';
import thaiFlag from '../img/thai-flag.png';
import britishFlag from '../img/british-flag-new.png';

class Languages extends React.Component {
    setLanguage = (code) => {
        this.setGlobal({
            language: getLanguage(code),
            lanCode: code,
        });
        localStorage.setItem('lan', code);
    }

    render() {
        return (
            <div style={{position: 'absolute', right: 15, top: 15}}>
                <img src={thaiFlag} alt="ไทย" onClick={() => this.setLanguage('th')} style={{height: 23, marginRight: 7}}/>
                <img src={britishFlag} alt="EN" onClick={() => this.setLanguage('en')} style={{height: 23}}/>
            </div>
        );
    }
}

export default Languages;