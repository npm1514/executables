var fs = require('fs');
var readline = require('readline');
var cp = require('child_process');
var path = require('path');

var projectName = "";
var listOfPages = [];

var rl = readline.createInterface(process.stdin, process.stdout);


const question1 = () => {
  return new Promise((resolve, reject) => {
    rl.question('What is the project name?', (answer) => {
      projectName = answer;
      resolve()
    })
  })
}
const question2 = () => {
  return new Promise((resolve, reject) => {
    rl.question('How many pages are there?', (answer) => {
      listOfPages = [...Array(parseInt(answer))].map((a,i) => {
        return `'page${i + 1}'`;
      })
      resolve()
    })
  })
}

const action3 = () => {
  return new Promise((resolve, reject) => {
    var index = `require('./build/index.js');`;
    var babel =
`{
  "presets": [
    [
      "@babel/preset-env"
    ],
    "@babel/react"
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread"
  ]
}`;
    var eslint =
`{
  "parser": "babel-eslint",
  "globals": {
    "document": true,
    "history": true,
    "window": true,
    "google": true,
    "jQuery": true,
    "s_gi": true,
    "os": true,
    "s": true
  }
}`;
    var gitignore =
`.DS_Store
node_modules
yarn.lock
.idea/
*.iml
target/
*~`;
    var nvmrc = `8.11.1`;
    var package =
`{
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
    "@babel/cli": "^7.2.0",
    "body-parser": "^1.19.0",
    "compression": "^1.7.3",
    "cors": "^2.8.5",
    "express": "^4.16.3",
    "node-fetch": "^2.6.0",
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

    console.log("list",listOfPages);
    var webpack =
`const path = require('path');
const webpack = require('webpack');
require('@babel/polyfill');
const pages = [${listOfPages}];

module.exports = pages.map((page) => {
  return {
      mode: 'development',
      entry: ['@babel/polyfill', './src/bundles/'+page+'Bundle.js'],
      module: {
          rules: [
              {
                  test: /\.js$/,
                  exclude: /node_modules/,
                  use: {
                      loader: 'babel-loader'
                  }
              }
          ]
      },
      output: {
          filename: 'js/'+page+'.bundle.min.js',
          path: path.join(__dirname, 'dist')
      },
      plugins: [
          new webpack.DefinePlugin({
              'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
          })
      ],
      node: {
         fs: "empty",
         net: "empty"
      }
  }
});`;

    //Make project directory
    if(fs.existsSync(projectName)) {
      console.log('The Project directory already exists');
    }
    else {
      fs.mkdirSync(projectName);
      console.log("Project Directory Created");
    }

    //Make index.js
    if(fs.existsSync(projectName + '/index.js')) {
      console.log('The index.js file already exists');
    }
    else {
      fs.writeFileSync(projectName + '/index.js', index);
      console.log("index.js File Created");
    }

    //Make babel.rc
    if(fs.existsSync(projectName + '/babel.rc')) {
      console.log('The model.js file already exists');
    }
    else {
      fs.writeFileSync(projectName + '/babel.rc', babel);
      console.log("babel.rc File Created");
    }

    //Make .eslintrc.json
    if(fs.existsSync(projectName + '/.eslintrc.json')) {
      console.log('The .eslintrc.json file already exists');
    }
    else {
      fs.writeFileSync(projectName + '/.eslintrc.json', eslint);
      console.log(".eslintrc.json File Created");
    }

    //Make .gitignore file
    if(fs.existsSync(projectName + '/.gitignore')) {
      console.log('The .gitignore file already exists');
    }
    else {
      fs.writeFileSync(projectName + '/.gitignore', gitignore);
      console.log(".gitignore File Created");
    }

    //Make .nvmrc file
    if(fs.existsSync(projectName + '/.nvmrc')) {
      console.log('The .nvmrc file already exists');
    }
    else {
      fs.writeFileSync(projectName + '/.nvmrc', nvmrc);
      console.log(".nvmrc File Created");
    }

    //Make package.json file
    if(fs.existsSync(projectName + '/package.json')) {
      console.log('The package.json file already exists');
    }
    else {
      fs.writeFileSync(projectName + '/package.json', package);
      console.log("package.json File Created");
    }
    //Make webpack.config.js file
    if(fs.existsSync(projectName + '/webpack.config.js')) {
      console.log('The webpack.config.js file already exists');
    }
    else {
      fs.writeFileSync(projectName + '/webpack.config.js', webpack);
      console.log("webpack.config.js File Created");
    }
    resolve()
  })
}

const main = async () => {
  await question1();
  await question2();
  await action3();
  rl.close();
};

main();
