import React from 'react';
import { loadFromFile, saveToFile } from "./service/fileProcessing/FileProcessing";
import ItemBoard from "./components/itemBoard/ItemBoard";
import OnDragBoard from "./components/onDragBoard/OnDragBoard";
import s from "./App.module.css";



const App = () => {
    const dragUrl = React.useRef();
    const stageRef = React.useRef();
    const [ images, setImages ] = React.useState([]);

    const saveLayoutToFile = () => {
        saveToFile(images, 'layout.json');
    };

    const handleFileInputChange = (event) => {
        if (event.target.files[0]) loadFromFile(event.target.files[0], setImages);
    };

    return (
        <div className={s.app}>
            <p className={s.title}>
                Выберите предмет интерьера и переместите на карту заведения:
            </p>
            <br/>
            <ItemBoard
                saveLayoutToFile={saveLayoutToFile}
                handleFileInputChange={handleFileInputChange}
                dragUrl={dragUrl}
            />
            <OnDragBoard
                setImages={setImages}
                images={images}
                dragUrl={dragUrl}
                stageRef={stageRef}
            />
        </div>
    );
};

export default App;