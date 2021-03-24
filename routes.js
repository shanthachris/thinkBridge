var express = require('express')
var router = express.Router()

var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()
inventory_list = [
  {id:'inv_01',name:'pencil',description:'desc 1',price:50},
  {id:'inv_02',name:'item 2',description:'desc 2',price:20},
  {id:'inv_03',name:'item 3',description:'desc 3',price:20},
  {id:'inv_04',name:'item 4',description:'desc 4',price:20},
  {id:'inv_05',name:'item 5',description:'desc 5',price:20},
  {id:'inv_06',name:'item 6',description:'desc 6',price:20},
  {id:'inv_07',name:'item 7',description:'desc 7',price:20},
]
// define the home page route
router.get('/', function (req, res) {
  res.send(inventory_list)
})

router.get('/deleteitem?:id',function(req,res){
  for(var i=0;i<this.inventory_list.length;i++){
    if(i==req.query.id){
      this.inventory_list.splice(i,1)
    }
  }
  res.send(inventory_list);
});

router.post('/additem',jsonParser, function (req, res) {
    let tempList ={};
    tempList['id'] = "inv_0"+parseInt(this.inventory_list.length+1);
      tempList['name'] = req.body.name;
      tempList['description'] = req.body.description;
      tempList['price'] = req.body.price ;
      this.inventory_list.push(tempList);
      res.send(inventory_list)
});


module.exports = router