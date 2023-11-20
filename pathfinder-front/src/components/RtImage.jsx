// import { LeftCircleFilled } from "@ant-design/icons";
import React from "react";
import "./RtImage.scss";
import { Table, Text } from "antd";

const columns = [
    {
        title: "Slag",
        dataIndex: "slag",
    },
    {
        title: "Porosity",
        dataIndex: "porosity",
    },
    {
        title: "Others",
        dataIndex: "others",
    },
];

function getCntDefectType(defect_set) {
    var slag_cnt = 0;
    let porosity_cnt = 0;
    let others_cnt = 0;
    for (let index = 0; index < defect_set.length; index++) {
        if (defect_set[index]["defect_type"] === "slag")
            slag_cnt += 1;
        else if (defect_set["defect_type"] === "porosity")
            porosity_cnt += 1;
        else
            others_cnt += 1;
    }

    return { slag_cnt, porosity_cnt, others_cnt };
}

function makeDataForTable(ai_model_set) {
    let data = [];
    if (ai_model_set === null)
        return 0;
    for (let index = 0; index < ai_model_set.length; index++) {
        let ret = getCntDefectType(ai_model_set[index]);
        data.push({
            key: index,
            slag: ret["slag_cnt"],
            porosity: ret["porosity_cnt"],
            others: ret["others_cnt"],
        });
    }
    return data;
}

function RtImage({ rtImage }) {
    const { image, image_name, ai_model_set, expert } = rtImage;
    // const { ai_model_data } = makeDataForTable(ai_model_set);
    // const { expert_data } = makeDataForTable(expert);
    // const combinedData = ai_model_data.concat(expert_data);

    return (
        <div className="rt-image">
            <img
                className="small-image"
                src={image}
                alt={image_name}
                style={{
                    width: "50%",
                    border: "3px solid white",
                    marginTop: "2%",
                }}
            />
            <p style={{
                marginTop: "0px",
                marginBottom: "0px",
            }}>
                {image_name}</p>

            {/* <Table
                columns={columns}
                dataSource={combinedData}
                pagination={false}
                bordered
            /> */}

        </div>
    );
}

export default RtImage;