# Reporte de desarrollo: OOZMA KAPPA con Angular

**Proyecto:** OOZMA KAPPA — Papelería en línea  
**Tecnologías:** Angular 22, HTML, CSS, TypeScript y JavaScript generado por Angular  
**Sistema operativo:** Ubuntu Linux (Linux x64)  
**Fecha del reporte:** 24 de octubre de 2026  
**Tipo de documento:** Bitácora técnica del proceso de instalación, construcción e integración de componentes

> **Alcance y criterio de verificación:** este reporte se elaboró con los comandos y versiones compartidos durante el trabajo, los archivos de la tienda enviados para revisión y los paquetes de código preparados. Se confirmó la instalación de Angular CLI mediante la salida de la terminal. No se recibió una captura o ejecución final que confirme que todos los archivos se hayan copiado y que la integración del login esté funcionando en la computadora; por ello, ese paso se registra como **preparado / pendiente de comprobar**, no como implementación verificada.

---

## 1. Antecedentes y objetivo

El proyecto partió de una aplicación de escritorio denominada **OOZMA KAPPA**, desarrollada con Java y JavaFX. El archivo original compartido fue `OozmaKappa2(1).zip`, que contiene controladores y modelos en Java, archivos de datos y recursos de la aplicación.

Inicialmente se consideró convertir la aplicación a una página hecha con HTML, CSS y JavaScript. Después se eligió **Angular** para organizar las pantallas y funcionalidades de una forma modular. También cambió la prioridad de desarrollo: en lugar de comenzar por el formulario de acceso, se optó por diseñar primero una **tienda de papelería en línea** inspirada en una página comercial real.

**Objetivo actual:** construir una interfaz web de OOZMA KAPPA con catálogo de productos, navegación por categorías, búsqueda, favoritos y carrito demostrativo; posteriormente conectar la pantalla de inicio de sesión reutilizando elementos del proyecto original.

### Diferencias entre el proyecto inicial y la versión web

| Elemento | Aplicación original | Aplicación web |
|---|---|---|
| Entorno | JavaFX, escritorio | Angular, navegador |
| Estructura visual | FXML y vistas JavaFX | Plantillas HTML |
| Estilos | Estilos de JavaFX | CSS |
| Lógica | Controladores Java | Clases y métodos TypeScript |
| Interacción | Eventos de JavaFX | Eventos Angular como `(click)` |
| Datos | Archivos TXT del proyecto original | Arreglos de muestra en memoria, de momento |
| Autenticación | Parte del sistema original | Interfaz y validación básica; autenticación real pendiente |

> Angular **no elimina HTML ni CSS**: los utiliza para construir vistas. Su lógica de aplicación normalmente se escribe en **TypeScript**, que se transforma a JavaScript para ejecutarse en el navegador.

---

## 2. Preparación del entorno de desarrollo


- **Node.js:** entorno necesario para ejecutar las herramientas de desarrollo de Angular.
- **npm:** gestor de paquetes que instala Angular y otras dependencias.
- **NVM:** administrador de versiones de Node.js.

### 2.1. Instalación mediante NVM

Se propusieron estos comandos para preparar Ubuntu e instalar NVM:

```bash
sudo apt update
sudo apt install curl git -y
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.8/install.sh | bash
source ~/.bashrc
nvm --version
```

Después, para instalar y seleccionar Node.js 24:

```bash
nvm install 24
nvm alias default 24
```

NVM permite administrar distintas versiones de Node.js sin recurrir a una instalación global de Node y npm mediante `sudo apt`.

### 2.2. Versiones verificadas

La terminal mostró los siguientes valores:

```text
Node.js: v24.22.1
npm:     11.19.1
NVM:     0.40.8
```

**Estado:** instalación de Node.js, npm y NVM confirmada por el usuario.

---

## 3. Instalación de Angular CLI

Se indicó instalar la interfaz de línea de comandos de Angular con:

```bash
npm install -g @angular/cli
```

Luego se verificó con:

```bash
ng version
```

La terminal devolvió:

```text
Angular CLI       : 22.2.4
Node.js           : 24.22.1
Package Manager   : npm 11.19.1
Operating System  : linux x64
```

**Estado:** Angular CLI 22.2.4 confirmado.

**¿Para qué sirve Angular CLI?** Permite generar proyectos, crear componentes, compilar el código y ejecutar un servidor local de desarrollo usando el comando `ng`.

Referencia oficial: [Angular CLI — documentación](https://angular.dev/tools/cli).

---

## 4. Creación del proyecto Angular

Se propuso crear el proyecto desde la terminal con:

```bash
ng new oozma-kappa --routing --style=css --ssr=false --defaults
```

### Significado del comando

| Opción | Propósito |
|---|---|
| `ng new` | Genera una aplicación Angular nueva |
| `oozma-kappa` | Asigna el nombre de la carpeta/proyecto |
| `--routing` | Prepara la configuración de rutas para futuras pantallas |
| `--style=css` | Elige CSS para los archivos de estilo |
| `--ssr=false` | Desactiva el renderizado en servidor en la configuración inicial |
| `--defaults` | Usa los valores predeterminados del generador |

Una vez creado, se indicó acceder a la carpeta, abrir VS Code y ejecutar la aplicación:

```bash
cd ~/oozma-kappa
code .
ng serve --open
```

El servidor de desarrollo suele mostrar la aplicación en **http://localhost:4200/**. Los cambios en los archivos se reflejan mientras `ng serve` permanece en ejecución.

**Estado:** instrucciones proporcionadas; no se adjuntó la salida de ejecución de `ng serve`.

---

## 5. Cambio de enfoque: de login inicial a tienda en línea

La primera idea fue trasladar directamente el login de JavaFX a una página web. Se preparó una versión inicial en HTML, CSS y JavaScript (`OOZMA_KAPPA_WEB_PARTE_1.zip`) con una pantalla de acceso y video de fondo.

Posteriormente se decidió que **la primera pantalla visible debía ser una tienda virtual**, con apariencia semejante a la de una papelería comercial de referencia.

Este fue la primera implemenracion de con una página principal Angular y fotografías reutilizadas del proyecto Java original.

### Contenido de la página principal

1. **Encabezado superior azul:** identidad OOZMA KAPPA, sucursales y enlaces informativos.
2. **Barra de navegación:** departamentos, destacados, búsqueda, favoritos, Mi cuenta y carrito.
3. **Banners promocionales:** una promoción principal y dos anuncios secundarios.
4. **Categorías:** Papel, Escritura, Escolar, Arte, Oficina y Accesorios.
5. **Catálogo:** diez productos de ejemplo con imágenes, precio, categoría y botón para agregar.
6. **Pie de página:** información general del prototipo.
7. **Diseño responsivo:** reglas CSS con `@media` para diferentes anchos de pantalla.

Los diez productos de muestra son cuadernos, lápices, plumas, colores, resaltadores, carpetas, borradores, sacapuntas, tijeras y pegamento. **Los precios son ilustrativos**, no precios vigentes.

### Archivos de la entrega

```text
oozma-kappa/
├── public/
│   └── productos/
│       ├── cuadernos.jpg
│       ├── lapices.jpg
│       ├── plumas.jpg
│       ├── colores.jpg
│       ├── resaltadores.jpg
│       ├── folders.jpg
│       ├── borradores.jpg
│       ├── sacapuntas.jpg
│       ├── tijeras.jpg
│       └── pegamento.jpg
└── src/
    ├── app/
    │   ├── app.ts
    │   ├── app.html
    │   └── app.css
    └── styles.css
```

**Responsabilidad de cada archivo:**

- `app.html`: elementos HTML, plantillas y enlaces de eventos.
- `app.css`: estilos de la página, estructura con Flexbox/Grid y estilos responsivos.
- `app.ts`: productos, categorías, estado y métodos del componente principal `App`.
- `styles.css`: estilos globales.
- `public/productos/`: imágenes públicas accesibles mediante rutas como `/productos/cuadernos.jpg`.

> En esta etapa **la tienda se implementó dentro del componente principal `App`**. Sus secciones visuales todavía no están separadas en componentes independientes de encabezado, catálogo y carrito.

---

## 6. Funcionalidades de Angular utilizadas en la tienda

### 6.1. Datos de productos con TypeScript

Se definió una interfaz para describir qué información debe contener cada producto:

```typescript
interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  imagen: string;
  etiqueta?: string;
}
```

El símbolo `?` indica que `etiqueta` es opcional. Los productos se encuentran en un arreglo de muestra de `app.ts`.

### 6.2. `signal()` para estados reactivos

Se añadieron estados como estos:

```typescript
readonly busqueda = signal('');
readonly categoriaActiva = signal('Todas');
readonly favoritos = signal<number[]>([]);
readonly carrito = signal(0);
readonly menuAbierto = signal(false);
readonly aviso = signal('');
```

Una *signal* conserva un valor que Angular puede seguir para actualizar la interfaz cuando cambia. Por ejemplo:

```typescript
this.carrito.update(cantidad => cantidad + 1);
```

Esto incrementa el contador del carrito. **No crea todavía un pedido ni guarda información en una base de datos.**

### 6.3. `computed()` para el filtrado

El catálogo utiliza `computed()` para obtener una lista de productos que cumpla con la búsqueda escrita, la categoría elegida y el filtro de favoritos.

```typescript
readonly productosFiltrados = computed(() => {
  const texto = this.busqueda().toLocaleLowerCase('es').trim();
  const categoria = this.categoriaActiva();

  return this.productos.filter(producto => {
    const coincideTexto = (producto.nombre + ' ' + producto.categoria)
      .toLocaleLowerCase('es').includes(texto);
    const coincideCategoria = categoria === 'Todas' || producto.categoria === categoria;
    const coincideFavoritos = !this.soloFavoritos() || this.favoritos().includes(producto.id);

    return coincideTexto && coincideCategoria && coincideFavoritos;
  });
});
```

Así, el listado se recalcula cuando cambia un estado relevante.

### 6.4. Directivas de plantilla y eventos

Ejemplos de Angular aplicados al HTML:

```html
<!-- Ejecutar una función al hacer clic -->
<button (click)="elegirCategoria('Papel')">Papel</button>

<!-- Mostrar contenido bajo una condición -->
@if (menuAbierto()) {
  <div class="desplegable">Menú de departamentos</div>
}

<!-- Repetir elementos de una colección -->
@for (categoria of categorias; track categoria.nombre) {
  <button (click)="elegirCategoria(categoria.nombre)">
    {{ categoria.nombre }}
  </button>
}
```

- `(click)`: escucha el evento de clic.
- `@if`: renderiza contenido solo si se cumple una condición.
- `@for`: recorre una colección de datos.
- `{{ ... }}`: muestra valores dinámicos en la plantilla.
- `[src]` y `[class.seleccionada]`: vinculan atributos o clases a datos de Angular.

Referencias: [Plantillas de Angular](https://angular.dev/guide/templates) y [Signals](https://angular.dev/guide/signals).

---

## 7. Personalización de la identidad visual

Se modificó el encabezado para mostrar una imagen en lugar del símbolo de texto `OoK__`.

### Sustitución inicial

Se cambió una representación basada en texto:

```html
<span class="marca-simbolo">OoK<span class="marca-punto">__</span></span>
```

por una imagen con la etiqueta HTML `<img>`:

```html
<img src="/icono/ajolote.png" alt="Logo de OOZMA KAPPA" class="marca-logo" />
```

En los archivos del encabezado que compartiste, la marca también contiene:

```html
<span class="marca-texto">
  <strong>Oozma Kappa</strong>
  <small>PAPELERÍA UACM</small>
</span>
```

### CSS que se observó en tu archivo

```css
.marca-logo {
  width: 70px;
  height: 70px;
  object-fit: cover;
  display: block;
}
```

**Nota técnica:** `object-fit: cover` puede recortar un logotipo si la proporción de la imagen es diferente del contenedor. Si se quiere evitar el recorte, se puede cambiar por `object-fit: contain`.

**Estado:** el código compartido refleja la modificación del encabezado. El archivo físico `ajolote.png` no fue incluido en los dos documentos de código compartidos para la revisión; la ruta presupone que existe en `public/icono/ajolote.png` dentro del proyecto local.

---

## 8. Recuperación del login como componente independiente

Después de diseñar la tienda se decidió **recuperar el login anterior** y abrirlo desde el botón **Mi cuenta**.

Para esto se preparó `OOZMA_KAPPA_LOGIN_ANGULAR.zip`, que contiene:

```text
oozma-kappa/
├── public/
│   └── videos/
│       └── login-background.mp4
└── src/
    └── app/
        └── login/
            ├── login.ts
            ├── login.html
            └── login.css
```

- `login.ts`: estado y lógica del componente.
- `login.html`: formulario con correo electrónico, contraseña y botones.
- `login.css`: estilos exclusivos de esa pantalla.
- `login-background.mp4`: video utilizado en el acceso original.

### 8.1. Componente `Login`

En `login.ts` se definió un componente Angular:

```typescript
import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  readonly cerrar = output<void>();
  readonly mostrarContrasena = signal(false);
  readonly mensaje = signal('');
}
```

`selector: 'app-login'` permite utilizar ese componente como etiqueta HTML dentro de otro componente. La salida `cerrar` notifica al componente padre cuando se debe ocultar el formulario.

### 8.2. Abrir el login desde el icono de usuario

En el `app.html` compartido, el botón **Mi cuenta** utilizaba originalmente:

```html
(click)="informar('Mi cuenta')"
```

Se indicó reemplazar ese evento por:

```html
(click)="mostrarLogin.set(true)"
```

Así, el botón cambia un estado en vez de mostrar únicamente un aviso.

### 8.3. Agregar el componente a `App`

Los cambios propuestos para `app.ts` fueron:

```typescript
import { Login } from './login/login';
```

Añadir `Login` al arreglo de `imports` del decorador `@Component`, **sin quitar los imports existentes**, y agregar a la clase `App`:

```typescript
readonly mostrarLogin = signal(false);
```

### 8.4. Mostrar y cerrar el formulario

Se indicó colocar al final del contenido principal de `app.html`:

```html
@if (mostrarLogin()) {
  <app-login (cerrar)="mostrarLogin.set(false)" />
}
```

**Flujo esperado:**

1. El usuario hace clic en **Mi cuenta**.
2. `mostrarLogin` pasa de `false` a `true`.
3. `@if` crea y muestra el componente `<app-login>` sobre la tienda.
4. Cuando se presiona **Cerrar**, el componente emite el evento `cerrar`.
5. El componente padre cambia `mostrarLogin` a `false` y el formulario desaparece.

Esta solución utiliza un **componente superpuesto**. Aunque el proyecto se creó con soporte para rutas, el login **no está implementado todavía como una ruta `/login`**.

### 8.5. Funciones incluidas en el login preparado

| Función | Comportamiento |
|---|---|
| Video de fondo | Se reproduce en bucle, silenciado |
| Mostrar / ocultar contraseña | Cambia el tipo del campo entre `password` y `text` |
| Limpiar campos | Vacía los campos y restablece el mensaje |
| Validar formulario | Comprueba campos vacíos y formato de correo |
| Cerrar formulario | Regresa visualmente a la tienda |
| Crear usuario | Muestra un aviso informativo; registro pendiente |
| Recuperar contraseña | Muestra un aviso informativo; recuperación pendiente |

**Importante:** el botón **Ingresar** no autentica usuarios reales. La validación del correo y el llenado del formulario no equivalen a verificar credenciales. El componente aún no tiene backend, gestión de sesiones ni base de datos.

**Estado de la integración:** se entregaron archivos e instrucciones de conexión, pero **no hay evidencia de ejecución final del login integrado en el equipo**.

Referencias: [Angular Components](https://angular.dev/guide/components), [Component outputs](https://angular.dev/guide/components/outputs).

---

## 9. Estructura objetivo del proyecto hasta este punto

Al incorporar ambas entregas, se espera contar con una estructura parecida a la siguiente:

```text
oozma-kappa/
├── public/
│   ├── icono/
│   │   └── ajolote.png              # Logotipo del usuario
│   ├── productos/                 # Diez fotografías de ejemplo
│   │   ├── cuadernos.jpg
│   │   ├── lapices.jpg
│   │   └── ...
│   └── videos/
│       └── login-background.mp4
├── src/
│   ├── app/
│   │   ├── login/
│   │   │   ├── login.ts
│   │   │   ├── login.html
│   │   │   └── login.css
│   │   ├── app.ts
│   │   ├── app.html
│   │   ├── app.css
│   │   ├── app.config.ts          # Generado por Angular
│   │   └── app.routes.ts          # Generado al habilitar routing
│   ├── styles.css
│   └── index.html
├── angular.json
├── package.json
└── ...
```

Los archivos de configuración se generan con `ng new`; no deben sobrescribirse con archivos antiguos sin revisar.

---

## 10. Pruebas y estado del avance

| Actividad | Estado según la evidencia disponible |
|---|---|
| Verificar Node.js v24.22.1 y npm 11.19.1 | **Confirmado** por salida de terminal |
| Verificar NVM 0.40.8 | **Confirmado** por salida de terminal |
| Verificar Angular CLI 22.2.4 | **Confirmado** por salida de terminal |
| Preparar comando y estructura inicial de Angular | **Instrucciones entregadas** |
| Diseñar vista de tienda virtual | **Código preparado y entregado** |
| Personalizar encabezado con ajolote y nombre | **Cambio visible en código compartido** |
| Implementar catálogo, filtros, favoritos y contador | **Código disponible en entrega de tienda**; ejecución local no verificada |
| Crear componente separado de login | **Archivos preparados y entregados** |
| Conectar botón Mi cuenta al componente Login | **Instrucciones entregadas**; integración local no verificada |
| Autenticación contra usuarios reales | **Pendiente** |
| Base de datos y registro de ventas | **Pendiente** |
| Guardado persistente de carrito/favoritos | **Pendiente** |

### Comprobaciones recomendadas en Ubuntu

Desde la carpeta del proyecto:

```bash
cd ~/oozma-kappa
ng serve --open
```

En el navegador, comprobar:

- [ ] La página principal aparece sin errores de compilación.
- [ ] El logotipo del ajolote se carga sin errores 404.
- [ ] Los banners y las diez imágenes de productos se muestran.
- [ ] La búsqueda y los filtros cambian el catálogo.
- [ ] El botón de favoritos modifica el contador.
- [ ] El botón **Agregar +** incrementa el contador del carrito.
- [ ] El icono **Mi cuenta** abre el login.
- [ ] El video de fondo del login se reproduce.
- [ ] Mostrar/ocultar contraseña funciona.
- [ ] La validación distingue campos vacíos de un formato de correo válido.
- [ ] El botón de cierre regresa a la tienda.
- [ ] La vista se adapta a pantallas pequeñas.

---

## 11. Conceptos técnicos aprendidos

| Concepto | Aplicación dentro del proyecto |
|---|---|
| CLI | Instalar, crear y ejecutar proyectos mediante comandos |
| Componentes | Separar la tienda (`App`) y el acceso (`Login`) |
| HTML | Escribir la estructura de páginas, tarjetas y formularios |
| CSS | Establecer colores, tamaños, espaciados y diseños responsivos |
| TypeScript | Definir clases, interfaces, estados y métodos |
| `signal()` | Guardar estados observables por Angular |
| `computed()` | Calcular la lista filtrada de productos |
| `(click)` | Responder a pulsaciones de botones |
| `@if` y `@for` | Mostrar contenido condicional y listas |
| `output()` | Comunicar eventos desde un componente hijo al padre |
| `public/` | Almacenar archivos públicos de imágenes y video |
| DOM | Estructura HTML que Angular representa y actualiza desde sus plantillas |

---

## 12. Próximas tareas recomendadas

Para continuar con el desarrollo por partes:

1. **Verificar la integración actual** ejecutando `ng serve` y corrigiendo cualquier error de compilación o rutas de archivos.
2. **Extraer el encabezado** a un componente propio (`header`), sin perder el diseño personalizado.
3. **Separar el catálogo** en componentes de lista y tarjeta de producto.
4. **Crear un carrito real de interfaz**, con productos, cantidades y subtotales; dejar el pago para una fase posterior.
5. **Agregar rutas** cuando haya pantallas independientes, por ejemplo productos y cuenta.
6. **Diseñar registro y recuperación de contraseña** como pantallas o componentes independientes.
7. **Incorporar backend y base de datos** antes de afirmar que existe autenticación, persistencia o control real de inventario.
8. **Versionar el proyecto con Git y GitHub**, registrando los cambios de cada etapa.

Como siguiente paso de Angular CLI, para generar nuevos componentes se puede utilizar:

```bash
ng generate component components/header
ng generate component components/catalogo
ng generate component components/carrito
```

Estos comandos son **recomendaciones futuras**: no forman parte de los componentes cuya creación ya haya sido confirmada en el historial.

---

## 13. Conclusión

El trabajo documentado abarca la preparación del entorno en Ubuntu, la instalación confirmada de Angular CLI 22.2.4, la propuesta de creación de `oozma-kappa`, la primera entrega visual de una tienda de papelería basada en HTML/CSS/TypeScript, la personalización del logotipo y la preparación de un componente `Login` reutilizable.

El avance más importante desde el punto de vista arquitectónico fue pasar de una única interfaz de escritorio a una aplicación Angular, con **estado reactivo** para productos y filtros y **comunicación entre componentes** para abrir/cerrar el login. Aun así, el sistema continúa siendo un **prototipo de frontend**: su autenticación, persistencia de datos, inventario y ventas reales requieren desarrollos adicionales.

## 14. Materiales revisados y documentación

**Archivos del trabajo:**

- `OozmaKappa2(1).zip` — proyecto original Java/JavaFX.
- `OOZMA_KAPPA_WEB_PARTE_1.zip` — primer prototipo de login web sin Angular.
- `OOZMA_KAPPA_ANGULAR_INICIO.zip` — entrega de página principal Angular, con imágenes.
- `Markdown pegado.md` — código HTML de la tienda editada que compartiste.
- `Texto pegado (2).txt` — estilos CSS de la tienda editada que compartiste.
- `OOZMA_KAPPA_LOGIN_ANGULAR.zip` — archivos del componente login y video de fondo.

**Documentación técnica oficial para consulta:**

- [Angular CLI](https://angular.dev/tools/cli)
- [Creación de proyectos con Angular](https://angular.dev/installation)
- [Componentes](https://angular.dev/guide/components)
- [Plantillas y eventos](https://angular.dev/guide/templates)
- [Signals](https://angular.dev/guide/signals)
- [Comunicación mediante outputs](https://angular.dev/guide/components/outputs)
- [NVM — repositorio oficial](https://github.com/nvm-sh/nvm)

*Fin del reporte.*
