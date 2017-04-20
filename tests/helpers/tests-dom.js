import jsdom from 'jsdom'

const document = jsdom.jsdom('<!doctype html><html><body></body></html>')
const window = document.defaultView
const navigator = window.navigator

global.document = document
global.window = window
global.navigator = navigator
