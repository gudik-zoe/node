const { Role } = require('../models/role');
export class UserModel {
  id?: String;
  firstName?: String;
  lastName?: String;
  email!: String;
  password!: String;
  confirmPassword!: String;
  gender?: String;
  temporaryPassword?: String;
  temporaryPasswordCreationTs?: Date;
  profilePhoto?: String;
  from?: String;
  role?: String;
}
