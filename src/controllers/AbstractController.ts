import express, { json } from 'express';
import mongoose, { Model } from 'mongoose';
import { nextTick } from 'process';
import { Menu } from '../models/menu';
const errorHandler = require('../utility/errorHandler');
abstract class AbstractController<T> {
  // entity:mongoose.Model<mongoose.Document<any , any> , {} , {}> = mongoose.model(this.theModel)
  abstract getRepository(): mongoose.Model<mongoose.Document<any, any>, {}, {}>;

  public showEntity = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      console.log('this is the method');
      const result = await this.getRepository().find();
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
}
export default AbstractController;
//  getMenus = async (
//         req: express.Request,
//         res: express.Response,
//         next: express.NextFunction,

//       )=> {
//         try {
//           const limit:number = Number(req.query.limit) || 4
//           const start:number = Number(req.query.start) || 1
//           const total:Number = await this.model.find().countDocuments();
//           const result = await this.model.find().skip(start -1).limit(limit);
//           if (!result) {
//             throw errorHandler.notFound();
//           }
//           return res.status(200).json({total ,start ,limit, result});
//         } catch (err) {
//           next(err);
//         }
//       };

// entity: any;
// constructor(entity: any) {
//     this.entity = entity;
//  }
// public getMenus = async (
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction,
//   ) => {
//     try {
//       const limit:number = Number(req.query.limit) || 4
//       const start:number = Number(req.query.start) || 1
//       const total:Number = await this.entity.find().countDocuments();
//       const result = await this.entity.find().skip(start -1).limit(limit);
//       if (!result) {
//         throw errorHandler.notFound();
//       }
//       return res.status(200).json({total ,start ,limit, result});
//     } catch (err) {
//       next(err);
//     }
//   };
