// This file will include the action types to be dispatched in domain/eventName.
// E.g todos/addTodo, packages/fetchPackages

export const packages = {
    fetchPackages: 'packages/fetchPackages',
    fetchVerifiedList: 'packages/fetchVerifiedList',
    createDhis2VersionArray: 'packages/createDhis2VersionArray',
}

//change to query/*
export const query = {
    setModifiers: 'query/setModifiers',
    setOffset: 'query/setOffset',
}

export const filter = {
    setDisplayOffset: 'filter/setOffset',
    setSearchTerm: 'query/setSearchTerm',
    setFilters: 'filter/setFilters',
    setDhis2Versions: 'filter/setDhis2Versions',
}

export const components = {
    createList: 'components/createList',
    searchList: 'components/searchList' ,
}