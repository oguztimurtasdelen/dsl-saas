// dto/paginated-users-response.dto.ts
import { Training } from "../training.schema";
import { GetTrainingsQueryDto } from "./get-trainings-query.dto";


export class GetTrainingsQueryReturnDto {
  trainings: Training[];
  pagination: GetTrainingsQueryDto;
  total: number;
  totalPages: number;

}