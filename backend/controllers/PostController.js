import PostModel from "../models/Post.js";
import {validationResult} from "express-validator";
export const getAll = async (req, res) => {
    try  {
        const posts = await  PostModel.find().populate('user').exec();
        res.json(posts)
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Не удалось получить ", error: e})
    }
}
export const getOne = async (req, res) => {
    try {
        const {id} = req.params;
        PostModel.findOneAndUpdate(
         {
                _id: id
            },
        {
                $inc: {viewsCount: 1}
            },
       {
                returnDocument: "after",
            },
       (error, doc) => {
                if(error) {
                    res.status(500).json({message: "Не удалось вернуть статью"})
                }
                if (!doc) {
                   return res.status(404).json({
                       message: "Статья не найдена"
                   })
                }
                res.json(doc)
            },
       )
    }catch (e) {

    }
}
export const create = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId
        });
        const post = await doc.save();
        res.json(post)
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Не удалось создать статью", error: e})
    }
}
export const update = async (req, res) => {
    try {
        const {id} = req.params;
        await  PostModel.updateOne({_id: id},
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                user: req.userId,
                tags:  req.body.tags,
            });
        res.json({success: true})

    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Не удалось обновить статью"})
    }
}
export const remove = async (req, res) => {
    try {
        const {id} = req.params;
         PostModel.findOneAndDelete({_id: id}, (err, doc) => {
            if(err) {
                return res.status(500).json({message: "Не удалость удалить статью"})
            }
            if(!doc) {
                return  res.status(404).json({message: "Статья не найдена"})
            }
            res.json({success: true})
        });
    }catch (e) {
        res.json({message: "Статья не найдена"})
    }
}
