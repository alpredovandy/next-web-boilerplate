export const MOCK_RESPONSE = {};
export const mockGet = jest.fn(() => Promise.resolve(MOCK_RESPONSE));
export const mockPost = jest.fn(() => Promise.resolve(MOCK_RESPONSE));

const AuthedMockHttpClient = jest.fn().mockImplementation(function (this: any) {
  this.get = mockGet;
  this.post = mockPost;

  return this;
});

export default AuthedMockHttpClient;
