import axios from 'axios';
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

function MyDropzone({ userProfileID }: any) {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        const file = acceptedFiles[0];

        console.log(file);

        const formData = new FormData();
        formData.append("file", file);

        axios.post(
            `http://localhost:8080/api/v1/user-profile/${userProfileID}/image/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(() => {
            console.log("File uploaded successfully");
        }).catch(err => {
            console.log(err);
        })
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the image here ...</p> :
                    <p>Drag 'n' drop profile image, or click to select profile image</p>
            }
        </div>
    )
}

export default MyDropzone
