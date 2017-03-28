let instance = null;

/**
 * RestClientService class implements methods for communication with REST API server
 * 
 * @class RestClientService
 */
class RestClientService 
{

    /**
     * REST API server url (json-server is running on localhost, port 3000)
     * 
     * @static
     * 
     * @memberOf RestClientService
     */
    static REST_API = 'http://localhost:3000';

    constructor() {
        if(!instance) {
              instance = this;
        }

        return instance;
    }

    /**
     * Send GET request and return promise
     * 
     * @param {string} url 
     * @returns 
     * 
     * @memberOf RestClientService
     */
    callGet(url) {

        return fetch(RestClientService.REST_API + url, {method: 'get'});
    }

    /**
     * Send POST request and return promise
     * 
     * @param {string} url 
     * @param {any} data 
     * @returns 
     * 
     * @memberOf RestClientService
     */
    callPost(url, data) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return fetch(RestClientService.REST_API + url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });
    }

    /**
     * Send PUT request and return promise
     * 
     * @param {string} url 
     * @param {any} data 
     * @returns 
     * 
     * @memberOf RestClientService
     */
    callPut(url, data) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return fetch(RestClientService.REST_API + url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data)
        })
    }

    /**
     * Send DELETE request and return promise
     * 
     * @param {string} url 
     * @returns 
     * 
     * @memberOf RestClientService
     */
    callDelete(url) {
        
        return fetch(RestClientService.REST_API + url, {method: 'DELETE'});
    }
}

export default new RestClientService();
