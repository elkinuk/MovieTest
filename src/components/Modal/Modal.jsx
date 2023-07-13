import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import './styles.scss';

function Modal({ children, isOpen, closeModal }) {
  if (!isOpen) return null;

  return (
    <>
      {createPortal(
        <div data-testid="modal" className="modal1">
          <div className="body">
            <button
              type="button"
              className="close"
              onClick={closeModal}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="children">{children}</div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
