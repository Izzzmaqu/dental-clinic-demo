# DentalClinicDemo

**DentalClinicDemo** es una landing page moderna y responsive para una clínica dental llamada **DentaCare**. Fue desarrollada con Angular como proyecto de demostración (portfolio/demo) que muestra buenas prácticas para crear aplicaciones web de alto rendimiento y accesibles.

## ¿Qué hace este proyecto?

Este sitio web de una sola página (SPA) está diseñado para atraer y convertir pacientes de odontología. Incluye las siguientes secciones:

- **Hero** — Primera impresión con título principal, llamadas a la acción y efectos de entrada animados.
- **Servicios** — Muestra 6 servicios dentales en una cuadrícula con tarjetas animadas.
- **Nosotros** — Historia de la empresa, credenciales y valores.
- **Estadísticas** — Números clave (pacientes atendidos, años de experiencia, satisfacción).
- **Equipo** — Tarjetas de los profesionales con foto, nombre y especialidad.
- **Testimonios** — Reseñas de pacientes con calificaciones.
- **Galería** — Fotos del antes/después, interior de la clínica y equipamiento.
- **Contacto** — Información de contacto, CTA de WhatsApp, horarios y ubicación.

### Componentes compartidos

- **Navbar fija** con navegación suave entre secciones y menú hamburguesa para móvil.
- **Footer** con enlaces y datos de la empresa.
- **Botón flotante de WhatsApp** siempre visible para contacto rápido.
- **Directiva AnimateOnScroll** que anima los elementos al hacer scroll usando `IntersectionObserver`.

### Tecnologías utilizadas

| Categoría | Tecnología |
|-----------|-----------|
| Framework | Angular 21 (componentes standalone) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS 4 |
| Pruebas | Vitest |
| Despliegue | Vercel |

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
