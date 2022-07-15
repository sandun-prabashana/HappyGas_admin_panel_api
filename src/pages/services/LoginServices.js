export default class LoginServices{

    baseUrl = 'https://happygas.herokuapp.com';


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