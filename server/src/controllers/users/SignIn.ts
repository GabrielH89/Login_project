import { Request, Response } from "express";
import User from "../../models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const signIn = async (req: Request, res:Response) => {
    try{
        const {email, password} = req.body;

        if(email === "" ||  password === "") {
            res.status(400).json({msg: "Please, fill all required inputs"});
        }

        const user = await User.findOne({where: {email: email}}) 
        
        if(!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(404).json({msg: "Invalid email or password"});
        }

        const token = await jwt.sign({id: user.user_id}, process.env.JWT_KEY || 'default_secrete', {
            expiresIn: '2h'
        });

        await user.update({sessionToken: token});

        return res.status(200).json({msg: "Login successful", token, user_id: user.user_id});

    }catch(error) {
        res.send(500).json({msg: "Error " + error});
    }
} 

export default signIn;