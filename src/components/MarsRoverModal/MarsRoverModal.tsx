import React from "react";
import ReactDOM from "react-dom";
import styles from "./MarsRoverModal.module.css";

interface MarsRoverModalProps {
  selectedPhoto: {
    img_src: string;
    sol: number;
  };
  handleCloseModal: () => void;
}

const MarsRoverModal: React.FC<MarsRoverModalProps> = ({
  selectedPhoto,
  handleCloseModal,
}) => {
  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <img src={selectedPhoto.img_src} alt={`Sol ${selectedPhoto.sol}`} />
      <button className={styles.closeButton} onClick={handleCloseModal}>
        X
      </button>
    </div>,
    document.body
  );
};

export default MarsRoverModal;