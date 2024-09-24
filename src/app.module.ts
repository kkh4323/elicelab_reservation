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
import { ReservationModule } from './reservation/reservation.module';
import { QuestionModule } from './question/question.module';
import { MinioClientModule } from './minio-client/minio-client.module';

@Module({
  imports: [AppConfigModule, DatabaseModule, UserModule, AuthModule, EmailModule, RedisModule, UserInfoModule, AgreeOfTermModule, SpaceModule, ReservationModule, QuestionModule, MinioClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
