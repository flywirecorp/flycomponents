# Flycomponents

Flycomponents is a set of react UI components used to create payment forms in Flywire.

## Installation

Add the dependency to your `package.json`:

```javascript
"flycomponents": "git+https://github.com/peertransfer/flycomponents.git"
```

## Create a new release

To create a new release, make all the changes that you need and commit them, then execute:

```bash
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]
```
For example:

```bash
npm version patch
```
This will bump the `package.json` version, build a new bundle, commit, push the changes tagging them to a new release and update the documentation.

Then create a PR and request the review from other project commiters. Once accepted and merged to master, execute `npm publish` from master branch.

## Documentation

[http://flycomponents.flywire.lol](http://flycomponents.flywire.lol)

The documentation source is under the `docs` folder.
To update the documentation and publish the changes to Github Pages:

```
> make bash
docs# npm run build:docs
> # commit the changes
```
