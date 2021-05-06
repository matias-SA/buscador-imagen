import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/sevices/imagen.service';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css'],
})
export class ListarImagenComponent implements OnInit {
  termino: string = '';
  subscription: Subscription;
  listImagenes: any[] = [];
  loading: boolean = false;
  imagenesPorPagina: number = 30;
  paginaActual: number = 1;
  calcularTotalPaginas: number = 0;

  constructor(private imagenSvc: ImagenService) {
    this.subscription = this.imagenSvc
      .getTerminoBusqueda()
      .subscribe((data) => {
        this.paginaActual = 1;
        this.termino = data;
        this.obtenerImagenes();
      });
  }

  ngOnInit(): void {}

  obtenerImagenes() {
    this.loading = true;
    this.imagenSvc
      .getImagenes(this.termino, this.imagenesPorPagina, this.paginaActual)
      .subscribe(
        (data) => {
          if (data.hits.length === 0) {
            this.imagenSvc.setError('No encontramos ninguna foto');
            this.loading = false;
            return;
          }
          this.listImagenes = data.hits;
          this.loading = false;
          this.calcularTotalPaginas = Math.ceil(
            data.totalHits / this.imagenesPorPagina
          );
        },
        (error) => {
          this.imagenSvc.setError('ocurrio un error');
          this.loading = false;
        }
      );
  }
  paginaAnterior() {
    this.paginaActual--;
    this.loading = true;
    this.listImagenes = [];
    this.obtenerImagenes();
  }
  paginaPosterior() {
    this.paginaActual++;
    this.loading = true;
    this.listImagenes = [];
    this.obtenerImagenes();
  }
  paginaAnteriorClass() {
    if (this.paginaActual === 1) {
      return false;
    } else {
      return true;
    }
  }
  paginaPosteriorClass() {
    if (this.paginaActual === this.calcularTotalPaginas) {
      return false;
    } else {
      return true;
    }
  }
}
