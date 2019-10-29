module.exports = (page) => {
  const pgCap = page.slice(0,1).toUpperCase() + page.slice(1);
  return `import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ${pgCap}Wrapper, ${pgCap}Content } from '../styled-components/${page}';

class ${pgCap} extends Component {
    render(){
      return (
          <${pgCap}Wrapper>
              <Header/>
              <${pgCap}Content>
                ${page} page
              </${pgCap}Content>
              <Footer/>
          </${pgCap}Wrapper>
      );
    }
}

export default ${pgCap};
`;
}
