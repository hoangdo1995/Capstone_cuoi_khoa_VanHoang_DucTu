import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserLoginModel } from '../../pages/Login/Login';
import { getStoreJson, http, setStore, setStoreJson, TOKEN_CYBERSOFT, USER_LOGIN } from '../../util/config';


export interface UserLoginResult {
  email: string,
  accessToken: string
}
export interface UserRegisterResult{
  email:string,
  accessToken: string
}
export interface UserState {
  userLogin: UserLoginResult
  userRegister:UserRegisterResult 
}

const initialState: UserState = {
  userLogin: getStoreJson(USER_LOGIN) ? getStoreJson(USER_LOGIN) : null,
  userRegister:

}


const UserReducer = createSlice({
  name: 'UserReducer',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loginAsyncApi.fulfilled, (state: UserState, action: PayloadAction<UserLoginResult>) => {
      state.userLogin = action.payload;

    })
  }
});

export const { } = UserReducer.actions

export default UserReducer.reducer
export const loginAsyncApi = createAsyncThunk(
  'userReducer/loginAsyncApi',
  async (userLogin: UserLoginModel): Promise<UserLoginResult> => {
    const response = await http.post('/api/auth/signin', userLogin);
    setStoreJson(USER_LOGIN, response.data.content);
    setStore(TOKEN_CYBERSOFT, response.data.content.accessToken);

    return response.data.content;//UserLoginResult

  }

);