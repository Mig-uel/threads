import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comments.module';
import { CommentsService } from './comments/comments.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    CommentsModule,
    ConfigModule.forRoot({}),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
  ],
  controllers: [AppController],
  providers: [AppService, CommentsService],
})
export class AppModule {}
