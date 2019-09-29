import { HttpClient } from '@angular/common/http';

export function initApp(http: HttpClient) {
  return () => {
    return http.get('species')
      .toPromise()
      .then((resp) => {
        console.log('Response 1 - ', resp);
      });
  };
}
