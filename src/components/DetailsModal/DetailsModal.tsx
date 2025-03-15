import React from 'react';
import ReactDOM from 'react-dom';
import styles from './DetailsModal.module.css';

interface DetailsModalProps {
  selectedPhoto: string;
  handleCloseModal: () => void;
}

const DetailsModal: React.FC<DetailsModalProps> = ({ selectedPhoto, handleCloseModal }) => {
  return ReactDOM.createPortal(
    <div className={styles.modal} onClick={handleCloseModal}>
      <img src={selectedPhoto} alt="Selected" />
      <button className={styles.closeButton} onClick={handleCloseModal}>X</button>
    </div>,
    document.body
  );
};

export default DetailsModal;