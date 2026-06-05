// dto/paginated-users-response.dto.ts

import { Profile } from "../profile.schema";



export class GetProfilesQueryReturnDto {

  profiles: Profile[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };

}