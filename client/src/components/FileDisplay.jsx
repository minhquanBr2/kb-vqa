import React, { useState, useEffect } from 'react';
import { askQuestionFromFile, askQuestionFromUrl } from '../services/ask-service';
import { Grid } from 'react-loader-spinner';

function FileDisplay({file, webUrl, onImageChangeRequest}) {

    const [fileURL, setFileURL] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (file) {
            const objectURL = URL.createObjectURL(file);
            setFileURL(objectURL);
            console.log("File URL:", objectURL)
            return () => URL.revokeObjectURL(objectURL);
        }
        else if (webUrl) {
            setFileURL(webUrl);
        }
    }, [file]);

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('Sample answer');

    const handleQuestionChange = (e) => setQuestion(e.target.value);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log('Question:', question);
        setIsLoading(true);
        try {
            let response;
            if (file) {
                console.log('File:', file)
                response = await askQuestionFromFile(question, file);
            }
            else if (webUrl) {
                console.log('Web URL:', webUrl)
                response = await askQuestionFromUrl(question, webUrl);
            }            
            console.log('Response:', response.data);
            setIsLoading(false);
            if (response.status === 504) {                
                setAnswer('The request timed out. Please try again.');
            }            
            else {
                setAnswer(response.data['response'][0]);
            }
        } catch (error) {
            console.error('Error uploading the file:', error);
            setIsLoading(false);
            if (error.response && error.response.status === 504) {
                setAnswer('The request timed out. Please try again.');
            }
        }
    };

    return (
        <div className="file-display flex">
            <div className="image-container flex flex-col flex-1 items-center justify-center">
            {fileURL && (
                    <img 
                        src={fileURL} 
                        alt="Uploaded" 
                        className="max-w-full max-h-96 rounded-lg"
                    />
                )}
                <button 
                    className="inline-flex justify-center w-full mt-4 py-2 px-4 border border-blue-700 shadow-sm text-sm font-medium rounded-md text-blue-700 bg-white-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white-500"
                    onClick={onImageChangeRequest}
                >
                    Change image
                </button>
            </div>
            <div className="qa-container flex-1 p-4 flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Question & Answer</h2>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">Question:</label>
                        <input 
                            type="text" 
                            id="question" 
                            value={question} 
                            onChange={handleQuestionChange} 
                            className="bg-gray-100 border border-green-300 text-gray-600 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 w-full p-2.5 dark:bg-gray-200 dark:border-green-600 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Which tennis tournament is this?" required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">Answer:</label>
                        {isLoading ? (
                            <Grid
                            visible={true}
                            height="40"
                            width="40"
                            color="#5fc95d"
                            ariaLabel="grid-loading"
                            radius="12.5"
                            wrapperStyle={{}}
                            wrapperClass="grid-wrapper"
                            /> 
                        ) : (
                            <p id="answer" className="mt-1 block w-full font-semibold text-green-600">{answer}</p>
                        )}
                    </div>
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${isLoading ? 'bg-gray-300 text-gray-500' : 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'}`}
                        >
                        Submit
                    </button>                   
                </form>
            </div>
        </div>
    );
}

export default FileDisplay;
