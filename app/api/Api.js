import { BASE_URL } from 'react-native-dotenv'

export default class Api {
  static login (code: string) {
    const params = { code: code }

    return fetch(BASE_URL + '/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    });
  }
}