'use strict'

import axios from "./http-common";

const client_id = '1UYpVsCG-au8N2jThq4UVjnOZ1Uta_JgMI8g5kM7sfY'

class UnsplashApi {
    get (url, payload) {
        let options = ''
        payload.client_id = client_id
        Object.keys(payload).forEach( function (value) {
            options += '&' + value + '=' + payload[value]
        });
        console.log(url + options.slice(1))
        return axios.get(url + options.slice(1))
    }
    photoList (payload) {
        return this.get('/photos?', payload)
    }
    photoSearch (payload) {
        return this.get('/search/photos?', payload)
    }
    collectionList (payload) {
        return this.get('/collections?', payload)
    }
    collectionSearch (payload) {
        return this.get('/search/collections?', payload)
    }
//    searchUsers (payload) {
//        return this.get('/search/users?', payload)
//    }
    random (payload) {
        return this.get('/photos/random?', payload)
    }
}

export default new UnsplashApi();
