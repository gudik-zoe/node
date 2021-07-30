import express, { json } from 'express';
import mongoose, { isValidObjectId, Model } from 'mongoose';
import { AbstractMenu } from '../models/abstractMenu';
const errorHandler = require('../utility/errorHandler');
abstract class AbstractController<T> {
  abstract getRepository(): mongoose.Model<mongoose.Document<any, any>, {}, {}>;

  public getMenus = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const limit: number = Number(req.query.limit) || 4;
      const start: number = Number(req.query.start) || 1;
      const total: Number = await this.getRepository().find().countDocuments();
      const result = await this.getRepository()
        .find()
        .skip(start - 1)
        .limit(limit);
      if (!result) {
        throw errorHandler.notFound();
      }
      return res.status(200).json({ total, start, limit, result });
    } catch (err) {
      next(err);
    }
  };

  public getMenuById = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      if (!isValidObjectId(req.params.id)) {
        throw errorHandler.badRequest('invalid id');
      }
      const abstractMenu = await this.getRepository().findById(req.params.id);
      if (!abstractMenu) {
        throw errorHandler.notFound(this.getRepository().modelName);
      }
      return res.status(200).json(abstractMenu);
    } catch (err) {
      next(err);
    }
  };

  public createMenu = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      if (errorHandler.checkForError(req) != null) {
        throw errorHandler.checkForError(req);
      }
      let menuBody: AbstractMenu = req.body;
      const abstractMenu = this.getRepository();
      const abstractEntityToSave = new abstractMenu(menuBody);
      const savedAbstractEntity = await abstractEntityToSave.save();
      res.status(201).json(savedAbstractEntity);
    } catch (err) {
      next(err);
    }
  };

  public updateMenu = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const receivedBody: AbstractMenu = req.body;
      if (errorHandler.checkForError(req) != null) {
        throw errorHandler.checkForError(req);
      }
      if (!isValidObjectId(receivedBody._id)) {
        throw errorHandler.badRequest('invalid id');
      }
      console.log(receivedBody);
      let theOldEntity: any = await this.getRepository().findById(
        receivedBody._id
      );
      if (!theOldEntity) {
        throw errorHandler.notFound(this.getRepository().modelName);
      }
      theOldEntity.title = receivedBody.title;
      theOldEntity.description = receivedBody.description;
      theOldEntity.price = receivedBody.price;
      theOldEntity.ingredients = [...receivedBody.ingredients];
      theOldEntity.imageUrl = receivedBody.imageUrl;

      const newMenu = await theOldEntity.save();
      return res.status(200).json(newMenu);
    } catch (err) {
      next(err);
    }
  };

  public deleteMenu = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      console.log(req.params.id);
      if (!isValidObjectId(req.params.id)) {
        errorHandler.badRequesr('invalid id');
      }
      const deletedMenu = await this.getRepository().findByIdAndRemove(
        req.params.id
      );
      if (!deletedMenu) {
        throw errorHandler.notFound(this.getRepository().modelName);
      }
      res.status(200).json({
        message: `${this.getRepository().modelName}  deleted successfully `,
      });
    } catch (err) {
      next(err);
    }
  };
}
export default AbstractController;
