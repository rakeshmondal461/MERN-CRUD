const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ObjectId = require('mongoose').ObjectId;
const customer = require('./models/customer');
const router = express.Router();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.urlencoded({ extended: false }));

app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

mongoose.connect('mongodb://localhost:27017/myfirstmongodb', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', () => { return console.log("Connection failed. Something went wrong!") });
db.once('open', () => {
    console.log('Database Connected.')
});

router.get('/users',(req,res)=>{
    customer.find((err,data)=>{
        res.send(data)
    }).catch(err=>{
        console.log("Something went wrong.");
    })

});

router.post('/usersData/',(req,res)=>{
    
    customer.findOneAndUpdate({_id:req.body.id},req.body,{new:true},(err,data)=>{
        if(err){
            console.log('Data not available. Something went wrong !');
        }else{
            res.send(data)
        }
    });

});
// create user
router.post('/users/create', (req, res)=>{
    const { name, mob, uid } = req.body;
    const newCustomer = new customer({
        name,
        mob,
        uid
    });

    newCustomer.save((err) => {
        if (err) {
            console.log("Data not saved. Something went wrong !" + err);
        } else {
            console.log("Data Inserted !")
        }
    })

});
// update user
router.post('/users/update', (req, res)=>{
    customer.findByIdAndUpdate({_id:req.body.id},req.body,(err, data)=>{
        if(err){
            console.log('Data not updated. Something went wrong !');
        }else{
            console.log('Updated Successfully');
        }
    })
});
// delete user
router.delete('/users/delete/:id', (req, res)=>{
    customer.findByIdAndDelete({_id:req.params.id},(err,data)=>{
        if(err){
            console.log("Something went wrong.");
        }else{
            console.log(data);
        }
    })
});

app.use('/api',router);

app.listen(4000);