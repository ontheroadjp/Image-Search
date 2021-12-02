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
    photoList (options) {
        return this.fetch('/photos?', options)
    }
    photoSearch (options) {
        return this.fetch('/search/photos?', options)
    }
    photos (id, options) {
        return this.fetch('/photos/' + id + '?', options)
    }
    collectionList (options) {
        return this.fetch('/collections?', options)
    }
    collectionSearch (options) {
        return this.fetch('/search/collections?', options)
    }
//    searchUsers (options) {
//        return this.fetch('/search/users?', options)
//    }
//    random (options) {
//        return this.fetch('/photos/random?', options)
//    }
}

export default new UnsplashApi();
