import { ObjectId } from 'mongoose';
export class AbstractMenu {
  public _id?: ObjectId;
  public title!: string;
  public description!: string;
  public category!: string;
  public imageUrl!: string;
  public price!: number;
  public ingredients!: string[];
}
