module.exports = (page) => {
  const pgCap = page.slice(0,1).toUpperCase() + page.slice(1);
  return `import React, { Component } from 'react';
import { Header, Footer } from '../components';
import { ${pgCap}Content } from '../styled-components/pages/${page}';
import { PageWrapper, ContentWrapper } from '../styled-components/global';

class ${pgCap} extends Component {
    render(){
      return (
          <PageWrapper>
              <Header/>
              <ContentWrapper>
                <${pgCap}Content>
                  ${page} page
                </${pgCap}Content>
              </ContentWrapper>
              <Footer/>
          </PageWrapper>
      );
    }
}

export default ${pgCap};
`;
}
