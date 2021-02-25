import { EntityRepository, Repository } from "typeorm";
import { Survey } from "../models/Surveys";

@EntityRepository(Survey)
class SurveryRepository extends Repository<Survey>{

}

export {SurveryRepository}