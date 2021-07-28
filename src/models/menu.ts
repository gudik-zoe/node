import { ObjectId } from "mongoose";
export class Menu {
  public id?:ObjectId
  public title!: string;
  public description!: string;
  public imageUrl!: string;
  public price!: number;
  public ingredients!: string[];
}
