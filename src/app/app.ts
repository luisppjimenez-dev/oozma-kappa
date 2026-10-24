import { Component, computed, signal } from '@angular/core';
import { Login } from './login/login';

// Los datos son de muestra: todavía no existe una base de datos.
interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  imagen: string;
  etiqueta?: string;
}

@Component({
  selector: 'app-root',
  imports: [Login],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

  readonly categorias = [
    { nombre: 'Papel', icono: 'papel', color: '#0aaf96' },
    { nombre: 'Escritura', icono: 'escritura', color: '#63b62e' },
    { nombre: 'Escolar', icono: 'escolar', color: '#ec4c97' },
    { nombre: 'Arte', icono: 'arte', color: '#9255dc' },
    { nombre: 'Oficina', icono: 'oficina', color: '#1fa6d4' },
    { nombre: 'Accesorios', icono: 'accesorios', color: '#fa9057' },
  ];
  

  readonly productos: Producto[] = [
    {
      id: 1,
      nombre: 'Cuadernos de colores',
      categoria: 'Papel',
      precio: 89,
      imagen: 'cuadernos.jpg',
      etiqueta: 'Destacado',
    },
    {
      id: 2,
      nombre: 'Lápices de grafito',
      categoria: 'Escritura',
      precio: 39,
      imagen: 'lapices.jpg',
    },
    {
      id: 3,
      nombre: 'Plumas de colores',
      categoria: 'Escritura',
      precio: 65,
      imagen: 'plumas.jpg',
    },
    {
      id: 4,
      nombre: 'Juego de colores',
      categoria: 'Arte',
      precio: 129,
      imagen: 'colores.jpg',
      etiqueta: 'Popular',
    },
    {
      id: 5,
      nombre: 'Resaltadores de colores',
      categoria: 'Escolar',
      precio: 75,
      imagen: 'resaltadores.jpg',
    },
    {
      id: 6,
      nombre: 'Carpetas de colores',
      categoria: 'Oficina',
      precio: 55,
      imagen: 'folders.jpg',
    },
    {
      id: 7,
      nombre: 'Borradores escolares',
      categoria: 'Escolar',
      precio: 29,
      imagen: 'borradores.jpg',
    },
    {
      id: 8,
      nombre: 'Sacapuntas de plástico',
      categoria: 'Accesorios',
      precio: 25,
      imagen: 'sacapuntas.jpg',
    },
    {
      id: 9,
      nombre: 'Tijeras escolares',
      categoria: 'Accesorios',
      precio: 49,
      imagen: 'tijeras.jpg',
    },
    {
      id: 10,
      nombre: 'Pegamento blanco',
      categoria: 'Escolar',
      precio: 42,
      imagen: 'pegamento.jpg',
    },
  ];

  // signal() guarda estados; computed() deriva los resultados.
  readonly busqueda = signal('');
  readonly categoriaActiva = signal('Todas');
  readonly soloFavoritos = signal(false);
  readonly favoritos = signal<number[]>([]);
  readonly carrito = signal(0);
  readonly menuAbierto = signal(false);
  readonly aviso = signal('');
  readonly mostrarLogin = signal(false);

  readonly productosFiltrados = computed(() => {
    const texto = this.busqueda().toLocaleLowerCase('es').trim();
    const categoria = this.categoriaActiva();

    return this.productos.filter((producto) => {
      const coincideTexto = (producto.nombre + ' ' + producto.categoria)
        .toLocaleLowerCase('es')
        .includes(texto);
      const coincideCategoria = categoria === 'Todas' || producto.categoria === categoria;
      const coincideFavoritos = !this.soloFavoritos() || this.favoritos().includes(producto.id);
      return coincideTexto && coincideCategoria && coincideFavoritos;
    });
  });

  alternarMenu(): void {
    this.menuAbierto.update((valor) => !valor);
  }

  actualizarBusqueda(evento: Event): void {
    const campo = evento.target as HTMLInputElement;
    this.busqueda.set(campo.value);
    this.aviso.set('');
  }

  elegirCategoria(categoria: string): void {
    this.categoriaActiva.set(categoria);
    this.soloFavoritos.set(false);
    this.menuAbierto.set(false);
    this.aviso.set('');
  }

  mostrarTodo(): void {
    this.categoriaActiva.set('Todas');
    this.busqueda.set('');
    this.soloFavoritos.set(false);
  }

  alternarFavorito(id: number): void {
    this.favoritos.update((actuales) =>
      actuales.includes(id) ? actuales.filter((actual) => actual !== id) : [...actuales, id],
    );
  }

  verFavoritos(): void {
    this.soloFavoritos.update((actual) => !actual);
    this.aviso.set('');
  }

  agregarCarrito(nombre: string): void {
    this.carrito.update((cantidad) => cantidad + 1);
    this.aviso.set(
      `Agregaste «${nombre}» al carrito. El proceso de compra se desarrollará después.`,
    );
  }

  verCarrito(): void {
    this.aviso.set(
      `Tu carrito contiene ${this.carrito()} artículo(s). Próximamente agregaremos el detalle y el pago.`,
    );
  }

  informar(seccion: string): void {
    this.aviso.set(`La sección «${seccion}» se construirá en una próxima parte.`);
  }
}
