const express = require('express');
const path = require('path');
const logger = require('morgan');
const app = express();
const routes = require('./routes');
var cors = require('cors')

app.use(express.static(path.join(__dirname+ 'shopBridge')));
app.use('/api', routes);
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  app.use(function (req, res, next) {
    		if (res.status(404)) {
    			res.send('Page not found');
    		}
    	});
// app.use(cors(corsOptions)); 
app.get('/',cors(corsOptions), (req, res)=>{
    // res.sendFile(path.join(__dirname,'shopBridge/dist/shopBridge/index.html'))
    // res.json("app works")
    if(req){
        res.json({msg: 'This is CORS-enabled for only example.com.'})
        console.log("valid req")
    }
    else{
        console.log("invalid req")
    }
    
    });

const port =  3000;

app.listen(port, (req, res)=>{
console.log(`RUNNING on port ${port}`);
});