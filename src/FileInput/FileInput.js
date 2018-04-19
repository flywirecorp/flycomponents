import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class FileInput extends Component {
  static propTypes = {
    accepts: PropTypes.string,
    browse: PropTypes.string,
    hint: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    placeholder: PropTypes.string,
    submit: PropTypes.string,
    uploading: PropTypes.bool
  };

  static defaultProps = {
    accepts: '',
    browse: 'Browse',
    placeholder: 'Choose document',
    submit: 'Upload',
    uploading: false
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.fileInput.click();
  }

  render() {
    const {
      accepts,
      browse,
      hint,
      onChange,
      onSubmit,
      placeholder,
      submit,
      uploading
    } = this.props;

    return (
      <div className="FileInput">
        <input
          ref={input => {
            this.fileInput = input;
          }}
          type="file"
          accept={accepts}
          onChange={onChange}
          data-qa="fileInput"
        />

        <div className="FileInput-input" onClick={this.handleClick}>
          <button data-qa="browseButton">{browse}</button>
          <span data-qa="fileName">{placeholder}</span>
        </div>

        <p
          className="FileInput-hint"
          dangerouslySetInnerHTML={{ __html: hint }}
          data-qa="hint"
        />

        <button
          className={classNames('FileInput-submit', {
            'FileInput--uploading': uploading
          })}
          onClick={onSubmit}
          data-qa="submitButton"
        >
          {submit}
        </button>
      </div>
    );
  }
}

export default FileInput;
