import useApi from '@/composites/useApi.ts';

describe('useApi', () => {

  const unmockedFetch = global.fetch;

  beforeAll(() => {
    global.fetch = () => Promise.resolve({
      json: () => Promise.resolve([])
    })
  })

  afterAll(() => {
    global.fetch = unmockedFetch;
  })

  it('should create correct url from params', () => {
    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockImplementation(() =>
        Promise.resolve({ json: () => Promise.resolve([]) })
      )

    const props = {
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ e: 'f' })
    }
    const api = {
      url: 'http://testing.com',
      params: {
        a: 'b',
        c: 'd'
      },
      ...props
    }
    
    useApi(api);

    expect(fetchMock).toHaveBeenCalledWith(
      'http://testing.com?a=b&c=d', { ...props, method: 'GET' }
    )

    global.fetch.mockClear();
    delete global.fetch;
  })
})
