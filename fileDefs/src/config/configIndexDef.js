module.exports = (projectName, listOfCollections, emailNeeded) => {
  return `module.exports = {
  key: "${projectName}",${listOfCollections.length ? `\ndbuser: "",
  dbpass: "",` : ``}${emailNeeded ? `\nnodemailerEmail: "",
  nodemailerPW: ""` : ``}
}`
}
