import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

function CameraPage() {
    const webcamRef = useRef<any>(null);
    const [img, setImg] = useState("")

    const capture = () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setImg(imageSrc)
        }
    }
    return (
        <div>
            {/* <Webcam ref={webcamRef} height={220} width={280}  screenshotFormat="image/jpeg" /> */}
            <button onClick={capture}>Capture photo</button>
            <img src={img} height={220} width={280} />
        </div>
    )
}

export default CameraPage