import { combineReducers } from 'redux'
import { packages } from '../actions/actionTypes'

const currPackages = (state = [], action) => {
  switch (action.type) {
    case packages.fetchPackages:
      var arr = [...state];
      if (action.payload.offset === 0) {
        arr = new Array(action.payload.data.total);
      }
      arr.splice(action.payload.offset, action.payload.data.objects.length, ...action.payload.data.objects)
      return arr
    default:
      return state
  }
}

const verified = (state = {}, action) => {
  switch (action.type) {
    case packages.fetchVerifiedList:
      const verifiedObj = {}
      for(let i = 0; i < action.payload.length; i++){
        const v = action.payload[i]
        if(!verifiedObj[v.package_identifer]) verifiedObj[v.package_identifer] = []
        verifiedObj[v.package_identifer] = [ ...verifiedObj[v.package_identifer], v.package_version]
      }
      return verifiedObj
    default:
      return state
  }
}

const totalPackages = (state = 0, action) => {
  switch (action.type) {
    case packages.fetchPackages:
      return action.payload.data.total
    default:
      return state
  }
}

const searched = (state = false, action) => {
  switch (action.type) {
    case packages.fetchPackages:
      return true
    default:
      return state
  }
}

const allDhis2Versions = (state = [], action) => {
  switch (action.type) {
    case packages.createDhis2VersionArray:
      return action.payload.versionArray
    default:
      return state
  }
}

const dhis2VersionsById = (state = {}, action) => {
  switch (action.type) {
    case packages.createDhis2VersionArray:
      return action.payload.versionObject
    default:
      return state
  }
}

const packagesReducer = combineReducers({
    currPackages,
    verified,
    totalPackages,
    searched,
    allDhis2Versions,
    dhis2VersionsById
})

export default packagesReducer