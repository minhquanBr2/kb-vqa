import http from "./http-common";

const askQuestionFromFile = async (question, image) => {
   
    console.log('vqa', question);
    const formData = new FormData();
    formData.append('question', question);
    formData.append('image', image);
    
    return http.post(`/vqa/file`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        timeout: 120000,
    });
}

const askQuestionFromUrl = async (question, url) => {
    console.log('vqa', question);
    try {
        const response = http.post(`/vqa/url`, {
            question,
            url,
        }, {
            timeout: 120000,
        });
        return response;
    } catch (error) {
        console.error('Error asking question from URL:', error);
        return null;
    }
}


export { askQuestionFromFile, askQuestionFromUrl };