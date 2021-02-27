import { request, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRespository";
import * as yup from 'yup'
import { AppError } from "../errors/AppError";

class UserController {
 async create(req: Request, res: Response){
    const {name, email} = req.body
  
    const schema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required()
    })

    // if(!(await !schema.isValid(req.body))){
    //     return res.status(400).json({
    //         error: "Validation Failed"
    //     })
    // }

    try{
        await schema.validate(req.body, {abortEarly: false});
    }catch (err){
        throw new AppError(err)
        // return res.status(400).json({
        //             error: err
        //         })
    }

    const usersRepository =  getCustomRepository(UserRepository)

    const userAlreadyExists = await usersRepository.findOne({
        email
    })

    if(userAlreadyExists){
        throw new AppError("User already exists!")
        // return res.status(400).json({
        //     error: "User already exists!"
        // })
    }

    const user = usersRepository.create({
        name, email
    });

    await usersRepository.save(user);

    return res.status(201).json(user);
 }
}

export { UserController };
