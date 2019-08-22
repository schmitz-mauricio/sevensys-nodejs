import {Model, Column, Table, Scopes, CreatedAt, UpdatedAt, AllowNull, Unique} from "sequelize-typescript";

@Scopes(() => ({
  
}))
@Table
export class User extends Model<User> {

    @AllowNull(false)  
    @Column
    name!: string;

    @AllowNull(false)  
    @Unique
    @Column
    login!: string;

    @AllowNull(false)  
    @Column
    password!: string;
  
    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;

}