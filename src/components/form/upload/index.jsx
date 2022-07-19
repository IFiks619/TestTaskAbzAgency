import React, { useEffect, useState } from "react";

import styles from './Upload.module.scss'

const Upload = ({ setPhoto }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        setPhoto(selectedFile)
    }, [selectedFile])

    const handleFileInput = (e) => {
        //5MB max size
        const maxAllowedSize = 5 * 1024 * 1024;
        if (e.target.files[0].size < maxAllowedSize) {
            setSelectedFile(e.target.files[0])
        }
    }

    return (
        <div className={styles.root}>
            <input
                type='file'
                id='file'
                onChange={handleFileInput}
                accept=".jpg, .jpeg"
                
            />
            <label htmlFor="file">Upload</label>
            <span>{selectedFile ? selectedFile.name : 'Upload your photo'}</span>
        </div>
    )
}

export default Upload