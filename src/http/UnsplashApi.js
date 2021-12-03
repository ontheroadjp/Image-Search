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
    fetchPhotos (options) {
        return this.fetch('/photos?', options)
    }
    fetchPhoto (id, options) {
        return this.fetch('/photos/' + id + '?', options)
    }
    searchPhoto (options) {
        return this.fetch('/search/photos?', options)
    }
    fetchCollections (options) {
        return this.fetch('/collections?', options)
    }
    searchCollection (options) {
        return this.fetch('/search/collections?', options)
    }
    photoDownload (id, options) {
        return this.fetch('/photos/' + id + '/download?', options)
    }
//    searchUser (options) {
//        return this.fetch('/search/users?', options)
//    }
//    fetchRandom (options) {
//        return this.fetch('/photos/random?', options)
//    }
}

export default new UnsplashApi();
