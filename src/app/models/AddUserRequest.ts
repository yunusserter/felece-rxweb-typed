import { Address } from './Address';

export interface AddUserRequest {
  firstName: string;
  lastName: string;
  dob: Date;
  address: Address;
  phone: string;
}
