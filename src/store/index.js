import { createStore } from 'vuex'

const getPhotoUrls = (array) => {
    if( !array?.length ) { return [] }
    return array.map(function(val) {
        return {
            id: val.id,
            urls: val.urls,
            desc: val.description,
            alt_desc: val.alt_description
        }
    })
}

const getCollectionUrls = (array) => {
    if( !array?.length ) { return [] }
    return array.map(function(val) {
        return val.preview_photos.map( function(val2) {
            return val2.urls
        })
    })
}

export default createStore({
    state: {
        mode: 1,
        search: {
            keywords: '',
            page: 1,
            per_page: 30
        },
        json: {
            photos: [],
            collections: [],
            work: [],
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
        setJson (state, payload) {
            switch(state.mode) {
                case 1:
                case 3:
                    payload.append
                        ? state.json.photos.push(...payload.json)
                        : state.json.photos = payload.json
                    break
                case 2:
                case 4:
                    payload.append
                        ? state.json.collections.push(...payload.json)
                        : state.json.collections = payload.json
                    break
                case 'work':
                    payload.append
                        ? state.json.work.push(...payload.json)
                        : state.json.work = payload.json
                    break
            }
            payload.append
                ? state.search.page += 1
                : state.search.page = 1
        },
    },
    actions: {
        changeMode(context, payload) {
            context.commit('changeMode', payload)
        },
        setSearchCondition(context, payload) {
            context.commit('setSearchCondition', payload)
        },
        setJson(context, payload) {
            context.commit('setJson', payload)
        },
    },
    getters: {
        getUrls: (state) => {
            switch(state.mode) {
                case 1:
                case 3:
                    return getPhotoUrls(state.json.photos)
                case 2:
                case 4:
                    return getCollectionUrls(state.json.collections)
                case 'work':
                    return state.json.work
//                    return {
//                        description: state.json.work.description,
//                        urls: state.json.work.urls,
//                        tags: state.json.work.tags,
//                        exif: state.json.work.exif,
//                        color: state.json.work.color,
//                    }
            }
        },
    },
    modules: {
    }
})
