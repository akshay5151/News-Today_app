import React, { Component } from 'react';
import loading1 from './loading1.gif';


export class Spinner extends Component {
  render() {
    return( <div className='text-center'>
        <img src={loading1} alt="loading1"/>
    </div>
    );
  }
}

export default Spinner
