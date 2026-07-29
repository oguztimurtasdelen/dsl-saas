import { User } from "../user.schema";
import { GetUsersQueryDto } from "./get-users-query.dto";

export class GetUsersQueryReturnDto {

  users: User[];
  pagination: GetUsersQueryDto;
  total: number;
  totalPages: number;

}