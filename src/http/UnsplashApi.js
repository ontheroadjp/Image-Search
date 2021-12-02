'use strict'

import axios from "./http-common";

const client_id = '1UYpVsCG-au8N2jThq4UVjnOZ1Uta_JgMI8g5kM7sfY'

class UnsplashApi {
    fetch (url, payload) {
        let options = ''
        payload.client_id = client_id
        Object.keys(payload).forEach( function (value) {
            options += '&' + value + '=' + payload[value]
        });
        console.log(url + options.slice(1))
        return axios.get(url + options.slice(1))
    }
    photoList (payload) {
        return this.fetch('/photos?', payload)
    }
    photoSearch (payload) {
        return this.fetch('/search/photos?', payload)
    }
    collectionList (payload) {
        return this.fetch('/collections?', payload)
    }
    collectionSearch (payload) {
        return this.fetch('/search/collections?', payload)
    }
//    searchUsers (payload) {
//        return this.fetch('/search/users?', payload)
//    }
//    random (payload) {
//        return this.fetch('/photos/random?', payload)
//    }
}

export default new UnsplashApi();
