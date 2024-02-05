import axios from 'axios';

const Request = ( base?: any ) => {
    const instance = axios.create({
        baseURL: base ? base : `${ process.env.NEXT_PUBLIC_CMS_URL }/api`,
        timeout: 100000
    });
    
    instance.interceptors.response.use(
        response => response,
        error => {
            return Promise.reject(error);
        }
    );
    
    let requestTerminator = {
        GET: {},
        POST: {},
        PUT: {}
    } as any;
    
    const CancelToken = axios.CancelToken;
    
    const terminator = (method: string, url: string) => {
        if(requestTerminator[method][url]) {
            requestTerminator[method][url](`${method}: Endpoint ${url} was cancelled due to multiple requests.`);
        }
    }

    return {
        get: async (url: string, params = {} as any, extras = {}) =>  {
            if(params.cancel === true) {
                terminator('GET', url)
            }
    
            return await instance.get(url, {
                params,
                cancelToken: new CancelToken(function executor(c) {
                    requestTerminator['GET'][url] = c;
                }),
                ...extras
            });
        },
        post: async (url: string, data: any, extras = {}) => {
            return await instance.post(url, data, {
                ...extras
            })
        },
        put: async (url: string, data: any, extras = {}) => {
            return await instance.put(url, data, {
                ...extras
            })
        },
        delete: async (url: string, params: any, extras = {}) => {
            return await instance.delete(url, {
                params,
                ...extras
            })
        }
    }
}

export default Request;