import { UserAbout } from 'src/types/general';

export class LoginDto {
  idToken: string;
}

export class AuthTokensDto {
  user: {
    id: string;
    username: string;
    email: string;
    gender?: string;
    image: string;
    about?: UserAbout;
    createdAt: Date;
    updatedAt: Date;
  };
  new: boolean;
  tokens: {
    sessionToken: string;
    refreshToken: string;
  };
}
