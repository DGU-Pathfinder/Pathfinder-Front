import React from "react";

function RtImage({ rtImage }) {
    const { image, image_name } = rtImage;
    return (
        <div>
            <img src={image} alt={image_name} />
            <p>{image_name}</p>
        </div>
    );
}

export default RtImage;