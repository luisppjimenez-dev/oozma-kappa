import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  // Comunica al componente de la tienda que debe cerrar la ventana.
  readonly cerrar = output<void>();

  // Estados que Angular utiliza para actualizar automáticamente la pantalla.
  readonly mostrarContrasena = signal(false);
  readonly mensaje = signal('');
  readonly tipoMensaje = signal<'error' | 'info'>('info');

  alternarContrasena(): void {
    this.mostrarContrasena.update(valor => !valor);
  }

  limpiar(correo: HTMLInputElement, contrasena: HTMLInputElement): void {
    correo.value = '';
    contrasena.value = '';
    this.mostrarContrasena.set(false);
    this.mensaje.set('');
    correo.focus();
  }

  ingresar(evento: Event, correo: HTMLInputElement, contrasena: HTMLInputElement): void {
    evento.preventDefault();

    if (!correo.value.trim() || !contrasena.value) {
      this.mostrarMensaje('Completa el correo y la contraseña.', 'error');
      return;
    }

    if (!correo.validity.valid) {
      this.mostrarMensaje('Escribe un correo electrónico válido.', 'error');
      return;
    }

    // Por seguridad, esto NO inicia sesión: todavía no hay servidor de usuarios.
    this.mostrarMensaje(
      'El formulario tiene un formato válido. La autenticación real se agregará después.',
      'info'
    );
  }

  informarRegistro(): void {
    this.mostrarMensaje('El registro de usuarios lo desarrollaremos en la siguiente parte.', 'info');
  }

  informarRecuperacion(): void {
    this.mostrarMensaje('La recuperación de contraseña se implementará más adelante.', 'info');
  }

  private mostrarMensaje(texto: string, tipo: 'error' | 'info'): void {
    this.mensaje.set(texto);
    this.tipoMensaje.set(tipo);
  }
}
