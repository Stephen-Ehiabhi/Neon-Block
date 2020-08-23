const { Router } = require('express')
const router = Router();

const Subs = require('../mongoose_model/Subs');

router.post('/sub', async (req,res)=>{
    const { email } =  req.body;

     try {
       //save the subscriber to the database
       const savedEmail = await Subs.create({ email });
       console.log(savedEmail)
     } catch (error) {
          res.status(400).send(error);
     }

})

module.exports = router;