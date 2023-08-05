import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FormValue } from '../../pages/Login/Login';
import { getStoreJson, httpNonAuth, setStoreJson, USER_LOGIN } from '../../util/config';
import { DispatchType } from '../store';

interface UserLogin {
    email: string,
    accessToken: string
}
interface UseState {
    userLogin: UserLogin | null | undefined
}
const initialState: UseState = {
    userLogin: getStoreJson(USER_LOGIN)
}

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        loginAction: (state: UseState, action: PayloadAction<UserLogin>) => {
            state.userLogin = action.payload;
        }
    }
});

export const { loginAction } = userReducer.actions

export default userReducer.reducer


export const loginActionApi = (userLoginForm: FormValue) => {
    return async (dispatch: DispatchType) => {
        let res = await httpNonAuth.post('/api/auth/signin', userLoginForm);
        //sau khi có kết quả lưu vào localstorage và đưa lên redux
        setStoreJson(USER_LOGIN, res.data.content);
        //tạo action đưa lên redux
        const action: PayloadAction<UserLogin> = loginAction(res.data.content);
        dispatch(action);
    }
}