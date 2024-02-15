import { Module } from '@nestjs/common';
import { BuildingTypesService } from './building-types.service';
import { BuildingTypesController } from './building-types.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  providers: [BuildingTypesService],
  controllers: [BuildingTypesController],
})
export class BuildingTypesModule {}
