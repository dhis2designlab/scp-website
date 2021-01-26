# DHIS2 Component Search
The [Component Search](https://dhis2designlab.github.io/scp-website/) website is how you explore components created within the DHIS2 ecosystem.

The SCP website uses the NPM registry API to fetch packages that
contain the `dhis2-component-search` keyword in the package.json file and a
correctly structured `dhis2ComponentSearch` property. Originally, npms.io API was used for fetching NPM packages, but later,
when we first published our test-package on NPM, it did not appear in the
search results. Therefore we decided to switch to NPM registry API, as it
solved the problem.

The SCP website uses the UNPKG API to fetch a NPM package’s
package.json file so it can extract the components it provides.
The SCP website uses the SCP whitelist file format to determine the
verification status of a specific version of an NPM package.

- Webapp bootstrapped with `create-react-app`
- Runs on react and redux
- Uses Fuse.js for searching through the components
- Uses Bootstrap and Pure.css for components and grids

## Technology used
* React
* Redux
* Bootstrap
* Pure.css
* ESLint
* Fuse.js

## Depends upon
* [SCP Whitelist](https://github.com/dhis2designlab/scp-whitelist) - through GitHub - for fetching the list of verified packages
* npm - for fetching all packages with the `dhis2-component-search` keyword.
* Unpkg - for fetching the package.json file from the published packages.
* Packages must be configured following the [verification prerequisites](https://github.com/goudbes/scp-evaluation/blob/master/documentation/documentation.md#31-verification-prerequisites) for the website to be able to find and extract the components. Make sure to run the verify command locally before publishing to be sure that your package will be found and displayed in the website.

## Redux
To install the devtools extension, see here and follow the "for Chrome/Firefox" guide: https://github.com/zalmoxisus/redux-devtools-extension
