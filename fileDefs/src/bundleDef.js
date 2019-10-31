module.exports = (page) => {
  const pgCap = page.slice(0,1).toUpperCase() + page.slice(1);
  return `import React from 'react';
import { hydrate, render } from 'react-dom';
import ${pgCap} from '../pages/${pgCap}Page';

if (window)
  render(
    <${pgCap} data={window.__DATA__} />,
    document.getElementById('app')
  );
`;
}
