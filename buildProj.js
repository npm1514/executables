var fs = require('fs');
var readline = require('readline');
var cp = require('child_process');
const { exec } = cp;
var path = require('path');

//root
var babelDef = require('./fileDefs/babelDef');
var eslintDef = require('./fileDefs/eslintDef');
var gitignoreDef = require('./fileDefs/gitignoreDef');
var indexDef = require('./fileDefs/indexDef');
var nvmrcDef = require('./fileDefs/nvmrcDef');
var packageDef = require('./fileDefs/packageDef');
var webpackDef = require('./fileDefs/webpackDef');

//src
  var srcIndexDef = require('./fileDefs/src/srcIndexDef');

    //bundles
    var bundleDef = require('./fileDefs/src/bundles/bundleDef');

    //components
    var componentIndexDef = require('./fileDefs/src/components/componentIndexDef');
    var footerDef = require('./fileDefs/src/components/footerDef');
    var headerDef = require('./fileDefs/src/components/headerDef');

    //config
    var configIndexDef = require('./fileDefs/src/config/configIndexDef');
    var passportDef = require('./fileDefs/src/config/passportDef');

    //controllers
    var controllerDef = require('./fileDefs/src/controllers/controllerDef');
    var userCtrlDef = require('./fileDefs/src/controllers/userCtrlDef');

    //models
    var modelDef = require('./fileDefs/src/models/modelDef');
    var userModelDef = require('./fileDefs/src/models/userModelDef');

    //pages
    var pageIndexDef = require('./fileDefs/src/pages/pageIndexDef');
    var pageDef = require('./fileDefs/src/pages/pageDef');

    //roots
    var rootIndexDef = require('./fileDefs/src/roots/rootIndexDef');
    var rootDef = require('./fileDefs/src/roots/rootDef');

    //styled-components
    var colorDef = require('./fileDefs/src/styledComponents/colorDef');
    var globalDef = require('./fileDefs/src/styledComponents/globalDef');

        //components
        var footerStyleDef = require('./fileDefs/src/styledComponents/components/footerStyleDef');
        var headerStyleDef = require('./fileDefs/src/styledComponents/components/headerStyleDef');

        //pages
        var pageStyleDef = require('./fileDefs/src/styledComponents/pages/pageStyleDef');


var projectName = "";
var listOfPages = [];
var authNeeded = false;
var emailNeeded = false;
var dbNeeded = false;
var listOfCollections = [];


var rl = readline.createInterface(process.stdin, process.stdout);

const question1 = () => {
  return new Promise((resolve, reject) => {
    rl.question('What is the project name?\n', (answer) => {
      projectName = answer;
      console.log(projectName);
      resolve()
    })
  })
}
const question2 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Return list of page names, comma separated.\n', (answer) => {
      var list = answer.split(' ').join('').split(',');
      listOfPages = list;
      console.log(listOfPages);
      resolve()
    })
  })
}
const question3 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Is authentication needed? (Yes/No)\n', (answer) => {
      answer = answer.toLowerCase();
      authNeeded = answer == "yes" || answer == "y" ? true : false;
      dbNeeded = authNeeded;
      console.log(authNeeded);
      console.log(dbNeeded);
      resolve()
    })
  })
}
const question4 = () => {
  return new Promise((resolve, reject) => {
    if(!authNeeded){
      rl.question('Is a database needed? (Yes/No)\n', (answer) => {
        answer = answer.toLowerCase();
        dbNeeded = answer == "yes" || answer == "y" ? true : false;
        console.log(dbNeeded);
        resolve()
      })
    } else {
      resolve()
    }
  })
}
const question5 = () => {
  return new Promise((resolve, reject) => {
    if(authNeeded || dbNeeded){
      rl.question('Return list of singular collection names for the database, comma separated. If auth is needed exclude "user".\n', (answer) => {
        var authAnswer = authNeeded ? "user, " + answer : answer
        console.log(authAnswer);
        listOfCollections = authAnswer.split(' ').join('').split(',');
        console.log(listOfCollections);
        resolve()
      })
    } else {
      resolve()
    }
  })
}

const question6 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Is an email form needed? (Yes/No)\n', (answer) => {
      answer = answer.toLowerCase();
      emailNeeded = answer == "yes" || answer == "y" ? true : false;
      console.log(emailNeeded);
      resolve()
    })
  })
}

const action1 = () => {
  return new Promise((resolve, reject) => {


    //Make project directory
    if(fs.existsSync('../' + projectName)) {
      console.log('The Project directory already exists');
    }
    else {
      fs.mkdirSync('../' + projectName);
      console.log("Project Directory Created");
    }


    //Make .babelrc
    if(fs.existsSync('../' + projectName + '/.babelrc')) {
      console.log('The model.js file already exists');
    }
    else {
      fs.writeFileSync('../' + projectName + '/.babelrc', babelDef);
      console.log("babel.rc File Created");
    }


    //Make .eslintrc.json
    if(fs.existsSync('../' + projectName + '/.eslintrc.json')) {
      console.log('The .eslintrc.json file already exists');
    }
    else {
      fs.writeFileSync('../' + projectName + '/.eslintrc.json', eslintDef);
      console.log(".eslintrc.json File Created");
    }


    //Make .gitignore file
    if(fs.existsSync('../' + projectName + '/.gitignore')) {
      console.log('The .gitignore file already exists');
    }
    else {
      fs.writeFileSync('../' + projectName + '/.gitignore', gitignoreDef);
      console.log(".gitignore File Created");
    }


    //Make index.js
    if(fs.existsSync('../' + projectName + '/index.js')) {
      console.log('The index.js file already exists');
    }
    else {
      fs.writeFileSync('../' + projectName + '/index.js', indexDef);
      console.log("index.js File Created");
    }


    //Make .nvmrc file
    if(fs.existsSync('../' + projectName + '/.nvmrc')) {
      console.log('The .nvmrc file already exists');
    }
    else {
      fs.writeFileSync('../' + projectName + '/.nvmrc', nvmrcDef);
      console.log(".nvmrc File Created");
    }


    //Make package.json file
    if(fs.existsSync('../' + projectName + '/package.json')) {
      console.log('The package.json file already exists');
    }
    else {
      fs.writeFileSync('../' + projectName + '/package.json', packageDef(projectName, dbNeeded, authNeeded, emailNeeded));
      console.log("package.json File Created");
    }


    //Make webpack.config.js file
    if(fs.existsSync('../' + projectName + '/webpack.config.js')) {
      console.log('The webpack.config.js file already exists');
    }
    else {
      fs.writeFileSync('../' + projectName + '/webpack.config.js', webpackDef(listOfPages));
      console.log("webpack.config.js File Created");
    }


    //Make images directory
    if(fs.existsSync('../' + projectName + '/images')) {
      console.log('The images directory already exists');
    }
    else {
      fs.mkdirSync('../' + projectName + '/images');
      console.log("images Directory Created");
    }


    //Make src directory
    if(fs.existsSync('../' + projectName + '/src')) {
      console.log('The src directory already exists');
    }
    else {
      fs.mkdirSync('../' + projectName + '/src');
      console.log("src Directory Created");
    }


        //Make server index.js
        if(fs.existsSync('../' + projectName + '/src/index.js')) {
          console.log('The server index.js file already exists');
        }
        else {
          fs.writeFileSync('../' + projectName + '/src/index.js', srcIndexDef(projectName, listOfPages, authNeeded,  listOfCollections, emailNeeded));
          console.log("server index.js File Created");
        }


        //Make bundles directory
        if(fs.existsSync('../' + projectName + '/src/bundles')) {
          console.log('The bundles directory already exists');
        }
        else {
          fs.mkdirSync('../' + projectName + '/src/bundles');
          console.log("bundles Directory Created");
        }


            //Make bundles files
            listOfPages.map((page) => {
              if(fs.existsSync(`../${projectName}/src/bundles/${page}Bundle.js`)) {
                console.log(`The ${page}Bundle.js file already exists`);
              }
              else {
                fs.writeFileSync(`../${projectName}/src/bundles/${page}Bundle.js`, bundleDef(page));
                console.log(`${page}Bundle.js file created!`);
              }
            })


        //Make components directory
        if(fs.existsSync('../' + projectName + '/src/components')) {
          console.log('The components directory already exists');
        }
        else {
          fs.mkdirSync('../' + projectName + '/src/components');
          console.log("components Directory Created");
        }


            //Make Header.js file
            if(fs.existsSync(`../${projectName}/src/components/Header.js`)) {
              console.log('The Header.js file already exists');
            }
            else {
              fs.writeFileSync(`../${projectName}/src/components/Header.js`, headerDef);
              console.log("Header.js File Created");
            }


            //Make Footer.js file
            if(fs.existsSync(`../${projectName}/src/components/Footer.js`)) {
              console.log('The Footer.js file already exists');
            }
            else {
              fs.writeFileSync(`../${projectName}/src/components/Footer.js`, footerDef);
              console.log("Footer.js File Created");
            }


            //Make components index.js file
            if(fs.existsSync(`../${projectName}/src/components/index.js`)) {
              console.log('The components index.js file already exists');
            }
            else {
              fs.writeFileSync(`../${projectName}/src/components/index.js`, componentIndexDef);
              console.log("components index.js File Created");
            }


        if(authNeeded || dbNeeded || emailNeeded){
          //Make config directory
          if(fs.existsSync('../' + projectName + '/src/config')) {
            console.log('The config directory already exists');
          }
          else {
            fs.mkdirSync('../' + projectName + '/src/config');
            console.log("config Directory Created");
          }

              if(authNeeded){
                //Make passport.js file
                if(fs.existsSync(`../${projectName}/src/config/passport.js`)) {
                  console.log('The passport.js file already exists');
                }
                else {
                  fs.writeFileSync(`../${projectName}/src/config/passport.js`, passportDef);
                  console.log("passport.js File Created");
                }
              }


              if(dbNeeded || emailNeeded){
                //Make components index.js file
                if(fs.existsSync(`../${projectName}/src/config/index.js`)) {
                  console.log('The config index.js file already exists');
                }
                else {
                  fs.writeFileSync(`../${projectName}/src/config/index.js`, configIndexDef(projectName, listOfCollections, emailNeeded));
                  console.log("config index.js File Created");
                }
              }

        }


        if(dbNeeded){
          //Make controllers directory
          if(fs.existsSync('../' + projectName + '/src/controllers')) {
            console.log('The controllers directory already exists');
          }
          else {
            fs.mkdirSync('../' + projectName + '/src/controllers');
            console.log("controllers Directory Created");
          }


              if(authNeeded){
                //Make userCtrl.js file
                if(fs.existsSync(`../${projectName}/src/controllers/userCtrl.js`)) {
                  console.log('The userCtrl.js file already exists');
                }
                else {
                  fs.writeFileSync(`../${projectName}/src/controllers/userCtrl.js`, userCtrlDef);
                  console.log("userCtrl.js File Created");
                }
              }


              //Make controller files
              listOfCollections.map((collection, i) => {
                if(collection == "user"){
                  return
                } else {
                  if(fs.existsSync(`../${projectName}/src/controllers/${collection}Ctrl.js`)) {
                    console.log(`The ${collection}Ctrl.js file already exists`);
                  }
                  else {
                    fs.writeFileSync(`../${projectName}/src/controllers/${collection}Ctrl.js`, controllerDef(collection));
                    console.log(`${collection}Ctrl.js file created!`);
                  }
                }
              })

        }

        if(dbNeeded){
          //Make models directory
          if(fs.existsSync('../' + projectName + '/src/models')) {
            console.log('The models directory already exists');
          }
          else {
            fs.mkdirSync('../' + projectName + '/src/models');
            console.log("models Directory Created");
          }


              if(authNeeded){
                //Make userModel.js file
                if(fs.existsSync(`../${projectName}/src/models/userModel.js`)) {
                  console.log('The userModel.js file already exists');
                }
                else {
                  fs.writeFileSync(`../${projectName}/src/models/userModel.js`, userModelDef);
                  console.log("userModel.js File Created");
                }
              }


              //Make model files
              listOfCollections.map((collection, i) => {
                if(collection != "user"){
                  if(fs.existsSync(`../${projectName}/src/models/${collection}Model.js`)) {
                    console.log(`The ${collection}Model.js file already exists`);
                  }
                  else {
                    fs.writeFileSync(`../${projectName}/src/models/${collection}Model.js`, modelDef(collection));
                    console.log(`${collection}Model.js file created!`);
                  }
                } else {
                  return
                }
              })

        }


        //Make pages directory
        if(fs.existsSync('../' + projectName + '/src/pages')) {
          console.log('The pages directory already exists');
        }
        else {
          fs.mkdirSync('../' + projectName + '/src/pages');
          console.log("Pages Directory Created");
        }


            //Make pages files
            listOfPages.map((page) => {
              const pgCap = page.slice(0,1).toUpperCase() + page.slice(1);
              if(fs.existsSync(`../${projectName}/src/pages/${pgCap}Page.js`)) {
                console.log(`The ${pgCap}Page.js file already exists`);
              }
              else {
                fs.writeFileSync(`../${projectName}/src/pages/${pgCap}Page.js`, pageDef(page));
                console.log(`${pgCap}Page.js file created!`);
              }
            })


            //Make pages index.js file
            if(fs.existsSync(`../${projectName}/src/pages/index.js`)) {
              console.log('The pages index.js file already exists');
            }
            else {
              fs.writeFileSync(`../${projectName}/src/pages/index.js`, pageIndexDef(listOfPages));
              console.log("pages index.js File Created");
            }


        //Make roots directory
        if(fs.existsSync('../' + projectName + '/src/roots')) {
          console.log('The roots directory already exists');
        }
        else {
          fs.mkdirSync('../' + projectName + '/src/roots');
          console.log("Roots Directory Created");
        }


            //Make roots files
            listOfPages.map((page) => {
              const pgCap = page.slice(0,1).toUpperCase() + page.slice(1);
              if(fs.existsSync(`../${projectName}/src/roots/${pgCap}Root.js`)) {
                console.log(`The ${pgCap}Root.js file already exists`);
              }
              else {
                fs.writeFileSync(`../${projectName}/src/roots/${pgCap}Root.js`, rootDef(page));
                console.log(`${pgCap}Root.js file created!`);
              }
            })


            //Make roots index.js file
            if(fs.existsSync(`../${projectName}/src/roots/index.js`)) {
              console.log('The roots index.js file already exists');
            }
            else {
              fs.writeFileSync(`../${projectName}/src/roots/index.js`, rootIndexDef(listOfPages));
              console.log("roots index.js File Created");
            }


        //Make styled-components directory
        if(fs.existsSync('../' + projectName + '/src/styled-components')) {
          console.log('The styled-components directory already exists');
        }
        else {
          fs.mkdirSync('../' + projectName + '/src/styled-components');
          console.log("Styled Components Directory Created");
        }


            //Make colors file
            if(fs.existsSync(`../${projectName}/src/styled-components/colors.js`)) {
              console.log('The colors.js file already exists');
            }
            else {
              fs.writeFileSync(`../${projectName}/src/styled-components/colors.js`, colorDef);
              console.log("colors.js File Created");
            }


            //Make global file
            if(fs.existsSync(`../${projectName}/src/styled-components/global.js`)) {
              console.log('The global.js file already exists');
            }
            else {
              fs.writeFileSync(`../${projectName}/src/styled-components/global.js`, globalDef);
              console.log("global.js File Created");
            }


            //Make styled-components pages directory
            if(fs.existsSync('../' + projectName + '/src/styled-components/pages')) {
              console.log('The styled-components pages directory already exists');
            }
            else {
              fs.mkdirSync('../' + projectName + '/src/styled-components/pages');
              console.log("styled-components pages directory created");
            }

                //Make styled-components pages files
                listOfPages.map((page) => {
                  if(fs.existsSync(`../${projectName}/src/styled-components/pages/${page}.js`)) {
                    console.log(`The styled-components pages ${page}.js file already exists`);
                  }
                  else {
                    fs.writeFileSync(`../${projectName}/src/styled-components/pages/${page}.js`, pageStyleDef(page));
                    console.log(`styled-components pages ${page}.js file created!`);
                  }
                })


            //Make styled-components components directory
            if(fs.existsSync('../' + projectName + '/src/styled-components/components')) {
              console.log('The styled-components components directory already exists');
            }
            else {
              fs.mkdirSync('../' + projectName + '/src/styled-components/components');
              console.log("styled-components components directory created");
            }


                //Make header.js style file
                if(fs.existsSync(`../${projectName}/src/styled-components/components/header.js`)) {
                  console.log('The header.js style file already exists');
                }
                else {
                  fs.writeFileSync(`../${projectName}/src/styled-components/components/header.js`, headerStyleDef);
                  console.log("header.js style File Created");
                }


                //Make footer.js style file
                if(fs.existsSync(`../${projectName}/src/styled-components/components/footer.js`)) {
                  console.log('The footer.js Style file already exists');
                }
                else {
                  fs.writeFileSync(`../${projectName}/src/styled-components/components/footer.js`, footerStyleDef);
                  console.log("footer.js Style File Created");
                }


    console.log("file creation successful!!");
    resolve()
  })
}

const changeDirectory = () => {
  return new Promise((resolve, reject) => {
    process.chdir(`../${projectName}`);
    console.log('New directory: ' + process.cwd());
    resolve()
  })
}

const yarn = () => {
  return new Promise((resolve, reject) => {
    console.log("executing yarn install...");
    exec('yarn', (err, stdout, stderr) => {
      if (err) return;
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      resolve()
    });
  })
}

const build = () => {
  return new Promise((resolve, reject) => {
    console.log("executing yarn build...");
    exec('yarn build', (err, stdout, stderr) => {
      if (err) return;
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      resolve()
    });
  })
}

const bundle = () => {
  return new Promise((resolve, reject) => {
    console.log("executing yarn bundle...");
    exec('yarn bundle', (err, stdout, stderr) => {
      if (err) return;
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      resolve()
    });
  })
}

const main = async () => {
  await question1();
  await question2();
  await question3();
  await question4();
  await question5();
  await question6();
  await action1();
  await changeDirectory();
  await yarn();
  await build();
  await bundle();
  rl.close();
};

main();
