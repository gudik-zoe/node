import { ConfirmAuthentication } from '../models/confirmAuthentication';
import { UserModel } from '../models/user';
const User = require('../collections/user');
const errorHandler = require('../utility/errorHandler');
exports.randomStringGenerator = () => {
  return (
    Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, 5) + Math.floor(Math.random() * 5).toString()
  );
};

exports.checkUserTemporaryPassword = (
  receivedBody: ConfirmAuthentication,
  theUser: UserModel
) => {
  if (theUser.temporaryPasswordCreationTs && theUser.temporaryPassword) {
    if (
      checkValidity(theUser.temporaryPasswordCreationTs) &&
      checkTemporaryPassword(
        theUser.temporaryPassword,
        receivedBody.temporaryPassword
      )
    ) {
      return true;
    }
  }
};

function checkValidity(date: Date) {
  if (Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60)) < 5) {
    return true;
  }
  throw errorHandler.badRequest(
    'temporary password timeout click here generate a new temporary password'
  );
}

function checkTemporaryPassword(
  enteredTemporaryPassword: string,
  dbTemporaryPassword: string
) {
  if (enteredTemporaryPassword === dbTemporaryPassword) {
    return true;
  }
  throw errorHandler.badRequest('invalid temporary password');
}
