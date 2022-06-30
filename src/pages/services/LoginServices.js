export default class LoginServices{

    baseUrl = 'http://127.0.0.1:5000';


    async signIn(email, password) {
        console.log('props data ', email, password);
        return fetch(this.baseUrl + '/api/v1/adminRoute/signInUser', {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            email: email,
            password: password,
          },
        });
      }
    

}