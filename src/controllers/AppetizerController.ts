const appetizerSchema = require('../../dist/collections/appetizer.js');
const { validationResult } = require('express-validator');
const errorHandler = require('../utility/errorHandler');
import mongoose from 'mongoose';
import AbstractController from './AbstractController';

class AppetizerController extends AbstractController<
  mongoose.Model<mongoose.Document<any, any>, {}, {}>
> {
  getRepository(): mongoose.Model<mongoose.Document<'Appetizer', any>, {}, {}> {
    console.log('appetizer repo');
    return appetizerSchema;
  }
}
export default AppetizerController;

// exports.createMenu = async (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) => {
//   try {
//     if (errorHandler.checkForError(req) != null) {
//       throw errorHandler.checkForError(req);
//     }
//     let menuBody = req.body;
//     const menu = new menuSchema(menuBody);
//     const savedMenu = await menu.save();
//     res.status(201).json(savedMenu);
//   } catch (err) {
//     next(err);
//   }
// };

// exports.getMenus = async (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) => {
//   try {
//     const limit:number = Number(req.query.limit) || 4
//     const start:number = Number(req.query.start) || 1
//     const total:Number = await menuSchema.find().countDocuments();
//     const menus: Menu[] = await menuSchema.find().skip(start -1).limit(limit);
//     if (!menus) {
//       throw errorHandler.notFound();
//     }
//     return res.status(200).json({total ,start ,limit, menus});
//   } catch (err) {
//     next(err);
//   }
// };

// exports.getMenuById = async (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction) => {
//     try{
//    if(!isValidObjectId(req.params.menuId)){
//      throw errorHandler.badRequest("invalid id");
//    }
//       const theMenu = await  menuSchema.findById(req.params.menuId)
//       if(!theMenu){
//         throw errorHandler.notFound("menu")
//       }
//       return res.status(200).json(theMenu)
//     }catch(err){
//       next(err)
//     }
//   }

//   exports.updateMenu = async (
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction) => {
//       try{
//         const receivedBody:Menu = req.body
//         if (errorHandler.checkForError(req) != null) {
//           throw errorHandler.checkForError(req);
//       }
//        if(!isValidObjectId(receivedBody.id)){
//         throw errorHandler.badRequest("invalid id");
//        }
//         let theOldMenu = await  menuSchema.findById(receivedBody.id)
//         if(!theOldMenu){
//           throw errorHandler.notFound("menu")
//         }
//          theOldMenu.title = receivedBody.title
//          theOldMenu.description = receivedBody.description
//          theOldMenu.price = receivedBody.price
//          theOldMenu.ingredients = [...receivedBody.ingredients]
//          theOldMenu.imageUrl = receivedBody.imageUrl

//          const newMenu = await theOldMenu.save()
//         return res.status(200).json(newMenu)
//       }catch(err){
//         next(err)
//       }
//     }

//     exports.deleteMenu = async ( req: express.Request,
//       res: express.Response,
//       next: express.NextFunction) => {
//         try{
//           if(!isValidObjectId(req.params.menuId)){
//             errorHandler.badRequesr("invalid id")
//           }
//           const deletedMenu = await menuSchema.findByIdAndRemove(req.params.menuId);
//           if(!deletedMenu){
//             throw errorHandler.notFound("menu")
//           }
//           res.status(200).json({message:"menu deleted successfully"})
//         }catch(err){
//           next(err)
//         }
//     }
