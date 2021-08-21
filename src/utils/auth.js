export const BASE_URL = 'https://auth.nomoreparties.co'

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({password, email})
    })
    .then((response) => {
        console.log(response)
            return response.json();
      })
      .then((res) => {
          console.log(res)
        return res;
      })
      .catch((err) => console.log(err));
}