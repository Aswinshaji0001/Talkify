import loginSchema from './models/Login.model.js'
import chatSchema from './models/chats.model.js'
import memberSchema from './models/chatmembers.model.js'
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
import nodemailer from "nodemailer";
const { sign } = pkg;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "aswinshaji0001@gmail.com",
      pass: "qauv folf fqwa lajb",
    },
  });

export async function signUp(req, res) {
    try {
      const { email, username, password, cpassword,profile} = req.body;
      console.log(req.body);
      if (!(email && username && password && cpassword && profile))
        return res.status(404).send({ msg: "Fields are empty" });
      if (password != cpassword)
        return res.status(404).send({ msg: "Password mismatching" });
      bcrypt.hash(password, 10).then((hashedPassword) => {
        console.log(hashedPassword);
        loginSchema
          .create({ email, username, password: hashedPassword,profile})
          .then(async () => {
            console.log("Success");
            return res.status(201).send({ msg: "Suceess" });
          })
          .catch((error) => {
            console.log(error);
            return res.status(404).send({ msg: "Not registered" });
          });
      });
    } catch (error) {
      console.log(error);
    }
  }

  export async function signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await loginSchema.findOne({ email });
      console.log(user);
      if (!(email && password))
        return res.status(404).send({ msg: "Fields are empty" });
      if (user === null) return res.status(404).send({ msg: "User not found" });
      const success = await bcrypt.compare(password, user.password);
      console.log(success);
      if (success != true)
        return res.status(404).send({ msg: "Email or Password mismatch" });
      const token = await sign({ userId: user._id }, process.env.JWT_KEY,{expiresIn: "24h"});
      console.log(token);
      return res.status(201).send({ msg: "successfully logged in",token});
    } catch (error) {
      return res.status(404).send({ msg: "Error" });
    }
  }

  export async function verifyMail(req, res) {
    try {
      const { email } = req.body;
      console.log(req.body);
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
        to: `${email}`, // list of receivers
        subject: "OTP", // Subject line
        text: "your otp", // plain text body
        html: `<!DOCTYPE html>
              <html lang="en">
              <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Email Verification</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  padding: 20px;
                  text-align: center;
                  border-radius: 8px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                h1 {
                  font-size: 24px;
                  color: #333333;
                }
                p {
                  font-size: 16px;
                  color: #555555;
                }
                .button {
                  display: inline-block;
                  background-color: #4CAF50;
                  color: white;
                  padding: 15px 30px;
                  text-decoration: none;
                  font-size: 18px;
                  border-radius: 4px;
                  margin-top: 20px;
                  text-transform: uppercase;
                }
              </style>verifyMail
              </head>
              <body>
              <div class="container">
                <h1>Email Verification</h1>
                <p>Click the button below to verify your email address:</p>
                
                <a href="http://localhost:5173/forgot" class="button">Verify Email</a>
              </div>
              </body>
              </html>
    `, // html body
      });
  
      console.log("Message sent: %s", info.messageId);
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  
      return res
        .status(201)
        .send({ msg: "confirmation mail set success", email });
    } catch (error) {
      return res.status(404).send({ msg: "error" });
    }
  }

  export async function resetPassword(req,res) {
    const {email,password,cpassword}=req.body;
    console.log(req.body);
    
    if(password!==cpassword)
        return res.status(404).send({msg:"Password mismatch"})
    const user = loginSchema.findOne({email})
    if(!user)
        return res.status(404).send({msg:"user not found"})
    bcrypt.hash(password,10).then((hashedPassword)=>{
        console.log(hashedPassword);
        loginSchema.updateOne({email},{$set:{password:hashedPassword}}).then(()=>{
            return res.status(200).send({msg:"success"});
        }).catch((error)=>{
            return res.status(404).send({msg:"Not registered"})
        })
    }).catch((error)=>{
        return res.status(404).send({msg:error}); 
    })
}

export async function profile(req,res) {
    try {
         const id = req.user.userId;
        const data = await loginSchema.findOne({_id:id})
        return res.status(201).send({data})
    } catch (error) {
        return res.status(404).send({msg:error}); 

    }
    
}

export async function getAllContacts(req,res) {
  try {
        const id = req.user.userId;
        const data = await loginSchema.find({ _id: { $ne: id } });
        return res.status(201).send(data)
  } catch (error) {
    return res.status(404).send({msg:error}); 
  }
  
}

export async function sendMessage(req,res) {
  try {
        const uid = req.user.userId;
        const {recieverId,message,date,time} = req.body;
        console.log(recieverId);
        
        const data = await chatSchema.create({senderId:uid,recieverId:recieverId,message,date,time,seen:false})  
        console.log(data);
         
        const data1 = await memberSchema.create({senderId:uid,recieverId:recieverId})
        return res.status(201).send({data,data1})   
 
  } catch (error) {
    return res.status(404).send({msg:error}); 

  }
}

export async function getMessages(req, res) {
  try {
    const uid = req.user.userId; 
    const { id } = req.params; 
    const unseen=await chatSchema.find({
      senderId:id,recieverId:uid,seen:false});
    if(unseen)
    {
        const updateunseen=await chatSchema.updateMany({senderId:id,recieverId:uid},{$set:{seen:true}});
        
    }
    const data = await chatSchema.find({
      $or: [
        { senderId: uid, recieverId: id },
        { senderId: id, recieverId: uid }, 
      ]
    }).sort({ createdAt: 1 }); 

    if (data.length === 0) {
    } else {
    }
    return res.status(200).send(data); 
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).send({ msg: error.message }); 
  }
}

export async function getMembers(req, res) {
  try {
    const _id = req.user.userId;
    const receivers=await memberSchema.find({$or:[{senderId:_id},{recieverId:_id}]});
        const chatMemberPromises = receivers.map(async (receiver) => {
            if(receiver.senderId==_id)
                return await loginSchema.findOne({ _id: receiver.recieverId},{username:1,profile:1});
            if(receiver.recieverId==_id)
                return await loginSchema.findOne({ _id: receiver.senderId },{username:1,profile:1});
        });
        const chatMembers = await Promise.all(chatMemberPromises);  
        const chatmembers=Array.from(new Map(chatMembers.map(member => [member.username, member])).values()).reverse()  
    
        
        const countPromises=chatmembers.map(async(member)=>{
          
          return await chatSchema.countDocuments({senderId:member._id,seen:false})
      })
      const counts=await Promise.all(countPromises);
      console.log(counts);
      
      const messagePromises=chatmembers.map(async(member)=>{

        
        
        return await chatSchema.findOne({$or:[{senderId:_id,recieverId:member._id},{senderId:member._id,recieverId:_id}]},{message:1,seen:1}).sort({ _id: -1 })
    })

    const lmessages=await Promise.all(messagePromises);
    console.log(lmessages);
    
    
    return res.status(201).send({chatmembers,counts,lmessages}); 
  } catch (error) {
    return res.status(404).send({ msg: error });
  }
}

export async function getUser(req,res) {
  try {
        const id = req.user.userId;
        const data = await loginSchema.findOne({_id:id})
        return res.status(201).send(data)   
  } catch (error) {
    return res.status(404).send({ msg: error });

  }
  
}

export async function updateUser(req,res) {
  try {
        const id =req.user.userId;
        const {...details} = req.body;
        const data = await loginSchema.updateOne({_id:id},{$set:{...details}})
        return res.status(201).send(data)    
  } catch (error) {
    return res.status(404).send({ msg: error });

  }
  
}

export async function deleteMessage(req,res) {
  try {
        
        
        const id = req.user.userId;
        const { mid } = req.params;
        const data = await chatSchema.deleteOne({_id:mid,senderId:id})
        return res.status(201).send(data)    

  } catch (error) {
    return res.status(404).send({ msg: error });

  }
  
}

export async function getUserP(req,res) {
  try {
          const {id} = req.params;
          const data = await loginSchema.findOne({_id:id})
          return res.status(201).send(data)    
  } catch (error) {
    return res.status(404).send({ msg: error });

  }
  
}