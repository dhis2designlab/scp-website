import github from 'octonode'
import atob from 'atob'
import { packages } from './actionTypes'
import { csvToJSON } from '../helpers/csv'

export const fetchVerified = () => async (dispatch, getState) => {
    const client = github.client()
    const ghrepo = client.repo('dhis2-scp/whitelist')

    const result = await ghrepo.contentsAsync('list.csv');

    // Actual content base64 encoded
    const content = result[0].content

    // Convert from base64 to binary
    const binary = atob(content)

    // Convert from binary/csv to JSON
    const json = csvToJSON(binary)

    dispatch({ type: packages.fetchVerifiedList, payload: json })
}

