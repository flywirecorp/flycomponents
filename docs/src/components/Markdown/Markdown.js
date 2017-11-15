import PropTypes from 'prop-types';
import React from 'react';
import marked from 'marked';

function createMarkup(html) {
  return { __html: html };
}

const Markdown = ({ source }) => {
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  });
  const html = marked(source);

  return (
    <div className="markdown-body">
      <div dangerouslySetInnerHTML={createMarkup(html)} />
    </div>
  );
};

const { string } = PropTypes;

Markdown.propTypes = {
  source: string.isRequired
};

export default Markdown;
