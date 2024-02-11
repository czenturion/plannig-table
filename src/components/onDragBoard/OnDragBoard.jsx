import { Layer, Stage } from "react-konva";
import URLImage from "../urlImage/URLImage";
import React from "react";
import s from "./onDragBoard.module.css";

const OnDragBoard = ({ setImages, images, dragUrl, stageRef }) => {
    return <div
        className={s.onDragBoard}
        onDrop={(e) => {
            e.preventDefault();
            // register event position
            stageRef.current.setPointersPositions(e);
            // add image
            setImages(
                images.concat([
                    {
                        ...stageRef.current.getPointerPosition(),
                        src: dragUrl.current,
                    },
                ])
            );
        }}
        onDragOver={(e) => e.preventDefault()}
    >
        <Stage
            className={s.onDragBoardNested}
            width={800}
            height={600}
            style={{width: 800, height: 600, border: '1px solid grey'}}
            ref={stageRef}
        >
            <Layer>
                {images.map((image, index) => {
                    return (
                        <URLImage key={index}
                                  image={image}
                                  draggable
                                  onDragStart={(e) => {
                                      e.target.moveToTop();
                                  }}
                                  onDragMove={(e) => {
                                      const newImages = images.slice();
                                      newImages[index] = {
                                          ...image, x: e.target.x(), y: e.target.y()
                                      };
                                      setImages(newImages);
                                  }}
                        />
                    )
                })}
            </Layer>
        </Stage>
    </div>
}

export default OnDragBoard