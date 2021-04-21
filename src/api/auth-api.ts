import { instance } from "./kirav-api";

type MeResponseDataType = {
    userName: string 
    resultCode: number
}

type LoginResponseDataType = {
    token: string 
    expiration: Date
    lifetime: number
    errorMessage?: string
}

type RegisterResponseDataType = {
    errorMessage?: string
}

export const authAPI = {
    me() {
        return instance.get<MeResponseDataType>(`account/me`);
    },

    login(userName: string, password: string, rememberMe = false, returnUrl: string) {
        return instance.post<LoginResponseDataType>(`account/login`, {userName, password, rememberMe, returnUrl})
        .then((response) => {
            if(response) {
                localStorage.setItem('token', response.data.token);
                let time = expiresToken(response.data.lifetime);
                localStorage.setItem('expires_token', time.toString());
                instance.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
            }
            return response;
        })
        .catch((error) => {
            if(error.response.status === 401) {
                return error.response;
            }
        });
    },

    register(email: string, userName: string, password: string, passwordConfirm: string) {
        return instance.post<RegisterResponseDataType>(`account/register`, { email, userName, password, passwordConfirm  })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            //if(error.response.status === 400) {
                console.log(error.response);
                return error.response;
            //}
        });
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('expires_token');
        instance.defaults.headers['Authorization'] = 'null';
    }
}


const expiresToken = (lifetime: number) => {
    var CurrentTime = new Date();
    CurrentTime.setMinutes(CurrentTime.getMinutes() + lifetime);
    return CurrentTime;
}