import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BasicAclService } from './basic-acl.service';
import appConfig from '../../../config/app.config';

@Module({
  imports: [ConfigModule.forFeature(appConfig)],
  providers: [BasicAclService],
  exports: [BasicAclService]
})
export class BasicAclModule {}
