import { UserTypeDto } from './user-type.dto';

export interface UserForDetailsDto {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  userType: UserTypeDto;
}
