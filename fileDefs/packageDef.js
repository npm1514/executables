module.exports = (projectName, dbNeeded, authNeeded) => {
  return `{
  "name": "${projectName}",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "watch": {
    "go": "src/"
  },
  "scripts": {
    "go": "rm -rf dist && NODE_ENV=production webpack -p && rm -rf build && NODE_ENV=production babel src --out-dir build && node build/index.js",
    "bundle": "rm -rf dist && NODE_ENV=production webpack -p",
    "build": "rm -rf build && NODE_ENV=production babel src --out-dir build",
    "start": "node build/index.js",
    "test": "echo 'done'",
    "watch": "npm-watch"
  },
  "dependencies": {
    "@babel/cli": "^7.2.0", ${authNeeded ? `\n"bcrypt-nodejs": "^0.0.3",` : ``}
    "body-parser": "^1.19.0",
    "compression": "^1.7.3",
    "cors": "^2.8.5",${dbNeeded ? `\n"cryptr": "^6.0.2",` : ``}
    "express": "^4.16.3",${authNeeded ? `\n"express-session": "^1.17.1",` : ``}${dbNeeded ? `\n"mongoose": "^5.11.7",` : ``}
    "node-fetch": "^2.6.0",${authNeeded ? `\n"passport": "^0.4.1",` : ``}${authNeeded ? `\n"passport-local": "^1.0.0",` : ``}
    "react": "^16.4.2",
    "react-dom": "^16.4.2",
    "styled-components": "^4.1.3"
  },
  "devDependencies": {
    "@babel/core": "^7.2.0",
    "@babel/plugin-proposal-class-properties": "^7.2.1",
    "@babel/plugin-proposal-object-rest-spread": "^7.2.0",
    "@babel/plugin-transform-runtime": "^7.2.0",
    "@babel/polyfill": "^7.2.5",
    "@babel/preset-env": "^7.2.0",
    "@babel/preset-react": "^7.0.0",
    "babel-eslint": "^8.0.2",
    "babel-loader": "^8.0.4",
    "babel-plugin-lodash": "^3.3.4",
    "babelify": "^7.3.0",
    "eslint": "^4.12.0",
    "npm-watch": "^0.5.0",
    "webpack": "^4.39.3",
    "webpack-cli": "^3.1.2",
    "window": "^4.2.6"
  },
  "author": "Marucci"
}`;

}
