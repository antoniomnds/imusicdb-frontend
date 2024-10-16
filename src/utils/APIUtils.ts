import queryString from "query-string";
import isEmpty from "lodash/isEmpty";

const AUTH_STORAGE_KEY = "access_token";

const API_V1 = "v1";
const AUTH_TOKEN_HEADER = "Authorization";

export const API_GET = Symbol("API Read");
export const API_POST = Symbol("API Create");
export const API_PUT = Symbol("API Update");
export const API_PATCH = Symbol("API Patch");
export const API_DELETE = Symbol("API Delete");

const ACCEPTED_METHODS = {
    [API_GET]: "GET",
    [API_POST]: "POST",
    [API_PUT]: "PUT",
    [API_PATCH]: "PATCH",
    [API_DELETE]: "DELETE",
}

const API_STATUS = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
}

interface GetFullUrlParams {
    endpoint: string;
    queryParams?: Record<string, any>;
    apiVersion?: typeof API_V1;
}

interface ApiCallParams  {
    method: keyof typeof ACCEPTED_METHODS;
    endpoint: string;
    headers?: Record<string, any>;
    queryParams?: Record<string, any>;
    body?: Record<string, any>;
    apiVersion?: typeof API_V1;
}

interface ApiResponse {
    data: string,
    errors: string
    status: number
}

const isAbsoluteUrl = (pathname: string) => {
    const isAbsoluteUrlRegex = /^(?:[a-z]+:)?\/\//i;
    return isAbsoluteUrlRegex.test(pathname);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stringifyQueryParams = (params: Record<string, any>) => queryString.stringify(params)
const getFullApiUrl = ({
    endpoint,
    queryParams = {},
    apiVersion = API_V1
}: GetFullUrlParams) => {
    let fullUrl;

    if (isAbsoluteUrl(endpoint)) {
        fullUrl = new URL(endpoint);
    } else {
        const apiUrl = new URL(import.meta.env.VITE_API_URL as string);
        const stringParams = isEmpty(queryParams) ? "" : `?${stringifyQueryParams(queryParams)}`;
        fullUrl = new URL(`${apiUrl.origin}/api/${apiVersion}/${endpoint}${stringParams}`);
    }
    return fullUrl;
}

const getCredentials = () => {
    return window.localStorage.getItem(AUTH_STORAGE_KEY);
}

const removeCredentials = () => {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

const persistCredentials = (response: Response) => {
    const authToken = response.headers.get(AUTH_TOKEN_HEADER);
    if (authToken) {
        window.localStorage.setItem(AUTH_STORAGE_KEY, authToken);
    }
}
export async function apiCall(
    {
        method,
        endpoint,
        queryParams = {},
        body = {},
        headers = {},
        apiVersion = API_V1,
    }: ApiCallParams) {
    const httpMethod = ACCEPTED_METHODS[method];
    const fullUrl = getFullApiUrl({endpoint, apiVersion, queryParams});

    let finalHeaders: HeadersInit = {
        ...headers,
        Accept: "application/json",
        "Content-Type": "application/json"
    }

    // pass existing credentials through the header
    const authToken: string|null = getCredentials();
    if (authToken) {
        finalHeaders = {
            ...finalHeaders,
            Authorization: `Bearer ${authToken}`,
        }
    }

    return fetch(fullUrl, {
        method: httpMethod,
        headers: finalHeaders,
        body: method === API_POST ? JSON.stringify(body) : undefined,
    }).then((response: Response) => handleApiResponse(response, endpoint));
}

const handleApiResponse = async (response: Response, endpoint: string) => {
    if (!response.ok) {
        if (response.status === API_STATUS.UNAUTHORIZED) {
            removeCredentials();
        }
        const responseJson: ApiResponse = await response.json();
        const reason = responseJson ? responseJson.errors : response;
        return { result: Promise.reject(reason), success: false }
    }
    if (endpoint.includes('logout')) {
        removeCredentials();
    } else {
        persistCredentials(response);
    }
    const responseJson: ApiResponse = await response.json();
    return { result: responseJson, success: true };
}
