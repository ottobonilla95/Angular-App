import {Action } from '@ngrx/store';
import {LOGIN_FINISHED} from './auth.types';

export class LoginFinished implements Action {
    readonly type = LOGIN_FINISHED;
    constructor(public payload:string){}
}


export type AuthActions = LoginFinished;