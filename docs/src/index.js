import React from 'react'
import { render } from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from 'react-router-dom'
import Autocomplete from './components/Autocomplete'
import Button from './components/Button'
import Datepicker from './components/Datepicker'
import FormGroup from './components/FormGroup'
import MoneyInput from './components/MoneyInput'
import PhoneInput from './components/PhoneInput'
import Textarea from './components/Textarea'
import TextInput from './components/TextInput'
import Home from './components/Home'
import './index.css'

const routes = [
  {
    path: '/flycomponents',
    exact: true,
    label: 'Home',
    component: Home
  },
  {
    path: '/flycomponents/autocomplete',
    label: 'Autocomplete',
    component: Autocomplete
  },
  {
    path: '/flycomponents/button',
    label: 'Button',
    component: Button
  },
  {
    path: '/flycomponents/datepicker',
    label: 'Datepicker',
    component: Datepicker
  },
  {
    path: '/flycomponents/form-group',
    label: 'FormGroup',
    component: FormGroup
  },
  {
    path: '/flycomponents/money-input',
    label: 'MoneyInput',
    component: MoneyInput
  },
  {
    path: '/flycomponents/phone-input',
    label: 'PhoneInput',
    component: PhoneInput
  },
  {
    path: '/flycomponents/textarea',
    label: 'Textarea',
    component: Textarea
  },
  {
    path: '/flycomponents/text-input',
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
  <Router>
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
        {routes.map((route, index) => (
          <Route
            exact={route.exact}
            key={index}
            path={route.path}
            component={route.component}
          />
        ))}
        <Redirect from="/" to="flycomponents" />
      </div>
    </div>
  </Router>
)

render(<App />, document.getElementById('app'))
