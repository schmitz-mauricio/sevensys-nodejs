import {Model, Column, Table, Scopes, Length, CreatedAt, UpdatedAt, DataType, AllowNull} from "sequelize-typescript";

@Scopes(() => ({
  
}))
@Table
export class Category extends Model<Category> {

    @AllowNull(false) 
    @Length({max: 100, min: 2}) 
    @Column
    title!: string;
  
    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;

}