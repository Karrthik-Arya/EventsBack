import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { FirebaseAdmin } from './firebase.setup';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '30m' }, // Adjust expiration time as needed
    }),
  ],
  controllers: [AuthController],
  providers: [FirebaseAdmin, AuthService, AuthGuard],
  exports: [AuthService, JwtModule], // Export for use in other modules
})
export class AuthModule {}
