import { TokenUserModel } from '../../models/tokenUserModel';

export interface AuthStoreState {
  tokenUserModel: TokenUserModel | null;
}

export const initialAuthStoreState: AuthStoreState = {
  tokenUserModel: null,
};
