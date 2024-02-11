import useImage from "use-image";
import {Image} from "react-konva";
import React from "react";
import s from "./urlImage.module.css";

const URLImage = ({ image, draggable, onDragStart, onDragMove, onDragEnd }) => {
    const [img] = useImage(image.src);
    return (
        <Image
            className={s.image}
            image={img}
            x={image.x}
            y={image.y}
            offsetX={img ? img.width / 2 : 0}
            offsetY={img ? img.height / 2 : 0}
            draggable={draggable}
            onDragStart={onDragStart}
            onDragMove={onDragMove}
            onDragEnd={onDragEnd}
        />
    );
};

export default URLImage