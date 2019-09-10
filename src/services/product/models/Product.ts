import {Model, Column, Table, Scopes, CreatedAt, UpdatedAt, DataType, AllowNull, ForeignKey, BelongsTo, Default} from "sequelize-typescript";
import { DecimalDataType } from "sequelize/types";
import {Category} from "./Category";

@Scopes(() => ({
 
}))
@Table
export class Product extends Model<Product> {

    @AllowNull(false)  
    @Column
    title!: string;
  
    @AllowNull(false)  
    @Column
    description!: string;
    
    @AllowNull(false)
    @Column({ type: DataType.DECIMAL(10, 2) })
    value!: DecimalDataType;

    @AllowNull(false)
    @ForeignKey(() => Category)
    @Column
    public categoryId: number;

    @BelongsTo(() => Category)
    public category: Category;
    
    @Column
    stock!: number;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;

}