module.exports = (listOfPages) => {
  return `${listOfPages.map(page => {
    const pgCap = page.slice(0,1).toUpperCase() + page.slice(1);
    return `export { default as ${pgCap}Root } from "./${pgCap}Root";`
  }).join('\n')}`
}
