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

function getCntDefectType(defect_set) {
    let slag_cnt = 0;
    let porosity_cnt = 0;
    let others_cnt = 0;
    console.log("defect_set_____ : ", defect_set);
    for (var index = 0; index < defect_set.length; index++) {
        if (defect_set[index]["defect_type"] === "slag")
            slag_cnt += 1;
        else if (defect_set[index]["defect_type"] === "porosity")
            porosity_cnt += 1;
        else if (defect_set[index]["defect_type"] === "others")
            others_cnt += 1;
    }
    // console.log("slag_cnt : ", slag_cnt);
    // console.log("porosity_cnt : ", porosity_cnt);
    // console.log("others_cnt : ", others_cnt);

    return { slag_cnt, porosity_cnt, others_cnt };
}

function makeDataForTable(data_set, name) {
    let data = [];
    if (data_set === null)
        return 0;
    data_set = data_set[0][name];
    console.log("data_set!!!!!!!!!!!!!! : ", data_set);
    console.log("data_set length : ", data_set.length);
    // for (let index = 0; index < data_set.length; index++) {
    //     let ret = getCntDefectType(data_set[index]);
    //     // console.log("ret : ", ret);
    //     data.push({
    //         key: index,
    //         slag: ret["slag_cnt"],
    //         porosity: ret["porosity_cnt"],
    //         others: ret["others_cnt"],
    //     });

    // }
    let slag_cnt = 0;
    let porosity_cnt = 0;
    let others_cnt = 0;
    for (const value of data_set) {
        // let ret = getCntDefectType(value);
        if (value["defect_type"] === "slag")
            slag_cnt += 1;
        else if (value["defect_type"] === "porosity")
            porosity_cnt += 1;
        else if (value["defect_type"] === "others")
            others_cnt += 1;
        // data.push({
        // key: index,
        // slag: ret["slag_cnt"],
        // porosity: ret["porosity_cnt"],
        // others: ret["others_cnt"],
        // });

    }
    data = {
        slag: slag_cnt,
        porosity: porosity_cnt,
        others: others_cnt,
    }
    console.log("data@@@@@@@@@@@@@@@@@ : ", data);
    return data;
}

function RtImage({ rtImage }) {
    const { image, image_name, ai_model_set, expert } = rtImage;
    // console.log("rtImage : ", rtImage);
    console.log("ai_model_set<><><><><><><><><><><>< : ", ai_model_set[0]["ai_defect_set"]);
    const { slag, porosity, others } = makeDataForTable(ai_model_set, "ai_defect_set");
    console.log("slag()()()()()()()()()()()()() : ", slag);
    console.log("porosity()()()()()()()()()()()()() : ", porosity);
    console.log("others()()()()()()()()()()()()() : ", others);
    // console.log("ai_model_data : ", ai_model_data);
    // const { expert_data } = makeDataForTable(expert);
    // const combinedData = ai_model_data.concat(expert_data);

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
                font: "bold",
            }}>
                {image_name}</p>

            <ConfigProvider
                theme={{
                    token: {
                        colorText: 'rgba(255, 255, 255)',
                        colorTextPlaceholder: 'rgba(255, 255, 255)',
                        colorTextDisabled: 'rgba(255, 255, 255)',
                        colorIcon: 'rgba(255, 255, 255)',
                        // margin: '0px',
                        // controlHeight: '10px',
                        // colorTextDescription: 'rgba(255, 255, 255)',
                        // colorPrimary: '#121212',
                        // boarderColor: 'white',
                        // headerBg: '#121212',
                        colorBgContainer: '#121212',
                    },
                    components: {
                        Table: {
                            // headerBg: '#121212',
                        },
                    }
                }}
            >
                <Table id="table-fixed-height"
                    columns={columns}
                    dataSource={[slag, porosity, others]}
                    pagination={false}
                    bordered
                    style={{
                        width: "60%",
                        margin: "auto",
                        // textAlign: "center",
                    }}
                    scroll={{ y: 70 }}

                />
            </ConfigProvider>

        </div>
    );
}

export default RtImage;