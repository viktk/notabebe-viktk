import jwtDecode from 'jwt-decode';

export function TOTO () {
  const getToken = localStorage.getItem('MyToken');

  if (getToken) {
    const decode = jwtDecode(getToken);

    return decode;
  }
}
