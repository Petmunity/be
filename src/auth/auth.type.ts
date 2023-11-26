import { ProviderEnumType } from 'src/common/types';

export interface KakaoProfile {
  provider: ProviderEnumType;
  id: number;
  username: string;
  displayName: string;
  _raw: string;
  _json: {
    id: number;
    connected_at: string;
    properties: { nickname: string };
    kakao_account: object;
  };
}
