var fs = require('fs');
var readline = require('readline');
var cp = require('child_process');
var path = require('path');

var projectName ='';

var rl = readline.createInterface(process.stdin, process.stdout);

rl.question("What is the project name?", function(answer){
  projectName = answer;

  var index = `var express = require('express');
  var bodyParser = require('body-parser');
  var cors = require('cors');
  var mongoose = require('mongoose');


  var mainCtrl = require('.mainCtrl');


  var app = express();
  app.use(bodyParser.json());
  app.use(cors());
  app.use(express.static(__dirname + '/public'));

  var mongoUri = "mongodb://localhost:27017/${projectName}";
  mongoose.connect(mongoUri);
  mongoose.connection.once('open', function(){
    console.log("Connected to mongoDB");
  });

  app.post('/user', mainCtrl.create);
  app.get('/user', mainCtrl.read);
  app.put('/user/:id', mainCtrl.update);
  app.delete('/user/:id', mainCtrl.delete);

  app.listen(9000, function(){
    console.log("listening to 9000");
  });
  `;

  var model = `var mongoose = require('mongoose');

  var mainSchema = new mongoose.Schema({
      username: {type: String, required:true },
      email: {type: String, required: true},
      password: {type: String, required: true }
  });

  module.exports = mongoose.model('User', mainSchema);
  `;

  var ctrl = `var mainSchema = require('./model');

  module.exports = {
    create: function(req, res) {
      var user = new userModel(req.body);
      user.save(function(err, result){
        if (err) {
          res.send(err);
        }
        res.send(result);
      });
    },
    read: function(req, res) {
      userModel
      .find(req.query)
      .exec(function (err, result) {
        if (err) {
          res.send(err);
        }
        res.send(result);
      });
    },
    update: function(req, res){
      userModel
      .findByIdAndUpdate(req.params.id, req.body, function(err, result){
        if (err) {
          res.send(err);
        }
        res.send(result);
      });
    },
    delete: function(req, res){
      userModel
      .findByIdAndRemove(req.params.id, req.body, function(err, result){
        if (err) {
          res.send(err);
        }
        res.send(result);
      });
    }
  };
  `;

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

  //Make model.js
  if(fs.existsSync(projectName + '/model.js')) {
    console.log('The model.js file already exists');
  }
  else {
    fs.writeFileSync(projectName + '/model.js', model);
    console.log("model.js File Created");
  }

  //Make mainCtrl.js
  if(fs.existsSync(projectName + '/mainCtrl.js')) {
    console.log('The mainCtrl.js file already exists');
  }
  else {
    fs.writeFileSync(projectName + '/mainCtrl.js', ctrl);
    console.log("mainCtrl.js File Created");
  }

  //Make .gitignore file
  if(fs.existsSync(projectName + '/.gitignore')) {
    console.log('The .gitignore file already exists');
  }
  else {
    fs.writeFileSync(projectName + '/.gitignore', 'node_modules');
    console.log(".gitignore File Created");
  }

  process.exit();
});
