# Flycomponents

Flycomponents is a set a react UI components used to create payment forms in Flywire.

## Installation

Flycomponents is a private repository and haven't been published to npm yet, so to add the dependency to your project you have to add to your `package.json`:

```javascript
"flycomponents": "git+https://<github_token>:x-oauth-basic@github.com/peertransfer/flycomponents.git/<version>"
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
This will bump the `package.json` version, build a new bundle, commit and push the changes tagging them to a new release.

## Documentation

[https://peertransfer.github.io/flycomponents](https://peertransfer.github.io/flycomponents)

The documentation source is under the `docs` folder.
To update the documentation and publish the changes to Github Pages:

```
> make bash
docs# yarn build:doc
> # commit the changes
```
