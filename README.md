# DHIS2 Component Search
The Component Search website is how you explore components created within the DHIS2 ecosystem.

## Technology used
* React
* Redux
* Bootstrap
* Pure.css
* ESLint
* Fuse.js

## Depends upon
* Npmjs - for fetching all packages with the Shared Component Platform keyword.
* Unpkg - for fetching the package.json files from the published packages.
* GitHub (through octonode) - for fetching the list of verified packages from https://github.com/dhis2designlab/scp-whitelist
* Follow the steps in https://github.com/dhis2designlab/scp-cli to configure your package for integration with the platform. Make sure to run the verify command locally before publishing to be sure that your package will be found and displayed in the website.

## Redux
To install the devtools extension, see here and follow the "for Chrome/Firefox" guide: https://github.com/zalmoxisus/redux-devtools-extension
