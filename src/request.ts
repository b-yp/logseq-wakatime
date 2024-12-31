
const request = async (url: string, { method = 'GET', headers = {}, params = {}, body = {} } = {}) => {
  if (!logseq.settings?.apiKey && !logseq.settings?.url) return
  const apiKey = btoa(logseq.settings?.apiKey);
  const baseUrl = logseq.settings?.url.endsWith('/') ? logseq.settings?.url : `${logseq.settings?.url}/`

  const defaultHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${apiKey}`,
  };

  const queryString = new URLSearchParams(params).toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  const config = {
    method,
    headers: { ...defaultHeaders, ...headers },
    body: body ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(`${baseUrl}${fullUrl}`, config);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Request failed', error);
    throw error;
  }
}

const get = (url: string, params = {}) => request(url, { method: 'GET', params });

const post = (url: string, body = {}) => request(url, { method: 'POST', body });

const put = (url: string, body = {}) => request(url, { method: 'PUT', body });

const del = (url: string, params = {}) => request(url, { method: 'DELETE', params });

export default {
  get,
  post,
  put,
  del,
}
