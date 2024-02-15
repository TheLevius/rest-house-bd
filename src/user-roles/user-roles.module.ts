import { Module } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { UserRolesController } from './user-roles.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  providers: [UserRolesService],
  controllers: [UserRolesController],
})
export class UserRolesModule {}
