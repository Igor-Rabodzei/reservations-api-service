import { UserDocument } from 'src/schemas/user.schema';

export interface IAuthResult {
  accessToken?: string;
  refreshToken?: string;
  user?: UserDocument;
  error?: string;
}
