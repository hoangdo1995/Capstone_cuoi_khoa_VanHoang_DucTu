import axios from 'axios';
import { config } from 'process';
import { history } from '../index';

//KHAI BÁO CÁC HẰNG SỐ DÙNG CHUNG

export const DOMAIN:string = 'https://airbnbnew.cybersoft.edu.vn';
export const TOKEN_CYBERSOFT:string =`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlSlMgMzMiLCJIZXRIYW5TdHJpbmciOiIwNi8wMi8yMDI0IiwiSGV0SGFuVGltZSI6IjE3MDcxNzc2MDAwMDAiLCJuYmYiOjE2ODk2OTk2MDAsImV4cCI6MTcwNzMyNTIwMH0.Ti8xtGGllk9j0u36EAuC9HOWsXJ7QELlIx8X5mDHaEE`;
export const USER_LOGIN = 'user_login';
export const PHONE_VN_REGEX = /(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/;
export const NAME_REGEX = /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/;
export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm;

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
    let token = getStoreJson(USER_LOGIN)?.token;
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.token =  token;
    config.headers.tokenCybersoft = TOKEN_CYBERSOFT;
    console.log(config.headers);
    
    return config;
}, err => {
    return Promise.reject(err);
});

//cấu hình cho response (kết quá trả về từ api nonAuthorize)
httpNonAuth.interceptors.response.use((res)=>{
    return res;
},(err)=>{
    console.log(err);
    if(err.response?.status === 404){
        console.log('chưa có dử liệu');
        
    }
})

//Cấu hình cho response (kết quả trả về từ api)
http.interceptors.response.use((res) => {
    return res;
}, (err) => {
    //Xử lý lỗi cho api bị lỗi theo status code 
    if (err.response?.status === 401) {
        history.push('/login');
        document.querySelector('.modal-backdrop')?.classList.remove('modal-backdrop');
    }
    if (err.response?.status === 403) {
        alert('Không đủ quyền truy cập vào trang này !');
        history.push('/login');
        document.querySelector('.modal-backdrop')?.classList.remove('modal-backdrop');
    } 
    if(err.response?.status===400 || err.response?.status ===404){
        // history.push('/');
        document.querySelector('.modal-backdrop')?.classList.remove('modal-backdrop');
    }
    alert(err.response.data.content);
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

// hàm kiểm tra ngày đặt l
export function isTimeInRange(targetTime: Date, startDate: Date, endDate: Date): boolean {
    return targetTime >= startDate && targetTime <= endDate;
  }



