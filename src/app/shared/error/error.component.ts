import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/sevices/imagen.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit, OnDestroy {
  texto = '';
  mostrar: boolean = false;
  suscription: Subscription;

  constructor(private imagenSvc: ImagenService) {
    this.suscription = this.imagenSvc.getError().subscribe((data) => {
      this.mostrarMensaje();
      this.texto = data;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.suscription.unsubscribe;
  }

  mostrarMensaje() {
    this.mostrar = true;
    setTimeout(() => {
      this.mostrar = false;
    }, 3000);
  }
}
