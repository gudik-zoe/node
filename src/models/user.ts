const { Role } = require('../models/role');
export class UserModel {
  id?: string;
  firstName?: string;
  lastName?: string;
  email!: string;
  password!: string;
  confirmPassword!: string;
  gender?: string;
  temporaryPassword?: string;
  temporaryPasswordCreationTs?: Date;
  profilePhoto?: string;
  from?: string;
  role?: string;
}
