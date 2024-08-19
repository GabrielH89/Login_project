import { Request, Response } from "express";
import User from "../../models/User";
import bcrypt from 'bcrypt';

const signUp = async (req: Request, res: Response) => {
    try{
        const {name, email, password} = req.body;

        if(name === "" || email === "" ||  password === "") {
            res.status(400).json({msg: "Please, fill all required inputs"});
        }

        const emailExists = await User.findOne({where: {email: email}}) 

        if(emailExists) {
            return res.status(400).json({msg: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({name, email, password: hashedPassword});

        return res.status(201).json({msg: "User created with success"});
    }catch(error) {
        res.status(500).json({msg: "Error " + error});
    }
}

export default signUp;
