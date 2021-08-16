import { Document } from 'mongoose';
import { Observable } from 'rxjs';
import { IResponse } from 'src/common/utils/transform.response';

export interface ISocialService {
  addSocial(data: ISocial): Observable<IResponse<ISocial>>;
  updateSocial(data: ISocial): Observable<IResponse<ISocial>>;
  deleteSocial(data: ISocial): Observable<IResponse<ISocial>>;
  getSocial(data: ISocial): Observable<IResponse<ISocial>>;
  getSocials(data: ISocial): Observable<IResponse<ISocial>>;
}

export interface ISocialSchema extends Document {
  readonly _id?: string;
  readonly title?: string;
  readonly content?: string;
  readonly icon?: string;
  readonly isActive?: boolean;
  readonly userId?: string;
}

export interface ISocial {
  readonly _id?: string;
  readonly title?: string;
  readonly content?: string;
  readonly icon?: string;
  readonly isActive?: boolean;
  readonly userId?: string;
}
