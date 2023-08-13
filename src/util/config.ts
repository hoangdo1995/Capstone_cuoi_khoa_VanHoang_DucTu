import axios from 'axios';
import { config } from 'process';
import { history } from '../index';

//KHAI BÁO CÁC HẰNG SỐ DÙNG CHUNG

export const DOMAIN: string = 'https://airbnbnew.cybersoft.edu.vn';
export const TOKEN_CYBERSOFT: string = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU`;
export const USER_LOGIN = 'user_login';

//Khai báo các phương thức xử lý trên LocalStorage;

export const { getStoreJson, setStoreJson, getStore, setStore } = {
    getStoreJson: (name: string): any => {
        if (localStorage.getItem(name)) {
            const strResult: string | null | any = localStorage.getItem(name);
            return JSON.parse(strResult);
        }
        return null;
    },
    setStoreJson: (name: string, data: any): void => {
        const strJSON = JSON.stringify(data);
        localStorage.setItem(name, strJSON);
    },
    getStore: (name: string): string | null | boolean | any => {
        return localStorage.getItem(name);
    },
    setStore: (name: string, data: string): void => {
        localStorage.setItem(name, data);
    }
}

//interceptor
export const http = axios.create({
    baseURL: DOMAIN,
    timeout: 30000
});

export const httpNonAuth = axios.create({
    baseURL: DOMAIN,
    timeout: 30000
})

httpNonAuth.interceptors.request.use((config: any) => {
    config.baseURL = DOMAIN;
    config.headers = { ...config.headers }
    config.headers.tokenCybersoft = TOKEN_CYBERSOFT;
    return config
}, err => {
    return Promise.reject(err)
});
http.interceptors.request.use((config: any) => {
    config.headers = { ...config.headers }
    let token = getStoreJson(USER_LOGIN)?.accessToken;
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.tokenCybersoft = TOKEN_CYBERSOFT;
    return config;
}, err => {
    return Promise.reject(err)
});


//Cấu hình cho response (kết quả trả về từ api)
http.interceptors.response.use((res) => {
    return res;
}, (err) => {
    //Xử lý lỗi cho api bị lỗi theo status code 
    console.log(err);
    if (err.response?.status === 401) {
        history.push('/login');
    }
    if (err.response?.status === 403) {
        alert('Không đủ quyền truy cập vào trang này !');
        history.push('/login');
    } 
    if(err.response?.status===400 || err.response?.status ===404){
        history.push('/');
    }
    return Promise.reject(err);
});



/* statusCode thông dụng : 
    200: Dữ liệu gửi đi và nhận về kết quả thành công (OK)
    201: Dữ liệu khởi tạo thành công (Created)
    400: Bad request (lỗi không tìm thấy item trên backend)
    404: Not found (không tìm thấy link backend)
    500: Error in server (Lỗi xảy ra tại server - có thể do dữ liệu frontend gửi lên xử lý bị lỗi backend không catch trường hợp này thì ra 500 hoặc là backend code bị lỗi) => Xác định lỗi => mở post man request thử với data đúng thì có được hay không nếu vẫn lỗi thì báo backend fix
    401: UnAuthorize (Lỗi khi không có quyền truy cập vào api này (phải token hợp lệ ...))
    403: Forbiden ( Lỗi chưa đủ quyền truy cập vào api )

*/



