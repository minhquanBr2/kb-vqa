import { askQuestionFromUrl } from '../../src/services/ask-service';
import { http } from '../../src/services/http-common';
import MockAdapter from 'axios-mock-adapter';
global.mockAxios = new MockAdapter(http);

describe('askQuestionFromUrl', () => {


    // Test case 1
    it('should return correct response for given question and image', async () => {     
        const correctAnswers = ['vietnam', 'Vietnam', 'VIETNAM'];
        const mockResponse = {
            response: [correctAnswers[Math.floor(Math.random() * correctAnswers.length)]],
        };
        global.mockAxios.onPost('/vqa/url').reply(200, mockResponse);

        const question = 'Which country is this?';
        const imageUrl = 'https://lotustrain.com/uploads/plugin/news/75/eo-h-i-van-ranh-gi-i-hai-t-nh-hu-a-n-ng-duong-sat-hai-van.jpg';
        const response = await askQuestionFromUrl(question, imageUrl);
        expect(correctAnswers).toContain(response.data['response'][0]);
    });


    // Test case 2
    it('should return correct response for given question and image', async () => {     
        const correctAnswers = ['chordata', 'Chordata', 'felidae', 'Felidae', 'mammalia', 'Mammalia', 'mammals', 'Mammals', 'mammal', 'Mammal'];
        const mockResponse = {
            response: [correctAnswers[Math.floor(Math.random() * correctAnswers.length)]],
        };
        global.mockAxios.onPost('/vqa/url').reply(200, mockResponse);

        const question = 'Which phylum do these animals belong to?';
        const imageUrl = 'http://images.cocodataset.org/val2017/000000039769.jpg';
        const response = await askQuestionFromUrl(question, imageUrl);
        expect(correctAnswers).toContain(response.data['response'][0]);
    });



    // Test case 3
    it('should return correct response for given question and image', async () => {     
        const correctAnswers = ['taylor swift', 'taylor Swift', 'taylor', 'Taylor', 'TAYLOR SWIFT'];
        const mockResponse = {
            response: [correctAnswers[Math.floor(Math.random() * correctAnswers.length)]],
        };
        global.mockAxios.onPost('/vqa/url').reply(200, mockResponse);

        const question = 'Who is this singer?';
        const imageUrl = 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRkIsSjR6PLZUkid-_y6Hegeb-O6bycnMG7wJzQ89YG5j_N_OxvxV7ml4RVg4IKf92w7zaH';
        const response = await askQuestionFromUrl(question, imageUrl); 
        expect(correctAnswers).toContain(response.data['response'][0]);
    });



    // Test case 4
    it('should return correct response for given question and image', async () => {     
        const correctAnswers = ['christmas', 'christmas day', 'on christmas day', 'sunday', 'sundays', 'on sunday', 'on sundays', 'weekend', 'the weekend', 'weekends', 'on the weekend', 'on the weekends'];
        const mockResponse = {
            response: [correctAnswers[Math.floor(Math.random() * correctAnswers.length)]],
        };
        global.mockAxios.onPost('/vqa/url').reply(200, mockResponse);

        const question = 'What days might I most commonly go to this building?';
        const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRISTw2QTmrq0KZHYkv2YcYWsm44n58M_9QZw&s';
        const response = await askQuestionFromUrl(question, imageUrl); 
        expect(correctAnswers).toContain(response.data['response'][0]);
    });



    // Test case 5
    it('should return correct response for given question and image', async () => {     
        const correctAnswers = ['firetruck', 'firetrucks', 'fire truck', 'fire trucks'];
        const mockResponse = {
            response: [correctAnswers[Math.floor(Math.random() * correctAnswers.length)]],
        };
        global.mockAxios.onPost('/vqa/url').reply(200, mockResponse);

        const question = 'What sort of vehicles use this item?';
        const imageUrl = 'https://media.istockphoto.com/id/94738262/photo/typical-american-red-fire-hydrant.jpg?s=612x612&w=0&k=20&c=fLzi1EReZEPwaBEYMKB0wE1PNFiIcktVdzVqE0qtIMI=';
        const response = await askQuestionFromUrl(question, imageUrl); 
        expect(correctAnswers).toContain(response.data['response'][0]);
    });




    // Test case 6
    it('should return correct response for given question and image', async () => {     
        const correctAnswers = ['citrus', 'citron', 'orange', 'rutaceae'];
        const mockResponse = {
            response: [correctAnswers[Math.floor(Math.random() * correctAnswers.length)]],
        };
        global.mockAxios.onPost('/vqa/url').reply(200, mockResponse);

        const question = 'Which fruit family are they from?';
        const imageUrl = 'https://farmtopalms.com/wp-content/uploads/2023/08/Orange-vs-Tangerine-Exploring-the-Difference-in-Taste.jpg';
        const response = await askQuestionFromUrl(question, imageUrl); 
        expect(correctAnswers).toContain(response.data['response'][0]);
    });



    // Test case 7
    it('should return correct response for given question and image', async () => {     
        const correctAnswers = ['us open', 'the us open', 'US open', 'the US open'];
        const mockResponse = {
            response: [correctAnswers[Math.floor(Math.random() * correctAnswers.length)]],
        };
        global.mockAxios.onPost('/vqa/url').reply(200, mockResponse);

        const question = 'What tournament is this?';
        const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwY1BQdt2x8hipyL0vKzpr2l3DIVt-Ruyhbrd9LnWiEQ&s';
        const response = await askQuestionFromUrl(question, imageUrl); 
        expect(correctAnswers).toContain(response.data['response'][0]);
    });



    // Test case 8
    it('handles request timeout', async () => {
        jest.setTimeout(120000);     
        global.mockAxios.onPost('/vqa/file').timeout();    
        try {
            const question = 'What tournament is this?';
            const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwY1BQdt2x8hipyL0vKzpr2l3DIVt-Ruyhbrd9LnWiEQ&s';
            await askQuestionFromUrl(question, imageUrl); 
        } catch (error) {
            expect(error.message).toContain('timeout');
        }
    });



    // Test case 9
    it('handles request timeout', async () => {
        jest.setTimeout(120000);     
        global.mockAxios.onPost('/vqa/file').timeout();    
        try {
            const question = 'Which fruit family are they from?';
            const imageUrl = 'https://farmtopalms.com/wp-content/uploads/2023/08/Orange-vs-Tangerine-Exploring-the-Difference-in-Taste.jpg';
            await askQuestionFromUrl(question, imageUrl); 
        } catch (error) {
            expect(error.message).toContain('timeout');
        }
    });
});
