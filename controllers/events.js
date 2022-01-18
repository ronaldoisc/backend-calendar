const {response}=require('express');
const Event = require('../models/Event');

const  getEvents= async(req,res=response)=>{

    const events=await Event.find().populate('user','name');

     res.json({
         ok:true,
         events
      
     })


}

const createEvent= async(req,res=response)=>{

    //verify that exist the event


   const event=new Event(req.body);

   try {

    event.user=req.uid;
       
   const savedEvent= await event.save();

    res.status(201).json({
        ok:true,
       event: savedEvent


    });
       
   } catch (error) {
      

     return  res.status(500).json({
           ok:false,
           msg:'Contact the admin'
       })
       
   }

 
}

const updateEvent=async(req,res=response)=>{

    const eventId=req.params.id;
    try {

        const event=await Event.findById(eventId);
        if(!event){
            res.status(404).json({
                ok:false,
                msg:'there isn´t event with that id'
            })
        }
        
        if(event.user !=req.uid){
            return res.status(401).json({
                ok:false,
                msg:'You do not have permission to edit that event'

            });
        }

        const newEvent={
            ...req.body,
            user:req.uid
        }

        const eventUpdated=await Event.findByIdAndUpdate(eventId,newEvent,{new:true});

        res.status(201).json({
            ok:true,
            eventUpdated
        })

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'contact the admin'

        });

        
        
    }

}

const deleteEvent=async(req,res)=>{
    const eventId=req.params.id;
    try {

        const event=await Event.findById(eventId);
        if(!event){
            res.status(404).json({
                ok:false,
                msg:'there isn´t event with that id'
            })
        }
        
        if(event.user !=req.uid){
            return res.status(401).json({
                ok:false,
                msg:'You do not have permission to delete that event'

            });
        }


       await Event.findOneAndDelete(eventId);

        res.status(201).json({
            ok:true,
            msg:'the event was successfully deleted '
        })

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'contact the admin'

        });

        
        
    }
}


module.exports={
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}