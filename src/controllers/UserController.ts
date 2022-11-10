import { prisma } from "../utils/prisma";
import {Request, Response} from 'express';
import { hash } from "bcryptjs";

export class UserController {


  async index(req: Request,res: Response) {
    const users = await prisma.user.findMany();

    return res.json({ users })
  }

  async findUser(req: Request,res: Response){
    try {
      const { id } = req.params;

      const user = await prisma.user.findUnique({where: {id: Number(id)}});

      if(!user) return res.json({error : 'User not found'});

      return res.json({user})
    } catch (error) {
      return res.json({error})
    }
  }

  async updateUser(req: Request,res: Response) {
    try {
      const { id } = req.params
      const {name, email} = req.body

      let user = await prisma.user.findUnique({where: {id: Number(id)}})

      if(!user){
        return res.json({error: "not found user"})
      }

      user = await prisma.user.update({where: {id: Number(id)}, data: {name,email}})

      return res.json({user})
    } catch (error) {
      return res.json({error})
    }
  }
 
  async store(req: Request,res: Response) {

    const {name, email, password } = req.body;

    const userExists = await prisma.user.findUnique({where: { email }})
    
    if(userExists) {
      return res.json({error : "User exists"})
    }

    const hash_password = await hash(password,8); 
    
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash_password,
      },
    });

    return res.json({ user })
  }
  async delete(req: Request,res: Response){
    try {
      const { id } = req.params

      const user = await prisma.user.findUnique({where: {id: Number(id)}})

      if(!user) return res.json({error: "user not found "})

      await prisma.user.delete({where: {id: Number(id)}})

      return res.json({message: "user deleted successfully"})
    } catch (error) {
      return res.json({error})
    }
  }
}
