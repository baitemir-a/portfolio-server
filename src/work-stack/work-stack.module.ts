import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Stack } from 'src/stack/stack';
import { Work } from 'src/work/work';

@Module({
    imports: [
        SequelizeModule.forFeature([Stack, Work]),
      ],
})
export class WorkStackModule {}
