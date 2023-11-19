import React, { useEffect, useState } from "react";
import Axios from "axios";
import RtImage from "RtImage"
import { Pagination } from "antd";

const apiUrl = "http://localhost:8000/api/rt-images/";

function RtImageList() {
    const [rtImageList, setRtImageList] = useState([]);

    useEffect(() => {
        Axios.get(apiUrl)
            .then((response) => {
                const { data } = response;
                console.log("loaded response : ", response);
                setRtImageList(data.results);
            })
            .catch((error) => {
                console.log(error);
            });

        console.log("mounted 123131");
    }, []);

    return (
        <div>
            <h2>RT Image List</h2>
            {rtImageList.map(rtImage => (
                <RtImage rtImage={rtImage} key={rtImage.pk}/>
            ))}
        </div>
    );
    
}

export default RtImageList;