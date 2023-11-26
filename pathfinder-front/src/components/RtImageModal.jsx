import React, { createContext, useState, useContext, useRef, useEffect, useCallback } from "react";
import Modal from "react-modal";
import { Button } from "antd";
import "./RtImageModal.scss";

const RtImageModalContext = createContext();

export const useRtModal = () => useContext(RtImageModalContext);

function RtImageModal({ isOpen, onRequestClose, rtImage }) {
    const { image, image_name } = rtImage;
    const [currentMode, setCurrentMode] = useState(null);
    const [currentBox, setCurrentBox] = useState(null);

    const [boxes, setBoxes] = useState([]);
    const imageRef = useRef(null);

    const getCoordinates = (e) => {
        const rect = imageRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        return { x, y };
    };

    const handleEvent = useCallback((e) => {
        const coords = getCoordinates(e);
        console.log("coords : ", coords);

        switch (currentMode) {
            case 'create':
                // 생성 모드에서의 로직
                if (e.type === 'mousedown') {
                    console.log("mousedown");
                    const newBox = {
                        id: Date.now(),
                        xmin: coords.x,
                        ymin: coords.y,
                        xmax: coords.x,
                        ymax: coords.y,
                    };
                    setCurrentBox(newBox);
                } else if (e.type === 'mouseup') {
                    console.log("mouseup");
                    const completedBox = {
                        ...currentBox,
                        xmax: coords.x,
                        ymax: coords.y,
                    };

                    console.log("completedBox : ", completedBox);
                    setBoxes(prevBoxes => [...prevBoxes, completedBox]);
                    setCurrentBox(null);
                }
                break;
            case 'delete':
                // 삭제 모드에서의 로직
                break;
            case 'edit':
                // 수정 모드에서의 로직
                break;
            default:
            // 기타 경우
        }
    }, [currentMode, currentBox]);

    // const handleDragStart = (e) => {
    // e.preventDefault();
    // };

    useEffect(() => {
        const imageElement = imageRef.current;
        if (!imageElement) return;

        imageElement.addEventListener('mousedown', handleEvent);
        imageElement.addEventListener('mouseup', handleEvent);
        // imageElement.addEventListener('dragstart', handleDragStart);


        return () => {
            imageElement.removeEventListener('mousedown', handleEvent);
            imageElement.removeEventListener('mouseup', handleEvent);
            // imageElement.removeEventListener('dragstart', handleDragStart);
        };
    }, [handleEvent]);

    return (
        <Modal
            ariaHideApp={false}
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                },
                content: {
                    // top: "10%",
                    borderRadius: "10px",
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                },
            }}
        >
            <div className="rt-image-modal-header">
                <Button
                    className="rt-image-modal-save-button"
                    onClick={onRequestClose}
                    style={{
                        display: "block",
                        position: "fixed",
                        width: "10%",
                        // marginTop: "1%",
                        marginLeft: "80%",
                    }}
                >
                    save and close
                </Button>
                <Button onClick={() => setCurrentMode('create')}>박스 생성</Button>
                <Button onClick={() => setCurrentMode('edit')}>박스 수정</Button>
                <Button onClick={() => setCurrentMode('delete')}>박스 삭제</Button>
                <Button onClick={() => setCurrentMode('dafault')}>기본</Button>
            </div>
            <div className="rt-image-modal-body"
                style={{ position: 'relative' }}>
                <img
                    className="rt-image-modal-image"
                    ref={imageRef}
                    src={image}
                    alt={image_name}
                    style={{
                        display: "block", margin: "auto",
                    }}
                />
                {boxes.map((box, index) => (
                    <div key={index} style={{
                        position: 'absolute',
                        border: '2px solid red',
                        left: box.xmin,
                        top: box.ymin,
                        width: box.xmax - box.xmin,
                        height: box.ymax - box.ymin,

                    }} />
                ))}
            </div>
        </Modal>
    );
}

export default RtImageModal;