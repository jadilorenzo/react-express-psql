import fetch from 'isomorphic-fetch'

export default {
  get: async (part) => {
    const response = await fetch(`http://localhost:3333/api/get/${part}`);
    const body = response.json()
    return body;
  },
  post: async (part, data) => {
    const response = await fetch(`http://localhost:3333/api/post/${part}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ db: data }),
    });
    return response.json()
  }
}
