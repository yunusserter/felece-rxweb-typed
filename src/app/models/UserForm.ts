import { Address } from './Address';
import { Phone } from './FileItem';

export interface UserForm {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  dob: Date;
  isAcceptedKvkk?: boolean;
  address: Address;
  phone: Phone;
}
