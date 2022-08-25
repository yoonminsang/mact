import { pathValidation } from './helper';

describe('pathValidation(현재 경로와 라우터 경로를 검증하는 함수)', () => {
  it('동일한 path', () => {
    expect(pathValidation(['', 'main', 'course'], ['', 'main', 'course'])).toEqual({});
  });
  it('다른 path', () => {
    expect(pathValidation(['', 'main', 'course'], ['main', 'space'])).toBe(false);
  });
  describe('항상 성공하는 경우', () => {
    it('rouePath === /', () => {
      expect(pathValidation(['', 'main', 'course'], [''])).toEqual({});
    });
    it('rouePath === *', () => {
      expect(pathValidation(['', 'main', 'course'], ['*'])).toEqual({});
    });
    it('routePath === /*', () => {
      expect(pathValidation(['', 'main', 'course'], ['', '*'])).toEqual({});
    });
  });
  describe('routePath에 *이 포함되는 경우', () => {
    it('*전에 path가 같은 경우', () => {
      expect(pathValidation(['', 'main', 'course'], ['', 'main', '*'])).toEqual({});
      expect(pathValidation(['', 'main', 'course', 'community'], ['', 'main', '*'])).toEqual({});
    });
    it('*전에 path가 같고 params가 있는 경우', () => {
      expect(pathValidation(['', 'main', 'course'], ['', ':tab', '*'])).toEqual({ tab: 'main' });
    });
    it('*전에 path가 다른 경우', () => {
      expect(pathValidation(['', 'main', 'course'], ['', 'admin', '*'])).toBe(false);
      expect(pathValidation(['', 'main', 'course', 'community'], ['', 'admin', '*'])).toBe(false);
    });
    it('*전에 path가 다르고 params가 있는 경우', () => {
      expect(pathValidation(['', 'main', 'course', 'community'], ['', 'tab', '*'])).toBe(false);
    });
  });
});
