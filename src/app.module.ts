import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { RedisModule } from './redis/redis.module';
import { UserInfoModule } from './user-info/user-info.module';
import { AgreeOfTermModule } from './agree-of-term/agree-of-term.module';
import { SpaceModule } from './space/space.module';

@Module({
  imports: [AppConfigModule, DatabaseModule, UserModule, AuthModule, EmailModule, RedisModule, UserInfoModule, AgreeOfTermModule, SpaceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
