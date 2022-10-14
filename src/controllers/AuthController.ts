import { prisma } from "../utils/prisma";
import {Request, Response} from 'express';
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export class AuthController {

  async authenticate(req: Request,res: Response) {

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({where: { email }})
    
    if(!user) {
      return res.json({error : "User not found"})
    }
    
    const isValidPassword = await compare(password, user.password);
    
    if(!isValidPassword) {
      return res.json({error: "password not valid "})
    }
  
    const token = sign({id: user.id}, "secret", {expiresIn: "1d"});

    const { id } = user;

    return res.json({ user: {id, email}, token })
  }
}
