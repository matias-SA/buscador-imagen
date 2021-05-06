import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImagenService {
  private $error = new Subject<string>();
  private terminoBusqueda$ = new Subject<string>();
  constructor(private http: HttpClient) {}

  setError(mensaje: string) {
    this.$error.next(mensaje);
  }

  getError(): Observable<string> {
    return this.$error.asObservable();
  }

  setTerminoBusqueda(termino: string) {
    this.terminoBusqueda$.next(termino);
  }
  getTerminoBusqueda(): Observable<string> {
    return this.terminoBusqueda$.asObservable();
  }
  getImagenes(
    termino,
    imagenesPorPagina: number,
    paginaActual: number
  ): Observable<any> {
    const key = '21381626-29738dc60cccfb021d56df052';
    const url =
      'https://pixabay.com/api/?key=' +
      key +
      '&q=' +
      termino +
      '&per_page=' +
      imagenesPorPagina +
      '&page=' +
      paginaActual;
    return this.http.get(url);
  }
}
