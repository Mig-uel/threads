import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CommentsService } from './comments/comments.service';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [UsersModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService, CommentsService],
})
export class AppModule {}
