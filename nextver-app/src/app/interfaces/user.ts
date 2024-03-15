import { UserTypeDto } from '../api/dtos/user-type.dto';

export interface User {
  id: number;
  name: string;
  userType: UserTypeDto;
}
