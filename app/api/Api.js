export default class Api {
  static login (code: string) {
    const params = { code: code }

    return fetch('http://el-debate.herokuapp.com/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    });
  }
}
