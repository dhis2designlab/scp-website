// This file will include the action types to be dispatched in domain/eventName.
// E.g todos/addTodo, packages/fetchPackages

export const packages = {
    fetchPackages: 'packages/fetchPackages',
    fetchVerifiedList: 'packages/fetchVerifiedList'
}

//change to query/*
export const query = {
    setModifiers: 'query/setModifiers',
    setOffset: 'query/setOffset',
}

export const filter = {
    setDisplayOffset: 'filter/setOffset',
    setSearchTerm: 'query/setSearchTerm',
}

export const components = {
    createList: 'components/createList',
    searchList: 'components/searchList' ,
}