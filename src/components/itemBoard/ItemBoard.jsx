import React from "react";

const ItemBoard = ({ saveLayoutToFile, handleFileInputChange, dragUrl }) => {

    return <div style={{display: "flex", alignItems: "center"}}>
        <img
            alt="small-table"
            src={require("../../assets/img/small-table.png")}
            draggable="true"
            onDragStart={(e) => {
                dragUrl.current = e.target.src;
            }}
        />
        <img
            alt="big-table"
            src={require("../../assets/img/big-table.png")}
            draggable="true"
            onDragStart={(e) => {
                dragUrl.current = e.target.src;
            }}
        />
        <img
            alt="bush"
            src={require("../../assets/img/bush.png")}
            draggable="true"
            onDragStart={(e) => {
                dragUrl.current = e.target.src;
            }}
        />
        <img
            alt="lamp"
            src={require("../../assets/img/lamp.png")}
            draggable="true"
            onDragStart={(e) => {
                dragUrl.current = e.target.src;
            }}
        />
        <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
            <button onClick={saveLayoutToFile}>Сохранить расстановку в файл</button>
            <input type="file" onChange={handleFileInputChange}/>
        </div>
    </div>
}

export default ItemBoard