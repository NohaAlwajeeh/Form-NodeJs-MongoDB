const { parse } = require('querystring');
const http = require('http');
const fs = require("fs");
function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}
const server = http.createServer((req, res) => {
   if(req.method=='POST')
    {
      collectRequestData(req, result => {
        console.log(result);
 
        res.end(`Welcome  ${result.fname} \n
            Your age is ${result.age}`);
         
    });   
    }
    else{
        fs.readFile("./index.html",(err,data) =>{
             res.end(data);
        });
   
    }
});
server.listen(3000);