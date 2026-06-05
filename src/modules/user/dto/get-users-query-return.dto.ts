// dto/paginated-users-response.dto.ts

import { User } from "../user.schema";

export class GetUsersQueryReturnDto {

  users: User[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };

}