import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [AppConfigModule, DatabaseModule, UserModule, AuthModule, EmailModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
