import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import './Modal.scss';

const Modal = ({ active, id, children }) => {
  const [activeModal, setActiveModal] = useState(false);

  useEffect(() => {
    setActiveModal(active);
  }, [active]);

  return (
    <div id={id} className={`modal ${activeModal ? 'active' : ''}`}>
      {children}
    </div>
  );
};

Modal.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string,
};

export const ModalContent = ({ onClose, children }) => {
  const contentRef = useRef(null);

  const closeModal = () => {
    contentRef.current.parentNode.classList.remove('active');
    if (onClose) onClose();
  };

  return (
    <div ref={contentRef} className="modal__content">
      {children}
      <div className="modal__content__close" onClick={closeModal}>
        <i className="bx bx-x"></i>
      </div>
    </div>
  );
};

ModalContent.propTypes = {
  onClose: PropTypes.func,
};

export default Modal;
