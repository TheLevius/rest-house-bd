import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import configuration from './config/configuration';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { UserRolesModule } from './user-roles/user-roles.module';
import { BuildingTypesModule } from './building-types/building-types.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    DbModule,
    UsersModule,
    RolesModule,
    UserRolesModule,
    BuildingTypesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
