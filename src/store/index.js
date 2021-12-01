import { createStore } from 'vuex'

export default createStore({
    state: {
        mode: 1,
        search: {
            keywords: '',
            page: 1,
            per_page: 30
        },
        json: {
            photoList: [],
            photoSearch: [],
            collectionList: [],
            collectionSearch: [],
        },
//        scroll: {
//            y: ''
//        },
//        count: 5,
//        scrollY: 0
    },
    mutations: {
        setMode (state, payload) {
            state.mode = payload.val
        },
        setSearchCondition (state, payload) {
            state.search.keywords = payload.keywords
            state.search.page = payload.page
            state.search.per_page = payload.per_page
        },
//        pageIncrement (state, payload) {
//            state.search.page += 1
//        },
        setPhotoList (state, payload) {
            state.json.photoList = payload.value
            state.search.page += 1
        },
        setPhotoSearchJson (state, payload) {
            state.json.photoSearch = payload.value
            state.search.page += 1
        },
        setCollectionListJson (state, payload) {
            state.json.collectionList = payload.value
            state.search.page += 1
        },
        setCollectionSearchJson (state, payload) {
            state.json.collectionSearch = payload.value
            state.search.page += 1
        },
        setScrollY (state, payload) {
            state.scroll.y = payload.value
        },
    },
    actions: {
        setMode(context, payload) {
            context.commit('setMode', payload)
        },
//        setKeywords(context, payload) {
//            context.commit('setKeywords', payload)
//        },
        setSearchCondition(context, payload) {
            context.commit('setSearchCondition', payload)
        },
//        pageIncrement(context, payload) {
//            context.commit('pageIncrement', payload)
//        },
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
//        setScrollY (context, payload) {
//            context.commit('scrollY', payload);
//        }
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
                    return {
                        urls: val.urls,
                        desc: val.description,
                        alt_desc: val.alt_description
                    }
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
    modules: {
    }
})
