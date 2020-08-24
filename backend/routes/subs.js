const { Router } = require('express')
const router = Router();

const Subs = require('../mongoose_model/Subs');


router.post('/sub', async (req,res)=>{
    const { email } =  req.body;

const errors = [];
if (!email) {
     errors.push("fill up the email")
}
if (errors.length > 0) {
    res.json({
         errors
    })
} else {

//check if email already exists
const emailExists =  await Subs.findOne({ email })
if (emailExists) return res.status(404).send('Email already exists')


const sub =  new Subs({ 
   email 
});

//SAVE TO DB
      try {
       //save the subscriber to the database
      const savedEmail = await sub.save();
       console.log(savedEmail)
     } catch (error) {
          res.status(400).send(error);
     }

}
})

module.exports = router;