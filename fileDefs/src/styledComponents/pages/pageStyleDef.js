module.exports = (page) => {
  const pgCap = page.slice(0,1).toUpperCase() + page.slice(1);
  return `import styled from 'styled-components';

  export const ${pgCap}Content = styled.div\`
    width: 100%;
    text-align: center;
  \`;
  `
}
