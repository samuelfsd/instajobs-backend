import { prisma } from "../utils/prisma";
import {Request, Response} from 'express';


export class PostController {
  async createPost(req: Request, res: Response){
    const { title, content } = req.body
    const { id } = req.params

    try {
      const user = await prisma.user.findUnique({where: {id: Number(id)}})

      if(!user) return res.json({message: "user not exists "})

      const post = await prisma.post.create({
        data: {
          title,
          content,
          authorId: user.id,
        },
        include: {
          author: true
        }
      })

      return res.json(post)
    } catch (error) {
      return res.json({error})
    }
  }

  async listAllPosts(req: Request, res: Response){
    try {
      const posts = await prisma.post.findMany()

      return res.json(posts)
    } catch (error) {
      return res.json({error})
    }
  }

  async updatePost(req: Request, res: Response){
    const { id } = req.params

    const {title, content} = req.body

    try {
      const post = await prisma.post.findUnique({where: {id: Number(id)}})

      if(!post) return res.json({message: "post does not exists"})

      await prisma.post.update({
        where: {id: Number(id)},
        data: {title,content}
      });

      return res.json({message: "post updated successfully"})
    } catch (error) {
      return res.json({error})
    }
  }
  async delete(req: Request,res: Response){

    const { id } = req.params
    try {
      const post = await prisma.post.findUnique({where: {id: Number(id)}})

      if(!post) return res.json({message: "post does not exists"})
      
      await prisma.post.delete({
        where: {
          id: Number(id),
        },
      })
      res.json(post)
    } catch (error) {
      return res.json({error})
    }
  }
}