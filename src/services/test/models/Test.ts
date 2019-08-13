import {Model, Column, Table, Scopes, CreatedAt, UpdatedAt} from "sequelize-typescript";

@Scopes(() => ({
  
}))
@Table
export class Test extends Model<Test> {

  @Column
  valor!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

}