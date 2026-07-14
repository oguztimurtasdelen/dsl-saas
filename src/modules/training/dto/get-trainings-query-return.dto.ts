// dto/paginated-users-response.dto.ts
import { Training } from "../training.schema";


export class GetTrainingsQueryReturnDto {
  trainings: Training[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    trainingType: string;
    trainingStatus: string;
    trainingLevel: number;
    createdAt: string;
  };

}