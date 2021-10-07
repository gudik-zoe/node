import { ConfirmAuthentication } from '../models/confirmAuthentication';
import { UserModel } from '../models/user';
const User = require('../collections/user');
exports.randomStringGenerator = () => {
  return (
    Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, 5) + Math.floor(Math.random() * 5).toString()
  );
};

exports.checkUserTemporaryPassword = async (body: ConfirmAuthentication) => {
  const theUser: UserModel = await User.findOne({
    email: body.email,
  });
  if (theUser.temporaryPasswordCreationTs) {
    console.log(
      (new Date().getTime() - theUser.temporaryPasswordCreationTs.getTime()) /
        (1000 * 60)
    );
  }
  // if(theUser.temporaryPassword === body.temporaryPassword && theUser.temporaryPasswordCreationTs && (new Date().getTime() - theUser.temporaryPasswordCreationTs?.getTime()) )
};
