// It allows user to store task details
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const path= require('path')
app.use(bodyParser.json());
var fs = require('fs')
app.use(express.static(path.join(__dirname + "JobQueue")))
app.get('/todos',(req,res)=>{
  
fs.readFile('a.txt','utf8',(err,data)=>{
  if(err){
    console.log("error");
  }
  else{
    var datajson= JSON.parse(data);
    res.send(datajson)
  }
});
});

app.get('/todos/:id',(req,res)=>{
  let jsonvalue =[];
  fs.readFile('a.txt','utf8',(err,data)=>{
    if(err){
      console.log("error");
    }
    else{
      jsonvalue=JSON.parse(data)
      const id = req.params.id;
      for(let i=0;i<jsonvalue.length;i++)
      {
        if(jsonvalue[i].id === parseInt(id)){
          res.json(id+": "+JSON.stringify(jsonvalue[i]))
          console.log("Item found - Value of "+i+":"+JSON.stringify(jsonvalue[i]));
        } 
        else{
          res.status(404).send();
        }      
      } 
    }
  });
});

app.post('/todos',(req,res)=>{
  var title = req.body.title;
  var completed = req.body.completed;
  var description = req.body.description;

  var arrayList=[];
  fs.readFile('a.txt','utf8',(err,data)=>{
if(err){
  console.log("error")
}
if(data){
  var readData = JSON.parse(data);
  arrayList=readData;
}
var ids=arrayList.length;
var id = ids++;
var jsondata={
  id,
  title,
  completed,
  description
}
arrayList.push(jsondata)
var jsonpush = JSON.stringify(arrayList,null,2);
  fs.writeFile('a.txt',jsonpush,(err)=>{
    if(err){
      res.send("error in writing to the file");
    }
    else{
      res.send("data written successfuly ");
    }
  });
});
});

app.delete('/todos/:id',(req,res)=>{
  var id = req.params.id;
  var arrayList=[];
  var pushdata=[];
  fs.readFile('a.txt','utf8',(err,data)=>{
if(err){
  console.log("error")
}
if(data){
  var readData = JSON.parse(data);
  arrayList=readData;
  for(let i=0;i<arrayList.length;i++){
    if(arrayList[i].id === parseInt(id)){
      console.log("object is removed from list")      
        }
       else{
        console.log("this value is pushed to list")
        pushdata.push(arrayList[i]);
       } 
  }
  console.log(pushdata);
  var jsonpushdata = JSON.stringify(pushdata);
  fs.writeFile('a.txt',jsonpushdata,(err)=>{
    if(err){
      console.log("error occurred in writing to the file")
    }
    else{
      res.send("data uploaded successfully");
    }
  })
}
})
})

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,"index.html"))
})
app.listen(3009,()=>{
  console.log("running on port 3009");
})
module.exports = app;
