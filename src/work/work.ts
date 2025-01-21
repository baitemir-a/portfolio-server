import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Stack } from 'src/stack/stack';
import { WorkStack } from 'src/work-stack/work-stack';

@Table({
  tableName: 'work',
  timestamps: true,
})
export class Work extends Model<Work> {
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
  site_url: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  code_url: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  brief: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full: string;
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
  })
  images: string[];
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
  })
  stack_info: string[];

  @BelongsToMany(() => Stack, () => WorkStack)
  stack: Stack[];
  
} 
