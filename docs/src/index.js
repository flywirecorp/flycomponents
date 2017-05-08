import React from 'react'
import { render } from 'react-dom'
import {
  HashRouter as Router,
  Link,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import Autocomplete from './components/Autocomplete'
import Button from './components/Button'
import Datepicker from './components/Datepicker'
import FormGroup from './components/FormGroup'
import MoneyInput from './components/MoneyInput'
import PhoneInput from './components/PhoneInput'
import Select from './components/Select'
import Textarea from './components/Textarea'
import TextInput from './components/TextInput'
import Home from './components/Home'
import './index.css'

const routes = [
  {
    path: '/',
    exact: true,
    label: 'Home',
    component: Home
  },
  {
    path: '/autocomplete',
    label: 'Autocomplete',
    component: Autocomplete
  },
  {
    path: '/button',
    label: 'Button',
    component: Button
  },
  {
    path: '/datepicker',
    label: 'Datepicker',
    component: Datepicker
  },
  {
    path: '/form-group',
    label: 'FormGroup',
    component: FormGroup
  },
  {
    path: '/money-input',
    label: 'MoneyInput',
    component: MoneyInput
  },
  {
    path: '/phone-input',
    label: 'PhoneInput',
    component: PhoneInput
  },
  {
    path: '/select',
    label: 'Select',
    component: Select
  },
  {
    path: '/textarea',
    label: 'Textarea',
    component: Textarea
  },
  {
    path: '/text-input',
    label: 'TextInput',
    component: TextInput
  }
]

const MenuLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match }) => (
      <li className={match ? 'MenuLink is-active' : 'MenuLink'}>
        <Link to={to}>{label}</Link>
      </li>
    )}
  />
)

const App = () => (
  <Router hashType="noslash">
    <div className="Docs">
      <div className="Docs-nav">
        <h3 className="Docs-navTitle">Flycomponents</h3>
        <ul className="Docs-navMenu">
          {routes.map((route, index) => (
            <MenuLink
              key={index}
              activeOnlyWhenExact={route.exact}
              to={route.path}
              label={route.label}
            />
          ))}
        </ul>
      </div>
      <div className="Docs-content">
        <Switch>
          {routes.map((route, index) => (
            <Route
              exact={route.exact}
              key={index}
              path={route.path}
              component={route.component}
            />
          ))}
        </Switch>
      </div>
    </div>
  </Router>
)

render(<App />, document.getElementById('app'))
