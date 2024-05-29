import { useState, useEffect } from 'react'
import Header from './components/Header'
import HomePage from './components/HomePage'
import FileDisplay from './components/FileDisplay'

function App() {

    const [file, setFile] = useState(null);
    const [webUrl, setWebUrl] = useState('');

    const handleDrop = (droppedFile) => {
        setFile(droppedFile);
    };  

    const handleChangeImageRequest = () => {
        console.log('Change image request')
        if (file) {
            setFile(null);
        }
        else if (webUrl) {
            setWebUrl('');
        }
    };

    const handleUrlSubmit = (url) => {
        setWebUrl(url);
    }

    return (
        <div className='flex flex-col p-4 max-w-[2000px] max-auto w-full'>
            <section className='min-h-screen flex flex-col'>
                <Header />
                { (file || webUrl) ? (
                    <FileDisplay file={file} webUrl={webUrl} onImageChangeRequest={handleChangeImageRequest} />
                ) : (
                    <HomePage onImageAdded={handleDrop} onWebUrlAdded={handleUrlSubmit}/>
                )}
            </section>      
            <footer></footer>    
        </div>
    )
}

export default App
