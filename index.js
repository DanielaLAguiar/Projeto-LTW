const http = require('http');
const fs = require('fs');
const hostname = 'twserver.alunos.dcc.fc.up.pt';
const port = 9040;

let htmlfile = '';
let cssfile = '';
let jsfile1 = '';
let jsfile2 = '';

uptodate();

function uptodate()
{
   fs.readFile('./index.html', function (err, html) {
    if (err) {
      throw err; 
    }       
    htmlfile = html;
  });

   fs.readFile('./style.css', function (err, html) {
    if (err) {
      throw err; 
    }       
    cssfile = html;
  });

  fs.readFile('./source.js', function (err, html) {
    if (err) {
      throw err; 
    }       
    jsfile1 = html;
  });

  fs.readFile('./request.js', function (err, html) {
    if (err) {
      throw err; 
    }       
    jsfile2 = html;
  });

  setTimeout(function(){ uptodate(); }, 1000);
}

const server = http.createServer((req, res) => {
  res.statusCode = 200;

  if(req.url.indexOf('.css') != -1){
   res.writeHead(200, {'Content-Type': 'text/css'});
   res.write(cssfile);
   res.end();
   return;
  }
  if(req.url.indexOf('.js') != -1){
   res.writeHead(200, {'Content-Type': 'text/javascript'});
   res.write(jsfile1);
   res.write(jsfile2);
   res.end();
   return;
  }

  res.writeHeader(200, {"Content-Type": "text/html"});  
  res.write(htmlfile);
  res.end();
});


server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});