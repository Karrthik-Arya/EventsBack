import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // Assuming User entity defined
import { Repository } from 'typeorm';
import * as admin from 'firebase-admin'; // Assuming FirebaseModule provides it
import { AuthTokensDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { FirebaseAdmin } from './firebase.setup';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly admin: FirebaseAdmin,
    private readonly jwtService: JwtService,
  ) {}

  async login(idToken: string): Promise<AuthTokensDto> {
    try {
      const app = this.admin.setup();
      // Verify the ID token issued by Google
      console.log(idToken);
      console.log(app.options);
      const decodedToken = await app.auth().verifyIdToken(idToken);

      // Check if user exists, create if not
      const email = decodedToken.email;
      let user = await this.userRepository.findOneBy({ email });
      const isNewUser = !user;

      if (isNewUser) {
        user = await this.createUserFromGoogleData(decodedToken);
      }

      const tokens = {
        sessionToken: '',
        refreshToken: '',
      };

      if (isNewUser || !user.refreshToken) {
        // Generate new access and refresh tokens for new user or user without refresh token
        const payload = { userId: user.id };
        const accessToken = this.jwtService.sign(payload, { expiresIn: '30m' });
        const refreshToken = this.jwtService.sign(payload, {
          expiresIn: '1y',
        });
        user.sessionToken = accessToken;
        user.refreshToken = refreshToken; // Store refresh token in user entity
        await this.userRepository.save(user);
        tokens.sessionToken = accessToken;
        tokens.refreshToken = refreshToken;
      } else {
        // Use existing refresh token to generate new access token for returning user
        const accessToken = this.jwtService.sign(
          { userId: user.id },
          { expiresIn: '30m' }, // Renew access token on login
        );
        user.sessionToken = accessToken;
        tokens.sessionToken = accessToken;
        tokens.refreshToken = user.refreshToken;
      }
      return { user, new: isNewUser, tokens };
    } catch (error) {
      console.log(error);
      throw new Error('Invalid ID token or error authenticating user');
    }
  }

  async validateSessionToken(sessionToken: string): Promise<boolean> {
    try {
      const decodedToken = this.jwtService.verify(sessionToken);
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired session token');
    }
  }

  private async createUserFromGoogleData(
    decodedToken: admin.auth.DecodedIdToken,
  ): Promise<User> {
    const user = new User();
    user.email = decodedToken.email;
    user.username = decodedToken.email.split('@')[0];
    user.image = decodedToken.picture;
    user.role = 'user';
    user.age = 0;
    user.about = { desc: '', interests: [], opinions: [], prompts: {} };
    user.gender = 'M';
    user.sessionToken = '';
    user.refreshToken = '';
    await this.userRepository.save(user);
    return user;
  }

  async refreshToken(refreshToken: string) {
    try {
      // Retrieve refresh token from the database
      const storedToken = await this.userRepository.findOneBy({ refreshToken });
      if (!storedToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Verify the signature and expiration of the refresh token
      const verifiedToken = this.jwtService.verify(refreshToken);

      // Extract user information from the verified token
      const user = {
        userId: verifiedToken.sub, // Assuming 'sub' contains the user ID
        // Add any other user information you may have stored in the token
      };

      // Generate a new access token
      const accessToken = this.jwtService.sign(user, { expiresIn: '30m' });

      // Return the new access token along with user information
      return { accessToken };
    } catch (error) {
      // If verification fails or the token is not found in the database, throw an exception
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
