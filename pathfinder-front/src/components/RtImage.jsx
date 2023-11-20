// import { LeftCircleFilled } from "@ant-design/icons";
import React from "react";
import "./RtImage.scss";

function RtImage({ rtImage }) {
    const { image, image_name } = rtImage;
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
            <table className="table">

            </table>
        </div>
    );
}

export default RtImage;