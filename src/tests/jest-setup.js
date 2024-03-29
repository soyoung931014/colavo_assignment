import { server } from '@src/mocks/server';
import '@testing-library/jest-dom';
//server를 가져와서 모든 테스트가 진행되기 전에 server를 열어준다.
beforeAll(() => server.listen());

//테스트중에 리퀘스트 핸들러들을 다 리셋해 다른 핸들러에 영향이 가지 않도록 해준다.
afterEach(() => server.resetHandlers());

//핸들러가 다 끝나면
afterAll(() => server.close());
