// dto/paginated-users-response.dto.ts

import { Profile } from "../profile.schema";
import { GetProfilesQueryDto } from "./get-profiles-query.dto";


export class GetProfilesQueryReturnDto {
  profiles: Profile[];
  pagination: GetProfilesQueryDto;
  total: number;
  totalPages: number;

}