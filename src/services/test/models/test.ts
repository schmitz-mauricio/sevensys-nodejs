import {Model, Column, Table, Scopes, CreatedAt, UpdatedAt} from "sequelize-typescript";

@Scopes(() => ({
  movies: {
    include: [
      {
        through: {attributes: []},
      },
    ],
  },
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