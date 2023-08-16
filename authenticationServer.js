/* JWT token , reset password feature*/
const express = require("express")
const PORT = 3000;
const app = express();
const bodyParser=require('body-parser');
app.use(bodyParser.json());
var arrayList= [];
i=1;
app.post('/signup',(req,res)=>{
  id = i++;
  firstName = req.body.firstName;
  lastName = req.body.lastName;
  email = req.body.email;
  password = req.body.password;

  var objList = {
    id,firstName,lastName,email,password
  } 
    if(arrayList.length === 0)
    {
      arrayList.push(objList)
      res.status(201).json({"message":"successfully updated"});
    }
  else{
    var objstatus=false;
    for(let j=0;j<arrayList.length;j++){ 
      if(objList.email === arrayList[j].email){
        objstatus=true;
      }
    }
      if(objstatus){
        res.status(400).json({"message":"email already exist"});
      }
      else{
        arrayList.push(objList);
        res.status(201).json({"message":"successfully updated"});
      }
  }
})

app.post('/login',(req,res)=>{
  var objstatus = false;
  email = req.body.email;
  password = req.body.password;
  for(let i=0;i<arrayList.length;i++){
    if(email === arrayList[i].email && password === arrayList[i].password )
    {
  objstatus=true;
    }
  }
  if(objstatus){
    res.send("logged in successfully");
  }
  else{
    res.send("username & password not in database. please sign in!")
  }
})

app.get('/data',(req,res)=>{
  var email = req.headers.email;
  var password = req.headers.password;
  let userFound = false;
  for (var i = 0; i<arrayList.length; i++) {
    if (arrayList[i].email === email && arrayList[i].password === password) {
        userFound = true;
        break;
    }
  }

  if (userFound) {
    let usersToReturn = [];
    for (let i = 0; i<arrayList.length; i++) {
        usersToReturn.push({
            firstName: arrayList[i].firstName,
            lastName: arrayList[i].lastName,
            email: arrayList[i].email
        });
    }
    res.json({
      arrayList
    });
  } else {
    res.send("not working");
  }
})

// write your logic here, DONT WRITE app.listen(3000) when you're running tests, the tests will automatically start the server
app.listen(3000,(req,res)=>{
  console.log("running on port 3000");
})
module.exports = app;
