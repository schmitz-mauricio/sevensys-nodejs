import {Model, Column, Table, Scopes, CreatedAt, UpdatedAt, DataType, AllowNull} from "sequelize-typescript";

@Scopes(() => ({
  
}))
@Table
export class Category extends Model<Category> {

    @AllowNull(false)  
    @Column
    title!: string;
  
    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;

}