
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';

import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { Auth0Config } from 'src/config/auth0.confing';

@Module({
  imports: [UsersModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [AuthController],
  providers: [AuthService, Auth0Config, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}