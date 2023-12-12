import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import RtImage from "../../components/RtImageList/RtImage"
import Filter from "../../components/RtImageList/Filter"
import { Col, Row, Pagination, ConfigProvider } from "antd";
import "./RtImageList.scss"

const apiUrl = "http://127.0.0.1:8000/api/rt-images/";


function RtImageList() {
  const [query, setQuery] = useState('');
  const [rtImageList, setRtImageList] = useState([]);
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const onChange = (page) => {
    setCurrent(page);
    console.log(page);
  };

  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
  };

  useEffect(() => {
    let temp;

    temp = "?page=" + current;
    console.log("query : ", query);

    axios.get(apiUrl + temp, {
      params: {
        upload_date_after: query.upload_date_after,
        upload_date_before: query.upload_date_before,
        uploader: query.uploader,
        modifier: query.modifier,
        score_min: query.score_min,
        score_max: query.score_max,
        expert_check: query.expert_check
      }, withCredentials: true
    })
      .then((response) => {
        const { data } = response;
        console.log("loaded response : ", response);
        // console.log("expert_check : ", query.expert_check);

        setRtImageList(data.results);
        setData(data);
      })
      .catch((error) => {
        if (error.response.status === 403) {
          // alert("로그인이 필요합니다.");
          window.location.href = "/login";
        }
        console.log(error);
      });
    console.log("Rt Image List mounted.");
  }, [current, query]);

  return (
    <div className="rt-page">
      <ConfigProvider theme={{
        token: {
          colorPrimary: '#121212'
        }
      }}>
        <Filter onQueryChange={handleQueryChange} />
      </ConfigProvider>
      <div className="rt-images-grid">
        <Row
          style={{ rowGap: "0px" }}
        >
          {rtImageList.map(rtImage => (
            <Col className="each-grid" span={12} key={rtImage.pk}>
              <Link
                key={rtImage.pk}
                to={`/rt-image/${rtImage.pk}`}
                style={{ color: "white" }}
              >
                <RtImage rtImage={rtImage} />
              </Link>
            </Col>
          ))}
        </Row>
      </div>

      <ConfigProvider
        theme={{
          token: {
            colorText: '#909090'
          },
        }}
      >
        <Pagination
          current={current}
          onChange={onChange}
          defaultCurrent={1}
          defaultPageSize={6}
          pageSize={6}
          style={{
            textAlign: "center",
            margin: "3%",
          }}
          total={data.count}
          showSizeChanger={false}
        >
        </Pagination>
      </ConfigProvider>
    </div >
  );
}

export default RtImageList;