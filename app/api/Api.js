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

  static getDebate (auth_token: string) {
    return fetch(BASE_URL + '/api/debate', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth_token
      }
    });
  }

  static vote (auth_token: string, answer_id: integer) {
    const params = { id: answer_id }

    return fetch(BASE_URL + '/api/vote', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth_token
      },
      body: JSON.stringify(params)
    });
  }

  static getComments (auth_token: string) {
    return fetch(BASE_URL + '/api/comments', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth_token
      }
    });
  }
}
