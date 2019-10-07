module.exports = (page) => {
  const pgCap = page.slice(0,1).toUpperCase() + page.slice(1);
  return `import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ${pgCap}Wrapper } from '../styled-components/${page}';

class ${pgCap} extends Component {
    render(){
      return (
          <${pgCap}Wrapper>
              <Header/>
              page
              <Footer/>
          </${pgCap}Wrapper>
      );
    }
}

export default ${pgCap};
`;
}
