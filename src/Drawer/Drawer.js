import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';
import Nothing from '../Nothing';
import Portal from '../Portal';
import { ESC } from '../utils/keycodes';
import { useDocumentEvent } from '../hooks';
import { X } from '../icons';

function Drawer({
  children,
  className,
  closeButtonText,
  closeLabel = 'Close',
  isOpen = false,
  onClose = () => {}
}) {
  const [activeElement, setActiveElement] = useState();

  function handleOnClose() {
    activeElement?.focus();
    onClose();
  }

  function handleKeyDown(evt) {
    const keyCode = evt.keyCode;

    if (isOpen && keyCode === ESC) {
      handleOnClose();
    }
  }

  useDocumentEvent('keydown', handleKeyDown);

  if (!isOpen) {
    return <Nothing />;
  }

  return (
    <Portal>
      <FocusTrap
        focusTrapOptions={{
          onActivate: () => setActiveElement(document.activeElement)
        }}
      >
        <div
          aria-modal
          className={['Drawer', className].filter(Boolean).join(' ')}
          data-testid="drawer"
          role="dialog"
          tabIndex="-1"
        >
          <div
            className="Drawer-overlay"
            role="presentation"
            onClick={handleOnClose}
          />
          <aside className="Drawer-content" role="document">
            <button
              className="Drawer-close"
              onClick={handleOnClose}
              aria-label={closeLabel}
            >
              <X className="Drawer-closeIcon" alt="" aria-hidden />
              {closeButtonText}
            </button>
            {children}
          </aside>
        </div>
      </FocusTrap>
    </Portal>
  );
}

Drawer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  closeButtonText: PropTypes.string,
  closeLabel: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
};

export default Drawer;
