import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TendersModule } from './tenders/tenders.module';
import { ArtisansModule } from './artisans/artisans.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/leanstartup', {
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          console.log('✅ MongoDB is connected');
        });
        connection.on('error', (error) => {
          console.error('❌ MongoDB connection error:', error);
        });
        connection.on('disconnected', () => {
          console.log('⚠️ MongoDB is disconnected');
        });
        return connection;
      },
    }),
    UsersModule,
    AuthModule,
    TendersModule,
    ArtisansModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
