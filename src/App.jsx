import { useState } from "react";

function App() {
    const [image, setImage] = useState({ preview: '', data: '' });
    const [response, setResponse] = useState('');

    // When user selects an image
    function handleImageOnChange(e) {
        e.preventDefault();
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        };
        setImage(img);
    }

    // When user clicks 'Submit' button
    function uploadImage() {
        fetch(
            "https://testmission2-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/4465d1f1-59a5-456c-a800-dea0109adf8e/classify/iterations/Iteration1/image",
            {
                method: "POST",
                headers: { "Prediction-key": "1c4c3c09a4f04000811e3b00348e0c0f", "Content-Type": "application/octet-stream" },
                body: image.data,
            }
        )
            .then((res) => res.json())
            .then((res) => {
                // doesn't work :(
                let resText = '';
                res.predictions.forEach((item) => { resText = resText + `${item.tagName} ${item.probability} ` });
                setResponse(resText);
            });
    }

    return (
        <>
            <h1>Upload image</h1>
            <input id="image" type="file" name="image" accept="image/*" onChange={handleImageOnChange} />
            <button onClick={uploadImage}>Submit</button>
            <p>{response}</p>
            <img src={image.preview} style={{ height: "10em" }} />
        </>
    );
}

export default App;
