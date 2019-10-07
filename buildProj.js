var fs = require('fs');
var readline = require('readline');
var cp = require('child_process');
var path = require('path');

var babelDef = require('./fileDefs/babelDef');
var eslintDef = require('./fileDefs/eslintDef');
var gitignoreDef = require('./fileDefs/gitignoreDef');
var nvmrcDef = require('./fileDefs/nvmrcDef');
var packageDef = require('./fileDefs/packageDef');
var rootIndexDef = require('./fileDefs/indexDef');
var serverDef = require('./fileDefs/src/indexDef');
var bundleDef = require('./fileDefs/src/bundleDef');
var footerDef = require('./fileDefs/src/footerDef');
var headerDef = require('./fileDefs/src/headerDef');
var pageDef = require('./fileDefs/src/pageDef');
var rootDef = require('./fileDefs/src/rootDef');
var footerStyleDef = require('./fileDefs/src/styledComponents/footerDef');
var headerStyleDef = require('./fileDefs/src/styledComponents/headerDef');
var styledComponentDef = require('./fileDefs/src/styledComponents/styledComponentDef');
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
      listOfPages = list;
      console.log(list);
      resolve()
    })
  })
}

const action3 = () => {
  return new Promise((resolve, reject) => {
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
        fs.writeFileSync(projectName + '/index.js', rootIndexDef);
        console.log("index.js File Created");
      }
      //Make babel.rc
      if(fs.existsSync(projectName + '/babel.rc')) {
        console.log('The model.js file already exists');
      }
      else {
        fs.writeFileSync(projectName + '/babel.rc', babelDef);
        console.log("babel.rc File Created");
      }
      //Make .eslintrc.json
      if(fs.existsSync(projectName + '/.eslintrc.json')) {
        console.log('The .eslintrc.json file already exists');
      }
      else {
        fs.writeFileSync(projectName + '/.eslintrc.json', eslintDef);
        console.log(".eslintrc.json File Created");
      }
      //Make .gitignore file
      if(fs.existsSync(projectName + '/.gitignore')) {
        console.log('The .gitignore file already exists');
      }
      else {
        fs.writeFileSync(projectName + '/.gitignore', gitignoreDef);
        console.log(".gitignore File Created");
      }
      //Make .nvmrc file
      if(fs.existsSync(projectName + '/.nvmrc')) {
        console.log('The .nvmrc file already exists');
      }
      else {
        fs.writeFileSync(projectName + '/.nvmrc', nvmrcDef);
        console.log(".nvmrc File Created");
      }
      //Make package.json file
      if(fs.existsSync(projectName + '/package.json')) {
        console.log('The package.json file already exists');
      }
      else {
        fs.writeFileSync(projectName + '/package.json', packageDef(projectName));
        console.log("package.json File Created");
      }
      //Make webpack.config.js file
      if(fs.existsSync(projectName + '/webpack.config.js')) {
        console.log('The webpack.config.js file already exists');
      }
      else {
        fs.writeFileSync(projectName + '/webpack.config.js', webpackDef(listOfPages));
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
            //Make bundles files
            listOfPages.map((page) => {
              if(fs.existsSync(`${projectName}/src/bundles/${page}Bundle.js`)) {
                console.log(`The ${page}Bundle.js file already exists`);
              }
              else {
                fs.writeFileSync(`${projectName}/src/bundles/${page}Bundle.js`, bundleDef(page));
                console.log(`${page}Bundle.js file created!`);
              }
            })
          //Make components directory
          if(fs.existsSync(projectName + '/src/components')) {
            console.log('The components directory already exists');
          }
          else {
            fs.mkdirSync(projectName + '/src/components');
            console.log("Components Directory Created");
          }
            //Make header.js file
            if(fs.existsSync(`${projectName}/src/components/Header.js`)) {
              console.log('The Header.js file already exists');
            }
            else {
              fs.writeFileSync(`${projectName}/src/components/Header.js`, headerDef);
              console.log("Header.js File Created");
            }
            //Make footer.js file
            if(fs.existsSync(`${projectName}/src/components/Footer.js`)) {
              console.log('The footer.js file already exists');
            }
            else {
              fs.writeFileSync(`${projectName}/src/components/Footer.js`, footerDef);
              console.log("footer.js File Created");
            }
          //Make pages directory
          if(fs.existsSync(projectName + '/src/pages')) {
            console.log('The pages directory already exists');
          }
          else {
            fs.mkdirSync(projectName + '/src/pages');
            console.log("Pages Directory Created");
          }
            //Make pages files
            listOfPages.map((page) => {
              if(fs.existsSync(`${projectName}/src/pages/${page}Page.js`)) {
                console.log(`The ${page}Page.js file already exists`);
              }
              else {
                fs.writeFileSync(`${projectName}/src/pages/${page}Page.js`, pageDef(page));
                console.log(`${page}Page.js file created!`);
              }
            })
          //Make roots directory
          if(fs.existsSync(projectName + '/src/roots')) {
            console.log('The roots directory already exists');
          }
          else {
            fs.mkdirSync(projectName + '/src/roots');
            console.log("Roots Directory Created");
          }
            //Make roots files
            listOfPages.map((page) => {
              if(fs.existsSync(`${projectName}/src/roots/${page}Root.js`)) {
                console.log(`The ${page}Root.js file already exists`);
              }
              else {
                fs.writeFileSync(`${projectName}/src/roots/${page}Root.js`, rootDef(page));
                console.log(`${page}Root.js file created!`);
              }
            })
          //Make styled-components directory
          if(fs.existsSync(projectName + '/src/styled-components')) {
            console.log('The styled-components directory already exists');
          }
          else {
            fs.mkdirSync(projectName + '/src/styled-components');
            console.log("Styled Components Directory Created");
          }
            //Make styled-components files
            listOfPages.map((page) => {
              if(fs.existsSync(`${projectName}/src/styled-components/${page}.js`)) {
                console.log(`The ${page}.js file already exists`);
              }
              else {
                fs.writeFileSync(`${projectName}/src/styled-components/${page}.js`, styledComponentDef(page));
                console.log(`${page}.js file created!`);
              }
            })
            //Make header.js style file
            if(fs.existsSync(`${projectName}/src/styled-components/header.js`)) {
              console.log('The header.js Style file already exists');
            }
            else {
              fs.writeFileSync(`${projectName}/src/styled-components/header.js`, headerStyleDef);
              console.log("header.js Style File Created");
            }
            //Make footer.js style file
            if(fs.existsSync(`${projectName}/src/styled-components/footer.js`)) {
              console.log('The footer.js Style file already exists');
            }
            else {
              fs.writeFileSync(`${projectName}/src/styled-components/footer.js`, footerStyleDef);
              console.log("footer.js Style File Created");
            }
          //Make server index.js
          if(fs.existsSync(projectName + '/src/index.js')) {
            console.log('The server index.js file already exists');
          }
          else {
            fs.writeFileSync(projectName + '/src/index.js', serverDef(listOfPages));
            console.log("Server index.js File Created");
          }
    console.log("awww yeah!! Successful build!!");
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
