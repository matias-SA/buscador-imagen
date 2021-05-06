import { Component, OnInit } from '@angular/core';
import { ImagenService } from 'src/app/sevices/imagen.service';

@Component({
  selector: 'app-buscar-imagen',
  templateUrl: './buscar-imagen.component.html',
  styleUrls: ['./buscar-imagen.component.css'],
})
export class BuscarImagenComponent implements OnInit {
  nombreImagen: string = '';
  constructor(private imagenSvc: ImagenService) {}

  ngOnInit(): void {}
  buscarImagen() {
    if (this.nombreImagen === '') {
      this.imagenSvc.setError('Agrega un texto de busqueda');
      return;
    }
    this.imagenSvc.setTerminoBusqueda(this.nombreImagen);
  }
}
