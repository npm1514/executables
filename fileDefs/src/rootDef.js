module.exports = (page) => {
  const pgCap = page.slice(0,1).toUpperCase() + page.slice(1);
  return `import React, { Component } from 'react';
import ${pgCap} from '../pages/${pgCap}Page';

class Root extends Component {
    render() {
        return <${pgCap} data={this.props.data ? this.props.data : {}}/>
    }
}

export default Root;`;
}
