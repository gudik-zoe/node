import { Category } from './category';

export class Item {
  public title!: string;
  public imageUrl!: string;
  public description!: string;
  public category!: Category;
  public price!: number;
  public quantity!: number;
}
