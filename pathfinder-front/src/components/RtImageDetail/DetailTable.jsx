import React from "react";
import { ConfigProvider, Table, Text } from "antd";
import { useState, useEffect, useRef } from "react";

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

function makeDataForTable(data_set, analyzer) {
  let data = [];
  let slag_cnt = 0;
  let porosity_cnt = 0;
  let others_cnt = 0;

  if (data_set === undefined)
    return 0;
  else if (data_set === "no expert data" || data_set === "no ai data")
    return {
      key: '1',
      Analyzer: analyzer,
      slag: '-',
      porosity: '-',
      others: '-',
    };
  console.log("data_set : ", data_set);
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

function DetailTable(props) {
  const defect_data = makeDataForTable(props.defect_set, props.analyzer);

  return (
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
        dataSource={[defect_data]}
        pagination={false}
        bordered
        style={{
          width: "70%",
          margin: "auto",
        }}
        scroll={{ y: 70 }}
      />
    </ConfigProvider>
  );
}

export default DetailTable;