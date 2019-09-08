var fs = require('fs');
var readline = require('readline');
var cp = require('child_process');
var path = require('path');

var projectName ='';

var rl = readline.createInterface(process.stdin, process.stdout);

rl.question("What is the project name?", function(answer){
  projectName = answer;

  var ind = `<!DOCTYPE html>
  <html ng-app="${projectName}">

    <head>
      <title>${projectName}</title>
      <meta name="description" content="${projectName}">
      <meta name="keywords" content="${projectName}">
      <meta property="og:site_name" content="${projectName}">
      <meta property="og:title" content="${projectName}">
      <meta property="og:description" content="${projectName}">
      <meta property="og:image" content="">
      <meta property="og:url" content="">
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <link href="styles.css" rel="stylesheet" type="text/css">
    </head>

    <body ng-controller="mainCtrl" ng-cloak>
      <header>
      </header>

      <div>
        <div>
        </div>
      </div>

      <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.js"></script>
    	<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.15/angular-ui-router.min.js"></script>
      <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
      <script src="./app.js"></script>
      <script src="./mainCtrl.js"></script>
      <script src="./mainService.js"></script>

    </body>

  <html>
  `;

  var style = `body, header, footer {
    width: 100%;
  }
  p, h1, h2, h3, h4, h5, h6 {
    border: 0;
    margin: 0;
  }
  `;

  var app = `angular.module("${projectName}", ['ui.router'])
  .config(function($urlRouterProvider, $stateProvider) {
      $stateProvider
      .state("home", {
        url: "/home",
        templateUrl: "home.html"
      })
      .state('about', {
        url: '/about',
        templateUrl: 'templates/about.html'
      });
      $urlRouterProvider
        .otherwise('/sell');
  });
  `;

  var ctrl = `angular.module("${projectName}").controller("mainCtrl", function($scope, mainService) {
    $scope.products = {};
    $scope.getProducts = function () {
      mainService.getProducts().then(function(response){
        $scope.products = response;
      });
    };
    $scope.getProducts();

    $scope.postProducts = function (name, description, price) {
      var obj = {name: name, description: description, price: price};
      console.log(obj);
      mainService.postProducts(obj).then(function(response){
        $scope.products = response;
      });
    };
    $scope.changeProducts = function (product) {
      mainService.changeProducts(product).then(function(response){
        $scope.products = response;
      });
    };
    $scope.deleteProducts = function (product) {
      mainService.deleteProducts(product._id).then(function(response){
        $scope.products = response;
      });
    };
  });
  `;

  var serv = `angular.module("${projectName}").service("mainService", function($http) {
    this.getProducts = function () {
      return $http ({
        method: "GET",
        url: '/api/products',
      }).then(function (response) {
        return response.data;
      });
    };
    this.postProducts = function (obj) {
      return $http ({
        method: "POST",
        url: '/api/products',
        data: obj
      }).then(function (response) {
        return response.data;
      });
    };
    this.changeProducts = function (product) {
      return $http ({
        method: "PUT",
        url: '/api/products/' + product._id,
        data: product
      }).then(function (response) {
        return response.data;
      });
    };
    this.deleteProducts = function (id) {
      return $http ({
        method: "DELETE",
        url: '/api/products/' + id
      }).then(function (response) {
        return response.data;
      });
    };
  });
  `;

  //Make project directory
  if(fs.existsSync(projectName)) {
    console.log('The Project directory already exists');
  }
  else {
    fs.mkdirSync(projectName);
    console.log("Project Directory Created");
  }

  //Make public directory
  if(fs.existsSync(projectName + '/public')) {
    console.log('The Public directory already exists');
  }
  else {
    fs.mkdirSync(projectName + '/public');
    console.log("Public Directory Created");
  }

  //Make index.html
  if(fs.existsSync(projectName + '/public/index.html')) {
    console.log('The index.html file already exists');
  }
  else {
    fs.writeFileSync(projectName + '/public/index.html', ind);
    console.log("index.html File Created");
  }

  //Make styles.css
  if(fs.existsSync(projectName + '/public/styles.css')) {
    console.log('The styles.css file already exists');
  }
  else {
    fs.writeFileSync(projectName + '/public/styles.css', style);
    console.log("styles.css File Created");
  }

  //Make app.js
  if(fs.existsSync(projectName + '/public/app.js')) {
    console.log('The app.js file already exists');
  }
  else {
    fs.writeFileSync(projectName + '/public/app.js', app);
    console.log("app.js File Created");
  }

  //Make mainCtrl.js
  if(fs.existsSync(projectName + '/public/mainCtrl.js')) {
    console.log('The mainCtrl.js file already exists');
  }
  else {
    fs.writeFileSync(projectName + '/public/mainCtrl.js', ctrl);
    console.log("mainCtrl.js File Created");
  }

  //Make mainService.js
  if(fs.existsSync(projectName + '/public/mainService.js')) {
    console.log('The mainService.js file already exists');
  }
  else {
    fs.writeFileSync(projectName + '/public/mainService.js', serv);
    console.log("mainService.js File Created");
  }
  process.exit();
});
