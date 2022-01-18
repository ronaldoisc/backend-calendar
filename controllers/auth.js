const { json } = require("express/lib/response");

const bcrypt=require('bcryptjs');
const User = require("../models/User");
const { generateJWT } = require("../helpers/jwt");

const createUser= async(req,res=response)=>{

    const {email,password}=req.body;


    try {

        let user=await User.findOne({email:email})

        if(user !=null){
            return res.status(400).json({
                ok:false,
                msg:'Un usuario existe con ese correo'
            })

        }
         user=new User(req.body);
         const salt=bcrypt.genSaltSync();
         user.password=bcrypt.hashSync(password,salt);

          await user.save();

         const token=await generateJWT(user.id,user.name);
        
    
        res.status(201).json({
            ok:true,
           uid:user.id,
           name:user.name,
           token
            
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el servidor'
        })
        
    }
   
};


const loginUser= async(req,res=response)=>{

   const {email,password}=req.body;
   try {
   
    let user=await User.findOne({email:email})

    if(!user){
        return res.status(400).json({
            ok:false,
            msg:'El usuario no existe en la bd'
        })

    }

    const isValidPassword=bcrypt.compareSync(password,user.password);
    if(!isValidPassword){
        return res.status(400).json({
            ok:false,
            msg:'Password incorrecto'
        })

    }
    
   
    const token=await generateJWT(user.id,user.name);
   
    res.json({
        ok:true,
        msg:'login',
        email,
        password,
        token:token
    })
       
   } catch (error) {
       
   }
};

const renewToken=async(req,res)=>{

    const uid=req.uid;
    const name=req.name;
    
    const token=await generateJWT(uid,name);

    res.json({
        ok:true,
        token
      
    })
};


module.exports={
    createUser,
    loginUser,
    renewToken
}