import React, { Component } from 'react'
import { render } from 'react-dom'
import {
  HashRouter as Router,
  Link,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import Alert from './components/Alert'
import Autocomplete from './components/Autocomplete'
import Button from './components/Button'
import Datepicker from './components/Datepicker'
import FormGroup from './components/FormGroup'
import MoneyInput from './components/MoneyInput'
import PhoneInput from './components/PhoneInput'
import Select from './components/Select'
import Textarea from './components/Textarea'
import TextInput from './components/TextInput'
import Title from './components/Title'
import Home from './components/Home'
import icon from './images/hamburger-menu.svg'
import './index.css'

const routes = [
  {
    path: '/',
    exact: true,
    label: 'Home',
    component: Home
  },
  {
    path: '/alert',
    label: 'Alert',
    component: Alert
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

class NavBar extends Component {
  constructor(props) {
    super(props)

    this.state = { open: false }
  }

  handleClick = () => {
    this.setState(
      prevState => ({ open: !prevState.open }),
      () => {
        this.props.onChange(this.state.open)
      }
    )
  }

  render() {
    return (
      <div className="Docs-nav">
        <img className="Docs-icon" src={icon} onClick={this.handleClick} />
        <Title />
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
    )
  }
}

const Content = () => (
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
)

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { open: false }
  }

  onChange = open => {
    this.setState({
      open: open
    })
  }

  render() {
    return (
      <Router hashType="noslash">
        <div className={`Docs ${this.state.open ? 'is-open' : ''}`}>
          <NavBar onChange={this.onChange} />
          <Content />
        </div>
      </Router>
    )
  }
}

render(<App />, document.getElementById('app'))
