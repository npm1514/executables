module.exports = (projectName, listOfPages, authNeeded, listOfCollections) => {
  const pgCap = listOfPages.map(page => {
    return page.slice(0,1).toUpperCase() + page.slice(1);
  })
  return `import express from "express";
import fetch from "node-fetch";
import React from "react";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from 'styled-components';
import fs from 'fs';
import compression from 'compression';
import cors from 'cors';
import path from 'path';
import cron from 'node-cron';
import bodyParser from 'body-parser';${authNeeded ? `\nimport passport from 'passport';
import session from 'express-session';` : ``}${listOfCollections.length ? `\nimport mongoose from 'mongoose';
import Cryptr from 'cryptr';
const cryptr = new Cryptr(config.key);
import config from './config';` : ``}${authNeeded ? `\nimport passportConfig from './config/passport';` : ``}${listOfCollections.length ? `\n` : ``}${listOfCollections.map((collection, i) => {
  return `\nimport ${collection}Ctrl from './controllers/${collection}Ctrl';`
}).join('')}

import { ${listOfPages.map((page, i) => {
  return `${pgCap[i]}Root`
}).join(', ')} } from './roots';

var PORT = process.env.PORT || 3003;${authNeeded ? `\npassportConfig(passport);` : ``}

const app = express();${authNeeded ? `\napp.use(session({
    secret: 'banana',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());` : ``}
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

cron.schedule('* * 1 * *', () => {
  fetch('http://www.cafejuniperslc.com/')
  .then(res => console.log("requested at " + new Date()));
});

var dataObj = {},
${listOfPages.map((page, i) => {
  return `${page}Bundle = ""`
}).join(',\n')};
${listOfPages.map((page, i) => {
  return `fs.readFile('./dist/js/${page}.bundle.min.js', "utf8", (err, data) => {
  if (err) console.log("ERR" ,err);
  ${page}Bundle = data || "";
})`
}).join('\n')}
${listOfPages.map((page, i) => {
  return `app.get('/${page}', (req, res) => {
  let data = "";
  res.set('Cache-Control', 'public, max-age=31557600');
  res.send(returnHTML(data, ${page}Bundle, ${pgCap[i]}Root, "${page}"));
});`
}).join('\n')};

app.get('/images/:id', (req, res) => {
  res.set('Cache-Control', 'public, max-age=31557600');
  res.sendFile(path.join(__dirname, '../images/' + req.params.id));
});
${authNeeded ? `app.post('/auth', passport.authenticate('local-signup'), userCtrl.login);
app.get('/getMe', userCtrl.getMe);
app.get('/logout', userCtrl.logout);
app.get('/users', userCtrl.read);
app.put('/users/:id', userCtrl.update);` : ``}
${listOfCollections.map((collection, i) => {
  if(authNeeded && i == 0) return ``
  return `app.get('/${collection}s', ${collection}Ctrl.read);
  app.get('/${collection}s/:id', ${collection}Ctrl.readOne);
  app.post('/${collection}s', ${collection}Ctrl.create);
  app.put('/${collection}s/:id', ${collection}Ctrl.update);
  app.delete('/${collection}s/:id', ${collection}Ctrl.destroy);\n`
}).join('\n')}

app.get('/health', (req, res) => res.send('OK'));

${listOfCollections.length ? `//var mongoUri = 'mongodb+srv://'+cryptr.decrypt(config.dbuser)+':'+cryptr.decrypt(config.dbpass)+'@${projectName}.bjixf.mongodb.net/${projectName}?retryWrites=true&w=majority';
//mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
//mongoose.connection.on('error', console.error.bind(console, 'connection error'));
//mongoose.connection.once('open', function(){
//  console.log("Connected to mongoDB");
//});\n` : ``}
app.listen( PORT, () => {
  console.log('Running on http://localhost:' + PORT)
});


// functions!!!!!!!!!!!!!

function getQueries(req, res){
  const qOb = {};
  const queries = req && req._parsedUrl && req._parsedUrl.query && req._parsedUrl.query.split('&') ? req._parsedUrl.query.split('&') : [];
  if(queries.length){
    queries.forEach((x) => {
        var y = x.split('=');
        qOb[y[0]] = y[1];
    });
  }
  return qOb;
}

function fetcher(url){
	return fetch(url)
    .then((response) => {
        if(response.status !== 200) throw Error(response.statusText);
        return response.json();
    }).then((json) => {
        return json;
    }).catch(errHandle)
}

function returnHTML(data, bundle, Page, title){
    const dataString = JSON.stringify(data);
    const sheet = new ServerStyleSheet();
    const body = renderToString(sheet.collectStyles(<Page data={data}/>));
    const styles = sheet.getStyleTags();

    return \`
            <html lang="en">
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>\${title}</title>
                <meta name="Description" content="\${title}">
                <style>
                  body { margin: 0; font-family: Helvetica; }
                  a { text-decoration: none; color: #000; }
                </style>
                \${styles}
              </head>
              <body>
                <script>window.os = window.os || {};</script>
                <script>window.__DATA__=\${dataString}</script>
                <div id="app" role="main">\${body}</div>
                <script>\${bundle}</script>
              </body>
            </html>
          \`;
}

function errHandle(err){
    console.log(err);
}
`;
}
