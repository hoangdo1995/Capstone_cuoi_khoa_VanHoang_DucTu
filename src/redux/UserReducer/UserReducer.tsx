import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserLoginModel } from '../../pages/Login/Login';
import { UserRegisterModel } from '../../pages/Register/Register';
import { getStoreJson, http, setStore, setStoreJson, TOKEN_CYBERSOFT, USER_LOGIN } from '../../util/config';


export interface UserResult {
  email: string,
  accessToken: string,
  id: string,
  name: string,
  phone: string,
  gender: boolean,
  birthday: string,
  password: string,
  avatar: null,
  role: string
}
export interface UserState {
  userLogin: UserResult,
  userRegister: UserResult | null,
  userProfile:UserResult | null,
}

const initialState: UserState = {
  userLogin: getStoreJson(USER_LOGIN) ? getStoreJson(USER_LOGIN) : null,
  userRegister: null,
  userProfile: null

}


const UserReducer = createSlice({
  name: 'UserReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAsyncApi.fulfilled, (state: UserState, action: PayloadAction<UserResult>) => {
      state.userLogin = action.payload;
    });
    builder.addCase(registerAsyncApi.fulfilled, (state: UserState, action: PayloadAction<UserResult>) => {
      state.userRegister = action.payload;
    });
    builder.addCase(profileAsyncApi.fulfilled, (state: UserState, action: PayloadAction<UserResult>) => {
      state.userProfile = action.payload;
    })
  }
});

export const { } = UserReducer.actions

export default UserReducer.reducer
// login api
export const loginAsyncApi = createAsyncThunk(
  'userReducer/loginAsyncApi',
  async (userLogin: UserLoginModel): Promise<UserResult> => {
    const response = await http.post('/api/auth/signin', userLogin);
    setStoreJson(USER_LOGIN, response.data.content);
    setStore(TOKEN_CYBERSOFT, response.data.content.accessToken);

    return response.data.content;

  }
)
//register api
export const registerAsyncApi = createAsyncThunk(
  'userReducer/registerAsyncApi',
  async (userRegister: UserRegisterModel): Promise<UserResult> => {
    const response = await http.post('/api/auth/signup', userRegister)
    return response.data.content;

  }
)
//profile api
export const profileAsyncApi = createAsyncThunk(
  'userReducer/profileAsyncApi',
  async (): Promise<UserResult> => {
    const response = await http.post('/api/users')
    return response.data.content;

  }
)