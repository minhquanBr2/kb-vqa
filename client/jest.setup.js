import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import 'vite/jest';

global.mockAxios = new MockAdapter(axios);

afterEach(() => {
  global.mockAxios.reset();
});
