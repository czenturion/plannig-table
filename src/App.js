import React from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';

const URLImage = ({ image, draggable, onDragStart, onDragMove, onDragEnd }) => {
  const [img] = useImage(image.src);
  return (
      <Image
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

const App = () => {
    const dragUrl = React.useRef();
    const stageRef = React.useRef();
    const [images, setImages] = React.useState([]);

    const saveToFile = (data, filename) => {
        const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
        const url = window.URL.createObjectURL(blob); //исправление
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    const loadFromFile = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = JSON.parse(event.target.result);
            setImages(data);
        };
        reader.readAsText(file);
    };

    const saveLayoutToFile = () => {
        saveToFile(images, 'layout.json');
    };

    const handleFileInputChange = (event) => {
        loadFromFile(event.target.files[0]);
    };

    return (
        <div>
            <p>
            Выберите предмет интерьера и переместите на карту заведения:
            </p>
            <br/>
            <div style={{display: "flex", alignItems: "center"}}>
                <img
                    alt="small-table"
                    src={require("./assets/img/small-table.png")}
                    draggable="true"
                    onDragStart={(e) => {
                        dragUrl.current = e.target.src;
                    }}
                />
                <img
                    alt="big-table"
                    src={require("./assets/img/big-table.png")}
                    draggable="true"
                    onDragStart={(e) => {
                        dragUrl.current = e.target.src;
                    }}
                />
                <img
                    alt="bush"
                    src={require("./assets/img/bush.png")}
                    draggable="true"
                    onDragStart={(e) => {
                        dragUrl.current = e.target.src;
                    }}
                />
                <img
                    alt="lamp"
                    src={require("./assets/img/lamp.png")}
                    draggable="true"
                    onDragStart={(e) => {
                        dragUrl.current = e.target.src;
                    }}
                />
                <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                    <button onClick={saveLayoutToFile}>Сохранить расстановку в файл</button>
                    <input type="file" onChange={handleFileInputChange} />
                </div>
            </div>
            <div
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
        </div>
    );
};

export default App;