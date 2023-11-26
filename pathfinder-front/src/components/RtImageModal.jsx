import React, { createContext, useState, useContext } from "react";
import Modal from "react-modal";

const RtImageModalContext = createContext();

export const useRtModal = () => useContext(RtImageModalContext);

function RtImageModal({ isOpen, onRequestClose, rtImage }) {
    const { image, image_name } = rtImage;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
        >
            <div className="rt-image-modal-body" style={{ zIndex: 1000 }}>
                <img
                    className="rt-image-modal-image"
                    src={image}
                    alt={image_name}
                    // height={200}
                    // width={1000}
                    style={{
                        display: "block", margin: "auto",
                    }}
                />
                <button onClick={onRequestClose}>닫기</button>
            </div>
        </Modal>
    );
}

export default RtImageModal;