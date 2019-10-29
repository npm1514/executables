module.exports = (page) => {
  const pgCap = page.slice(0,1).toUpperCase() + page.slice(1);
  return `import styled from 'styled-components';

  export const ${pgCap}Wrapper = styled.div\`
    width: 100%;
    min-height: 100vh;
  \`;

  export const ${pgCap}Content = styled.div\`
    width: calc(100% - 32px);
    padding: 16px;
    min-height: 300px;
    text-align: center;
  \`;
  `
}
