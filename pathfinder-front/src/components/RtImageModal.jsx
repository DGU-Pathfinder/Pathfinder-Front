import React, { createContext, useState, useContext, useRef } from "react";
import Modal from "react-modal";
import { Button, ConfigProvider } from "antd";
import "./RtImageModal.scss";

const RtImageModalContext = createContext();

export const useRtModal = () => useContext(RtImageModalContext);

function RtImageModal({ isOpen, onRequestClose, rtImage }) {
    const { image, image_name } = rtImage;

    // const [boxes, setBoxes] = useState([]);
    // const imageRef = useRef(null);

    // const handleBoxCreation = (e) => {
    // };

    // const handleBoxModification = (boxId, newDimensions) => {
    // };

    // const handleBoxDeletion = (boxId) => {
    // };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                },
                content: {
                    top: "10%",
                    borderRadius: "10px",
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                },
            }}
        >
            <div className="rt-image-modal-body">
                <img
                    className="rt-image-modal-image"
                    src={image}
                    alt={image_name}
                    style={{
                        display: "block", margin: "auto",
                    }}
                />
                <Button
                    className="rt-image-modal-save-button"
                    onClick={onRequestClose}
                    style={{
                        display: "block",
                        position: "fixed",
                        // margin: "auto",
                        // marginLeft: "auto",
                        marginTop: "2%",
                    }}
                >
                    save and close
                </Button>

            </div>
        </Modal>
    );
}

export default RtImageModal;