import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRespository";

class AnswerController{
// http://localhost:3333/answers/4?u=451ea967-b5a6-4ef6-b713-103f90db1e2b
    async execute(req: Request , res: Response){
        const {value} = req.params
        const {u} = req.query

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        })

        if(!surveyUser){
            throw new AppError("Survey User does not exists!")
            // return res.status(400).json({
            //     error: "Survey User does not exists!"
            // })
        }
        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);
        return res.json(surveyUser);


    }
}

export { AnswerController }
