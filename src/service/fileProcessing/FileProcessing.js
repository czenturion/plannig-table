export const saveToFile = (data, filename) => {
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

export const loadFromFile = (file, setImages) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        const data = JSON.parse(event.target.result);
        setImages(data);
    };
    reader.readAsText(file);
};