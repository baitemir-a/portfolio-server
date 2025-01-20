import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { WorkStack } from 'src/work-stack/work-stack';
import { Work } from 'src/work/work';

@Table({
  tableName: 'stack',
  timestamps: true,
})
export class Stack extends Model<Stack> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;
  @BelongsToMany(() => Work, () => WorkStack)
  work: Work[];
}
