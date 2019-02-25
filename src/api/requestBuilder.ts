import axios, {
    AxiosError,
    AxiosPromise,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios';
import { host } from './config';

export type HTTPMethod =
    'get'
    | 'post'
    | 'delete'
    | 'put'
    | 'patch';

export interface JsonBody {
    [key: string]: any;
}

export interface Request {
    method: HTTPMethod;
    url: string;
    body?: JsonBody;
}

export interface ApiVariety {
    gateway: string;
}

export interface Window {
    env: {
        authUrl: string;
        tablePageLimit: number;
    }
}

const api: ApiVariety = {
    gateway: host,
};

const buildRequest = (request: Request) => {
    const { body, method, url } = request;

    const contentType = body instanceof FormData
        ? 'multipart/form-data'
        : 'application/json';

    const headers = {
        'content-type': contentType,
    };

    const apiUrl = api['gateway'];

    const requestConfig: AxiosRequestConfig = {
        baseURL: apiUrl,
        data: body,
        headers,
        method,
        url,
    };

    return requestConfig;
};

export const defaultResponse: Partial<AxiosError['response']> = {
    status: 500,
    data: {
        error: 'Server error',
    },
};

export const formatError = (responseError: AxiosError) => {
    const response = responseError.response || defaultResponse;
    const errors = response.data && (response.data.errors || [response.data.error]);
    return {
        code: response.status,
        message: errors,
    };
};

export const makeRequest = (request: Request) => {
    const requestConfig = buildRequest(request);

    return new Promise((resolve, reject) => {
        const axiosRequest: AxiosPromise = axios(requestConfig);
        axiosRequest
            .then((response: AxiosResponse) => resolve(response.data))
            .catch((error: AxiosError) => {
                reject(formatError(error));
            });
    });
};
