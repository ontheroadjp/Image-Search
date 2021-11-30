import { createStore } from 'vuex'

export default createStore({
    state: {
        json: {
            photoList: [],
            photoSearch: [],
            collectionList: [],
            collectionSearch: [],
        },
        mode: 1,
        count: 5,
        scrollY: 0
    },
    mutations: {
        setMode (state, payload) {
            state.mode = payload.val
        },
        setPhotoList (state, payload) {
            state.json.photoList = payload.value
        },
        setPhotoSearchJson (state, payload) {
            state.json.photoSearch = payload.value
        },
        setCollectionListJson (state, payload) {
            state.json.collectionList = payload.value
        },
        setCollectionSearchJson (state, payload) {
            state.json.collectionSearch = payload.value
        },
        setScrollY (state, payload) {
            state.scrollY = payload.val
        },
    },
    getters: {
        getPhotoListUrls: state => {
            if( state.json.photoList.length ) {
                return state.json.photoList.map(function(val) {
                    return val.urls
                })
            } else {
                return []
            }
        },
        getPhotoSearchUrls: state => {
            if( state.json.photoSearch.length ) {
                return state.json.photoSearch.map(function(val) {
                    return val.urls
                })
            } else {
                return []
            }
        },
        getCollectionListUrls: state => {
            if( state.json.collectionList.length ) {
                return state.json.collectionList.map(function(val) {
                    return val.preview_photos.map( function(val2) {
                        return val2.urls
                    })
                })
            } else {
                return []
            }
        },
        getCollectionSearchUrls: state => {
            if( state.json.collectionSearch.length ) {
                return state.json.collectionSearch.map(function(val) {
                    return val.preview_photos.map( function(val2) {
                        return val2.urls
                    })
                })
            } else {
                return []
            }
        },
    },
    actions: {
        setMode(context, payload) {
            context.commit('setMode', payload)
        },
        setPhotoList(context, payload) {
            context.commit('setPhotoList', payload)
        },
        setPhotoSearchJson(context, payload) {
            context.commit('setPhotoSearchJson', payload)
        },
        setCollectionListJson(context, payload) {
            context.commit('setCollectionListJson', payload)
        },
        setCollectionSearchJson(context, payload) {
            context.commit('setCollectionSearchJson', payload)
        },
        setScrollY (context, payload) {
            context.commit('scrollY', payload);
        }
    },
    modules: {
    }
})
