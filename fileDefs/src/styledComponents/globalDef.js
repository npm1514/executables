module.exports = `import styled from 'styled-components';
import {darkblue, white, lightblue, pink, green} from './colors';

export const PageWrapper = styled.div\`
  width: 100%;
  min-height: 100vh;
\`;

export const ContentWrapper = styled.div\`
  width: calc(100% - 32px);
  padding: 16px;
  min-height: calc(100vh - 89px - 145px);
  max-width: 900px;
  margin: auto;
  text-align: center;
  position: relative;
  @media (min-width: 700px){
    min-height: calc(100vh - 58px - 115px);
  }
\`;

export const Button = styled.div\`
  background: \${pink};
  padding: 6px 12px;
  margin: 12px auto;
  border: 1px solid #8d8d8d;
  border-radius: 3px;
  width: max-content;
  &:hover {
    cursor: pointer;
    border: 2px solid #8d8d8d;
  }
\`;
`;
