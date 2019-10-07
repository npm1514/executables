var fs = require('fs');
var readline = require('readline');
var cp = require('child_process');
var path = require('path');

var babelDef = require('./fileDefs/babelDef');
var eslintDef = require('./fileDefs/eslintDef');
var gitignoreDef = require('./fileDefs/gitignoreDef');
var packageDef = require('./fileDefs/packageDef');
var rootIndexDef = require('./fileDefs/rootIndexDef');
var serverDef = require('./fileDefs/serverDef');
var webpackDef = require('./fileDefs/webpackDef');

var projectName = "";
var listOfPages = [];

var rl = readline.createInterface(process.stdin, process.stdout);

const question1 = () => {
  return new Promise((resolve, reject) => {
    rl.question('What is the project name?\n', (answer) => {
      projectName = answer;
      resolve()
    })
  })
}
const question2 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Return list of page names, comma separated.\n', (answer) => {
      var list = answer.split(' ').join('').split(',');
      list = list.map((p) => `'${p}'`)
      console.log(list);
      listOfPages = list;
      resolve()
    })
  })
}

const action3 = () => {
  return new Promise((resolve, reject) => {
    var file = {
      server: serverDef(listOfPages),
      index: rootIndexDef(),
      babel: babelDef(),
      eslint: eslintDef(),
      gitignore: gitignoreDef(),
      package: packageDef(projectName),
      nvmrc: `8.11.1`,
      webpack: webpackDef(listOfPages)
    }

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
        fs.writeFileSync(projectName + '/index.js', file.index);
        console.log("index.js File Created");
      }
      //Make babel.rc
      if(fs.existsSync(projectName + '/babel.rc')) {
        console.log('The model.js file already exists');
      }
      else {
        fs.writeFileSync(projectName + '/babel.rc', file.babel);
        console.log("babel.rc File Created");
      }
      //Make .eslintrc.json
      if(fs.existsSync(projectName + '/.eslintrc.json')) {
        console.log('The .eslintrc.json file already exists');
      }
      else {
        fs.writeFileSync(projectName + '/.eslintrc.json', file.eslint);
        console.log(".eslintrc.json File Created");
      }
      //Make .gitignore file
      if(fs.existsSync(projectName + '/.gitignore')) {
        console.log('The .gitignore file already exists');
      }
      else {
        fs.writeFileSync(projectName + '/.gitignore', file.gitignore);
        console.log(".gitignore File Created");
      }
      //Make .nvmrc file
      if(fs.existsSync(projectName + '/.nvmrc')) {
        console.log('The .nvmrc file already exists');
      }
      else {
        fs.writeFileSync(projectName + '/.nvmrc', file.nvmrc);
        console.log(".nvmrc File Created");
      }
      //Make package.json file
      if(fs.existsSync(projectName + '/package.json')) {
        console.log('The package.json file already exists');
      }
      else {
        fs.writeFileSync(projectName + '/package.json', file.package);
        console.log("package.json File Created");
      }
      //Make webpack.config.js file
      if(fs.existsSync(projectName + '/webpack.config.js')) {
        console.log('The webpack.config.js file already exists');
      }
      else {
        fs.writeFileSync(projectName + '/webpack.config.js', file.webpack);
        console.log("webpack.config.js File Created");
      }
        //Make src directory
        if(fs.existsSync(projectName + '/src')) {
          console.log('The src directory already exists');
        }
        else {
          fs.mkdirSync(projectName + '/src');
          console.log("Src Directory Created");
        }
          //Make bundles directory
          if(fs.existsSync(projectName + '/src/bundles')) {
            console.log('The bundles directory already exists');
          }
          else {
            fs.mkdirSync(projectName + '/src/bundles');
            console.log("Bundles Directory Created");
          }
          //Make components directory
          if(fs.existsSync(projectName + '/src/components')) {
            console.log('The components directory already exists');
          }
          else {
            fs.mkdirSync(projectName + '/src/components');
            console.log("Components Directory Created");
          }
          //Make pages directory
          if(fs.existsSync(projectName + '/src/pages')) {
            console.log('The pages directory already exists');
          }
          else {
            fs.mkdirSync(projectName + '/src/pages');
            console.log("Pages Directory Created");
          }
          //Make roots directory
          if(fs.existsSync(projectName + '/src/roots')) {
            console.log('The roots directory already exists');
          }
          else {
            fs.mkdirSync(projectName + '/src/roots');
            console.log("Roots Directory Created");
          }
          //Make styled-components directory
          if(fs.existsSync(projectName + '/src/styled-components')) {
            console.log('The styled-components directory already exists');
          }
          else {
            fs.mkdirSync(projectName + '/src/styled-components');
            console.log("Styled Components Directory Created");
          }
          //Make server index.js
          if(fs.existsSync(projectName + '/src/index.js')) {
            console.log('The server index.js file already exists');
          }
          else {
            fs.writeFileSync(projectName + '/src/index.js', file.server);
            console.log("Server index.js File Created");
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
