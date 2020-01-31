import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class FileInput extends Component {
  static propTypes = {
    accepts: PropTypes.string,
    buttonText: PropTypes.string,
    className: PropTypes.string,
    hint: PropTypes.string,
    multiple: PropTypes.bool,
    onChange: PropTypes.func,
    uploading: PropTypes.bool
  };

  static defaultProps = {
    accepts: '',
    buttonText: 'Upload',
    multiple: false,
    onChange: () => {},
    uploading: false
  };

  constructor(props) {
    super(props);
    this.fileInputRef = React.createRef();
  }

  handleClick = () => {
    this.fileInputRef.current.click();
  };

  render() {
    const {
      accepts,
      className,
      hint,
      multiple,
      onChange,
      buttonText,
      uploading
    } = this.props;

    return (
      <div className={classNames('FileInput', className)}>
        <input
          ref={this.fileInputRef}
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
          data-qa="submitButton"
        >
          {buttonText}
        </button>
      </div>
    );
  }
}

export default FileInput;
