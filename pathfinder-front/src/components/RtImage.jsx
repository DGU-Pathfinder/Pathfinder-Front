import React from "react";
import { ConfigProvider, Table } from "antd";
import { useState, useEffect, useRef } from "react";
import "./RtImage.scss";

const columns = [
    {
        title: " ",
        dataIndex: "Analyzer",
        key: 'Analyzer'
    },
    {
        title: "Slag",
        dataIndex: "slag",
        key: 'slag'
    },
    {
        title: "Porosity",
        dataIndex: "porosity",
        key: 'porosity'
    },
    {
        title: "Others",
        dataIndex: "others",
        key: 'others'
    },
];

function makeDataForTable(data_set, name, analyzer) {
    let data = [];
    let slag_cnt = 0;
    let porosity_cnt = 0;
    let others_cnt = 0;

    if (data_set === null)
        return 0;
    else if (data_set === "no expert data")
        return {
            key: '1',
            Analyzer: analyzer,
            slag: '-',
            porosity: '-',
            others: '-',
        };
    data_set = data_set[0][name];
    for (const value of data_set) {
        if (value["defect_type"] === "slag")
            slag_cnt += 1;
        else if (value["defect_type"] === "porosity")
            porosity_cnt += 1;
        else if (value["defect_type"] === "others")
            others_cnt += 1;
    }
    data = {
        key: '1',
        Analyzer: analyzer,
        slag: slag_cnt,
        porosity: porosity_cnt,
        others: others_cnt,
    }
    return data;
}

function RtImage({ rtImage }) {
    const { image, image_name, ai_model_set, expert } = rtImage;
    const defects = rtImage.ai_model_set[0].ai_defect_set;
    const ai_model_data = makeDataForTable(ai_model_set, "ai_defect_set", "AI");
    const expert_data = makeDataForTable(expert?.[0]?.expert_defect_set || "no expert data", "expert_defect_set", "Expert");
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
        <div className="rt-image">
            <div style={{ position: 'relative' }}>
                <img
                    className="small-image"
                    ref={imageRef}
                    src={image}
                    alt={image_name}
                    style={{
                        width: "100%",
                        border: "3px solid white",
                        marginTop: "2%",
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
                            border: '1.5px solid red',
                            marginTop: "2%",
                        }} />
                    );
                })}
            </div>
            <p style={{
                marginTop: "0.5%",
                marginBottom: "1%",
                fontWeight: "bold",
            }}>
                {image_name}
            </p>

            <ConfigProvider
                theme={{
                    token: {
                        colorText: 'rgba(255, 255, 255)',
                        colorTextPlaceholder: 'rgba(255, 255, 255)',
                        colorTextDisabled: 'rgba(255, 255, 255)',
                        colorIcon: 'rgba(255, 255, 255)',
                        colorBgContainer: '#121212',
                    },
                }}
            >
                <Table id="table-fixed-height"
                    columns={columns}
                    dataSource={[ai_model_data, expert_data]}
                    pagination={false}
                    bordered
                    style={{
                        width: "70%",
                        margin: "auto",
                        marginBottom: "2%",
                    }}
                    scroll={{ y: 70 }}
                />
            </ConfigProvider>
        </div>
    );
}

export default RtImage;