import 'axios';

declare module 'axios' {
    interface AxiosResponse<T = any> {
        ok: boolean;
    }

    interface AxiosRequestConfig {
        skipAuth?: boolean; // Add skipAuth as an optional property
    }
}