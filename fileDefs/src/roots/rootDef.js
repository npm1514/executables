module.exports = (page) => {
  const pgCap = page.slice(0,1).toUpperCase() + page.slice(1);
  return `import React, { Component } from 'react';
import { ${pgCap}Page } from '../pages';

class Root extends Component {
    render() {
        const { data } = this.props;
        return <${pgCap}Page data={data ? data : {}}/>
    }
}

export default Root;`;
}
