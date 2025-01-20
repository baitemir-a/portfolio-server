import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { Stack } from 'src/stack/stack';
import { Work } from 'src/work/work';

@Table({
    tableName: 'work_stack',
    timestamps: true,
  })
export class WorkStack extends Model<WorkStack> {
  id: number;
  @ForeignKey(() => Work)
  @Column
  wokr_id: number;

  @ForeignKey(() => Stack)
  @Column
  stack_id: number;
}
