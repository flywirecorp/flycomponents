import React from 'react'
import ReactDOM from 'react-dom'
import Input from '../../components/Input'
import './app.scss'

const element = (
  <div>
    <h1>Hello, world</h1>
    <Input name='arr' type='text'/>
  </div>
)

ReactDOM.render(
  element,
  document.getElementById('root')
)
