import React, { useState } from 'react';

export default function HomePage({onImageAdded, onWebUrlAdded}) {

    const [url, setUrl] = useState('');

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        onImageAdded(droppedFile);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleChanged = (e) => {
        const droppedFile = e.target.files[0];
        onImageAdded(droppedFile);
    }

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };

    const handleUrlSubmit = (e) => {
        e.preventDefault();
        if (url) {
            console.log('Submitted URL:', url)
            onWebUrlAdded(url);
        }
    };

    return (
        <main className='flex-1 p-4 flex flex-col gap-3 text-center sm:gap-4 md:gap-5 justify-center pb-20'>
            <h1 className='font-semibold text-5xl sm:text-6xl md:text-7xl'>KB<span className='text-green-400 bold'>VQA</span></h1>
            <h3 className='font-semibold text-lg md:text-lg'>Ask an image and get answers that go <span className='font-semibold text-green-600'>beyond</span> what's visible. </h3>

            {/* Drag and drop area */}
            <div className="flex items-center justify-center w-full" onDrop={handleDrop} onDragOver={handleDragOver}>
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-2/3 h-64 border-2 border-green-300 border-dashed rounded-lg cursor-pointer bg-gray-100 dark:bg-gray-200 hover:bg-gray-150 dark:border-green-600 dark:hover:border-green-500 dark:hover:bg-gray-300">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-green-600 dark:text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-600 dark:text-gray-500"><span className="font-semibold text-green-600 dark:text-green-500">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-600 dark:text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={handleChanged}/>
                </label>
            </div> 

            {/* URL area */}
            <div className="mt-4 w-full">
                <label htmlFor="website" className="block mb-2 font-semibold text-sm text-gray-700">or paste the image URL here</label>
                <form onSubmit={handleUrlSubmit}>
                    <input 
                        type="url" 
                        id="website" 
                        value={url}
                        onChange={handleUrlChange}
                        className="bg-gray-100 border border-green-300 text-gray-600 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 w-2/3 p-2.5 dark:bg-gray-200 dark:border-green-600 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-green-500 dark:focus:border-green-500" 
                        placeholder="http://images.cocodataset.org/val2017/000000039769.jpg" 
                        required 
                    />
                    <button 
                        type="submit" 
                        className="ml-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Load Image
                    </button>
                </form>
            </div>



        </main>
    )
}
