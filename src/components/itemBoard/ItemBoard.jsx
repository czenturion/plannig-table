import React, {useState} from "react";
import s from "./itemBoard.module.css";
import ItemsCarousel from 'react-items-carousel';

const imgNames = [
    'small-table.png',
    'big-table.png',
    'bush.png',
    'lamp.png',
    'lamp2.png',
]

const ItemBoard = ({ saveLayoutToFile, handleFileInputChange, dragUrl }) => {
    const onSelectButtonClick = () => {
        document.getElementById('selectButton').click();
    }

    return <div className={s.itemBoard}>
        <div className={s.carousel}>
            <Carousel dragUrl={dragUrl}/>
        </div>
        <div className={s.fileProcessing}>
            <button className={s.saveButton} onClick={saveLayoutToFile}>Сохранить расстановку в файл</button>
            <input className={s.selectInput} id="selectButton" type="file" onChange={handleFileInputChange}/>
            <button className={s.selectButton} onClick={onSelectButtonClick}>Загрузить расстановку</button>
        </div>
    </div>
}

const Carousel = ({dragUrl}) => {
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;
    return (
        <div style={{ padding: `0 ${chevronWidth}px` }}>
            <ItemsCarousel
                requestToChangeActive={setActiveItemIndex}
                activeItemIndex={activeItemIndex}
                numberOfCards={2}
                gutter={20}

                leftChevron={<button>{'<'}</button>}
                rightChevron={<button>{'>'}</button>}
                outsideChevron
                chevronWidth={chevronWidth}
            >
                {imgNames.map(name => <div className={s.itemBox} key={name}><img
                    className={s.item}
                    alt={name}
                    src={require(`../../assets/img/${name}`)}
                    draggable="true"
                    onDragStart={(e) => {
                        dragUrl.current = e.target.src;
                    }}
                /></div>)}
            </ItemsCarousel>
        </div>
    );
}

export default ItemBoard