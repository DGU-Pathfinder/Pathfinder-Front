import React, { createContext, useState, useContext, useRef, useEffect, useCallback } from "react";
import Modal from "react-modal";
import { Button, FloatButton } from "antd";
import "./RtImageModal.scss";
import { PlusOutlined, DeleteOutlined, EyeOutlined, SaveOutlined } from "@ant-design/icons";
import axios from "axios";

const RtImageModalContext = createContext();
let id_cnt = 0;
const apiUrl = "http://127.0.0.1:8000/api/defects/"

export const useRtModal = () => useContext(RtImageModalContext);

function getBorderColor(defectType) {
    switch (defectType) {
        case 'slag':
            return 'red';
        case 'porosity':
            return 'blue';
        case 'others':
            return 'rgba(97, 197, 84)';
        default:
            return 'white';
    }
}

function RtImageModal({ isOpen, onRequestClose, rtImage }) {
    const { image, image_name } = rtImage;
    const [currentMode, setCurrentMode] = useState('default');
    const [currentBox, setCurrentBox] = useState(null);

    const [boxes, setBoxes] = useState([]);
    const [deletedBoxes, setDeletedBoxes] = useState([]);
    const [addedBoxes, setAddedBoxes] = useState([]);
    const [currentDefectType, setDefectType] = useState('slag');
    const imageRef = useRef(null);

    useEffect(() => {
        const initialBoxes = rtImage.expert ? rtImage.expert.expert_defect_set : (rtImage.ai_model?.ai_defect_set || []);

        console.log("initialBoxes : ", initialBoxes);

        const boxes = initialBoxes.map(box => ({
            ...box,
            id: id_cnt++,
            isOriginal: true,
        }));

        setBoxes(boxes);
    }, []);

    const saveDefects = async () => {
        addedBoxes.forEach(box => {
            axios.post(apiUrl, {
                "rt_Image_id": rtImage.id,
                "expert_defect_set": boxes.filter(box => box.isOriginal),
            },
                { withCredentials: true }
            );
        });
        deletedBoxes.forEach(box => {
            axios.delete(apiUrl + deletedBoxes + "/", {
                "image": rtImage.id,
                "expert_defect_set": boxes.filter(box => box.isOriginal),
            },
                { withCredentials: true }
            );
        });
    }


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
                if (e.type === 'mousedown') {
                    console.log("mousedown");
                    const newBox = {
                        id: id_cnt++,
                        // modifier: 'user',
                        // modifier_name: 'User',
                        modified_date: new Date().toISOString(),
                        defect_type: currentDefectType,
                        xmin: coords.x,
                        ymin: coords.y,
                        xmax: coords.x,
                        ymax: coords.y,
                    };
                    setCurrentBox(newBox);
                    console.log("newBox : ", newBox);
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
            default:
        }
    }, [currentMode, currentBox, currentDefectType]);

    const deleteBox = (boxId) => {
        if (currentMode === 'delete') {
            if (boxes.find(box => box.id === boxId)?.isOriginal) {
                setDeletedBoxes(prevDeletedBoxes => [...prevDeletedBoxes, boxId]);
                setBoxes(prevBoxes => prevBoxes.filter(box => box.id !== boxId));
            }
        }
    };

    useEffect(() => {
        const imageElement = imageRef.current;
        if (!imageElement) return;

        imageElement.addEventListener('mousedown', handleEvent);
        imageElement.addEventListener('mouseup', handleEvent);

        return () => {
            imageElement.removeEventListener('mousedown', handleEvent);
            imageElement.removeEventListener('mouseup', handleEvent);
        };
    }, [handleEvent]);

    return (
        <Modal
            ariaHideApp={false}
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{
                overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)", },
                content: {
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
                {boxes.map((box, index) => {

                    let border_style = '2px solid '
                    border_style += getBorderColor(box.defect_type);

                    const box_style = {
                        position: 'absolute',
                        border: border_style,
                        left: box.xmin,
                        top: box.ymin,
                        width: box.xmax - box.xmin,
                        height: box.ymax - box.ymin,
                    }
                    return (
                        <div
                            key={index}
                            style={box_style}
                            onClick={() => deleteBox(box.id)}
                        />
                    );
                }
                )}
            </div>

            <FloatButton.Group shape="square" style={{ right: 124, bottom: 75 }}>
                <FloatButton
                    description="Slag"
                    shape="square"
                    style={{
                        fontWeight: 'bold',
                        right: 94,
                        color: currentDefectType !== 'slag' ? '#121212' : 'rgba(228, 122, 58)'
                    }}
                    onClick={() => setDefectType('slag')}
                />
                <FloatButton
                    description="Poro"
                    shape="square"
                    style={{
                        fontWeight: 'bold',
                        right: 94,
                        color: currentDefectType !== 'porosity' ? '#121212' : 'rgba(228, 122, 58)'
                    }}
                    onClick={() => setDefectType('porosity')}
                />
                <FloatButton
                    description="Other"
                    shape="square"
                    style={{
                        fontWeight: 'bold',
                        right: 94,
                        color: currentDefectType !== 'others' ? '#121212' : 'rgba(228, 122, 58)'
                    }}
                    onClick={() => setDefectType('others')}
                />
            </FloatButton.Group>

            <FloatButton.Group shape="circle" style={{ right: 64, bottom: 60 }}>
                <FloatButton
                    icon={
                        <SaveOutlined style={{ color: 'red' }} />
                    }
                // onClick={() => saveDefects()}
                />
                <FloatButton
                    icon={
                        <EyeOutlined style={{ color: currentMode !== 'default' ? '#121212' : 'rgba(228, 122, 58)' }} />
                    }
                    onClick={() => setCurrentMode('default')}
                />
                <FloatButton
                    icon={
                        <PlusOutlined style={{ color: currentMode !== 'create' ? '#121212' : 'rgba(228, 122, 58)' }} />
                    }
                    onClick={() => setCurrentMode('create')}
                />
                <FloatButton
                    icon={
                        <DeleteOutlined style={{ color: currentMode !== 'delete' ? '#121212' : 'rgba(228, 122, 58)' }} />
                    }
                    onClick={() => setCurrentMode('delete')}
                />
            </FloatButton.Group>
        </Modal>
    );
}

export default RtImageModal;