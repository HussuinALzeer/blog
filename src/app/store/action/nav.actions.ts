import { Action } from "@ngrx/store";
import { Nav } from "../model/nav.model";

export const AUTH = '[Auth] auth';
export const AUTH_SUCCESS = "[Auth] auth Success";
export const AUTH_FAIL = "[Auth] Auth Fail";

export class AuthAction implements Action{
   readonly type = AUTH;
  
}

export class AuthSuccessAction implements Action{
   readonly type = AUTH_SUCCESS;

}

export class AuthFailAction implements Action{
   readonly type = AUTH_FAIL;
 
}

export type NavActions = AuthAction | AuthFailAction | AuthSuccessAction;