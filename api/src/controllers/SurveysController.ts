import {Response, Request} from "express"
import { getCustomRepository } from "typeorm";
import { SurveryRepository } from "../repositories/SurveysRespository";

class SurveysController{
    async create(req: Request, res: Response){
        const {title , description} = req.body;

        const surveryRepository = getCustomRepository(SurveryRepository);
    
        const survey = surveryRepository.create({
            title,
            description
        });

        await surveryRepository.save(survey)

        return res.status(201).json(survey);
    }

    async show(req: Request, res: Response){
        const surveryRepository = getCustomRepository(SurveryRepository);

        const all = await surveryRepository.find();

        return res.json(all);
    }
}

export {SurveysController}