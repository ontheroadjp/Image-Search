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
            photoSearch: [],
            photoList: [],
            collectionSearch: [],
            collectionList: [],
        },
    },
    mutations: {
        changeMode (state, mode) {
            state.mode = mode
        },
        setSearchCondition (state, payload) {
            state.search.keywords = payload.query
            state.search.page = payload.page
            state.search.per_page = payload.per_page
        },
        appendJson (state, payload) {
            switch(state.mode) {
                case 1:
                    state.json.photoSearch.push(...payload.json)
                    break
                case 2:
                    state.json.collectionSearch.push(...payload.json)
                    break
                case 3:
                    state.json.photoList.push(...payload.json)
                    break
                case 4:
                    state.json.collectionList.push(...payload.json)
                    break
            }
            state.search.page += 1
        },
    },
    actions: {
        changeMode(context, payload) {
            context.commit('changeMode', payload)
        },
        setSearchCondition(context, payload) {
            context.commit('setSearchCondition', payload)
        },
        appendJson(context, payload) {
            context.commit('appendJson', payload)
        },
    },
    getters: {
        getUrls: (state, getters) => {
            switch(state.mode) {
                case 1:
                    return getters.getPhotoUrls(state.json.photoSearch)
                case 2:
                    return getters.getCollectionUrls(state.json.collectionSearch)
                case 3:
                    return getters.getPhotoUrls(state.json.photoList)
                case 4:
                    return getters.getCollectionUrls(state.json.collectionList)
            }
        },
        getPhotoUrls: () => (array) => {
            if( !array?.length ) { return [] }
            return array.map(function(val) {
                return {
                    urls: val.urls,
                    desc: val.description,
                    alt_desc: val.alt_description
                }
            })
        },
        getCollectionUrls: () => (array) => {
            if( !array?.length ) { return [] }
            return array.map(function(val) {
                return val.preview_photos.map( function(val2) {
                    return val2.urls
                })
            })
        },
    },
    modules: {
    }
})
