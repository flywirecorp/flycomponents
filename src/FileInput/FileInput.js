import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class FileInput extends Component {
  static propTypes = {
    accepts: PropTypes.string,
    buttonText: PropTypes.string,
    hint: PropTypes.string,
    multiple: PropTypes.bool,
    onChange: PropTypes.func,
    uploading: PropTypes.bool
  };

  static defaultProps = {
    accepts: '',
    multiple: false,
    buttonText: 'Upload',
    uploading: false
  };

  handleClick = () => {
    this.fileInput.click();
  };

  render() {
    const {
      accepts,
      hint,
      multiple,
      onChange,
      buttonText,
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
          multiple={multiple}
          onChange={onChange}
          data-qa="fileInput"
        />

        <p
          className="FileInput-hint"
          dangerouslySetInnerHTML={{ __html: hint }}
          data-qa="hint"
        />

        <button
          className={classNames('FileInput-submit', {
            'FileInput--uploading': uploading
          })}
          disabled={uploading}
          onClick={this.handleClick}
          onChange={onChange}
          data-qa="submitButton"
        >
          {buttonText}
        </button>
      </div>
    );
  }
}

export default FileInput;
