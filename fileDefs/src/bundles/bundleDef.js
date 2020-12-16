module.exports = (page) => {
  const pgCap = page.slice(0,1).toUpperCase() + page.slice(1);
  return `import React from 'react';
import { render } from 'react-dom';
import { ${pgCap}Page } from '../pages';

if (window)
  render(
    <${pgCap}Page data={window.__DATA__} />,
    document.getElementById('app')
  );
`;
}
