import React from "react";
import { useState, useEffect, useRef } from "react";
import "./RtImageDetailData.scss";

function RtImageDetailData({ rtImage }) {
    const { image, image_name } = rtImage;
    const defects = rtImage?.ai_model_set?.[0]?.ai_defect_set || [];

    const [originalSize, setOriginalSize] = useState({ width: 0, height: 0 });
    const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 });
    const imageRef = useRef(null);

    useEffect(() => {
        const imageObj = new Image();
        imageObj.onload = () => {
            setOriginalSize({ width: imageObj.naturalWidth, height: imageObj.naturalHeight });
            updateDisplaySize();
        };
        imageObj.src = image;

        window.addEventListener('resize', updateDisplaySize);

        return () => {
            window.removeEventListener('resize', updateDisplaySize);
        };
    }, [image]);

    const updateDisplaySize = () => {
        if (imageRef.current) {
            setDisplaySize({ width: imageRef.current.offsetWidth, height: imageRef.current.offsetHeight });
        }
    };

    const calculateAdjustedBox = (box) => {
        const widthRatio = displaySize.width / originalSize.width;
        const heightRatio = displaySize.height / originalSize.height;

        return {
            left: box.xmin * widthRatio,
            top: box.ymin * heightRatio,
            width: (box.xmax - box.xmin) * widthRatio,
            height: (box.ymax - box.ymin) * heightRatio
        };
    };

    return (
        <div className="rt-image-detail">
            <div style={{ position: 'relative' }}>
                <img
                    className="small-image"
                    ref={imageRef}
                    src={image}
                    alt={image_name}
                    style={{
                        width: "100%",
                        border: "3px solid white",
                        margin: "2%",
                    }}
                />
                {defects.map((box, index) => {
                    const adjustedBox = calculateAdjustedBox(box);
                    return (
                        <div key={index} style={{
                            position: 'absolute',
                            left: adjustedBox.left,
                            top: adjustedBox.top,
                            width: adjustedBox.width,
                            height: adjustedBox.height,
                            border: '2px solid red'
                        }} />
                    );
                })}
            </div>
        </div>
    );
}

export default RtImageDetailData;