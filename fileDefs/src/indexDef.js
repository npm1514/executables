module.exports = (listOfPages) => {
  const pgCap = listOfPages.map(page => {
    return page.slice(0,1).toUpperCase() + page.slice(1);
  })
  return `import express from "express";
import fetch from "node-fetch";
import React from "react";
import { renderToString } from "react-dom/server";

${listOfPages.map((page, i) => {
  return `import ${pgCap[i]}Root from "./roots/${pgCap[i]}Root";`
}).join('\n')}

import { ServerStyleSheet } from 'styled-components';

import fs from 'fs';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';

var PORT = process.env.PORT || 3003;

const app = express();
app.use(compression());
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

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

app.get('/health', (req, res) => res.send('OK'));

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
