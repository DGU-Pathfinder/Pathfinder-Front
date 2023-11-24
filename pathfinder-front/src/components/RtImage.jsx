// import { LeftCircleFilled } from "@ant-design/icons";
import React from "react";
import "./RtImage.scss";
import { ConfigProvider, Table, Text } from "antd";

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

const expert_data = {
    key: '2',
    Analyzer: "Expert",
    slag: 9,
    porosity: 9,
    others: 6,
};

function makeDataForTable(data_set, name, analyzer) {
    let data = [];
    let slag_cnt = 0;
    let porosity_cnt = 0;
    let others_cnt = 0;

    if (data_set === null)
        return 0;
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
    const ai_model_data = makeDataForTable(ai_model_set, "ai_defect_set", "AI");
    // const expert_data = makeDataForTable(expert, "expert_defect_set", "Expert");

    return (
        <div className="rt-image">
            <img
                className="small-image"
                src={image}
                alt={image_name}
                style={{
                    width: "100%",
                    border: "3px solid white",
                    marginTop: "2%",
                }}
            />
            <p style={{
                marginTop: "0.5%",
                marginBottom: "1%",
                fontWeight: "bold",
            }}>
                {image_name}</p>

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