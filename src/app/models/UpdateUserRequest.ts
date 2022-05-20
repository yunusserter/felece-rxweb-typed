import { Address } from './Address';

export interface UpdateUserRequest {
  id: number;
  firstName: string;
  lastName: string;
  dob: Date;
  isVerified: boolean;
  address: Address;
  phone: string;
}
