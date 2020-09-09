// This file will include the action types to be dispatched in domain/eventName.
// E.g todos/addTodo, packages/fetchPackages

export const packages = {
    fetchPackages: 'packages/fetchPackages'
}

//change to query/*
export const query = {
    setModifiers: 'query/setModifiers',
    setSearchTerm: 'query/setSearchTerm',
    setOffset: 'query/setOffset'

}