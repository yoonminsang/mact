import { addQuery, changeParam } from '../api.helper';

describe('api.helper', () => {
  describe('addQuery', () => {
    const url = '/post';
    const name = 'minsang';
    it('query가 없는 경우', () => {
      const addQueryUrl = addQuery(url);
      expect(addQueryUrl).toBe(url);
    });
    it('query가 한 개인 경우', () => {
      const addQueryUrl = addQuery(url, { id: 1 });
      expect(addQueryUrl).toBe(`${url}?id=1`);
    });
    it('query가 두 개인 경우', () => {
      const addQueryUrl = addQuery(url, { id: 1, name });
      expect(addQueryUrl).toBe(`${url}?id=1&name=${name}`);
    });

    describe('query value가 존재하지 않는 경우', () => {
      describe('query가 한 개인 경우', () => {
        it('undefined', () => {
          const addQueryUrl = addQuery(url, { id: undefined });
          expect(addQueryUrl).toBe(`${url}`);
        });
        it('null', () => {
          const addQueryUrl = addQuery(url, { id: null });
          expect(addQueryUrl).toBe(`${url}`);
        });
        it('빈 문자열', () => {
          const addQueryUrl = addQuery(url, { id: '' });
          expect(addQueryUrl).toBe(`${url}`);
        });
      });
      describe('query가 두 개인 경우', () => {
        it('undefined', () => {
          const addQueryUrl = addQuery(url, { id: undefined, name });
          expect(addQueryUrl).toBe(`${url}?name=${name}`);
        });
        it('null', () => {
          const addQueryUrl = addQuery(url, { id: null, name });
          expect(addQueryUrl).toBe(`${url}?name=${name}`);
        });
        it('빈 문자열', () => {
          const addQueryUrl = addQuery(url, { id: '', name });
          expect(addQueryUrl).toBe(`${url}?name=${name}`);
        });
      });
    });
  });

  describe('changeParam', () => {
    it('하나 바꾸는 경우', () => {
      const url = '/post/:id';
      const id = 1;
      const changeParamUrl = changeParam(url, { id });
      expect(changeParamUrl).toBe(`/post/${id}`);
    });
    it('두개 바꾸는 경우', () => {
      const url = '/post/:id/:category';
      const id = 1;
      const category = 'cateogry';
      const changeParamUrl = changeParam(url, { id, category });
      expect(changeParamUrl).toBe(`/post/${id}/${category}`);
    });
  });
});
