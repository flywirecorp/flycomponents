import React from 'react'
import Markdown from './Markdown'
import './component.css'

export default ({ children, readme }) => (
  <section className="Component">
    <div className="Component-readme">
      {readme && <Markdown source={readme} />}
    </div>
    <div className="Component-example">
      <h4 className="Component-exampleTitle">Example</h4>
      {children}
    </div>
  </section>
)
