/* ============================================================
   HomeComponent — Componente orquestador de la landing page.

   Este componente no tiene lógica propia. Su única responsabilidad
   es importar y renderizar todas las secciones de la landing en
   el orden correcto.

   El patrón de tener un componente "orquestador" separado de las
   secciones individuales tiene varias ventajas:
   1. Cada sección puede desarrollarse, probarse y modificarse
      de forma completamente independiente.
   2. Agregar, quitar o reordenar secciones es trivial — solo
      se modifica este archivo.
   3. El componente raíz App se mantiene limpio (solo shell).
   4. Si en el futuro se agrega routing, este componente se
      usa directamente como el componente de la ruta '/'.

   Orden de secciones (de arriba a abajo en la página):
   1. Hero            — primera impresión y CTAs principales.
   2. Services        — qué ofrece la clínica.
   3. About           — quiénes son y por qué confiar en ellos.
   4. Stats           — números que refuerzan la credibilidad.
   5. Team            — los profesionales detrás de la clínica.
   6. Testimonials    — prueba social de pacientes reales.
   7. Gallery         — evidencia visual del espacio y resultados.
   8. Contact         — CTA final de conversión.
   ============================================================ */

import { Component, ChangeDetectionStrategy } from '@angular/core';

/* Importamos cada sección como standalone component.
   Al ser standalone, no necesitan un NgModule intermediario;
   se importan directamente en el array imports de este componente. */
import { HeroComponent } from './sections/hero/hero.component';
import { ServicesComponent } from './sections/services/services.component';
import { AboutComponent } from './sections/about/about.component';
import { StatsComponent } from './sections/stats/stats.component';
import { TeamComponent } from './sections/team/team.component';
import { TestimonialsComponent } from './sections/testimonials/testimonials.component';
import { GalleryComponent } from './sections/gallery/gallery.component';
import { ContactComponent } from './sections/contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  /* Todos los componentes de sección se declaran aquí para que
     Angular pueda resolver sus selectores en el template */
  imports: [
    HeroComponent,
    ServicesComponent,
    AboutComponent,
    StatsComponent,
    TeamComponent,
    TestimonialsComponent,
    GalleryComponent,
    ContactComponent,
  ],
  /* OnPush es seguro aquí porque HomeComponent no tiene inputs
     ni estado propio — solo renderiza sus hijos */
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- ======================================================
         main — elemento semántico HTML5 que envuelve el
         contenido principal de la página. Accesible para
         lectores de pantalla y mejora el SEO semántico.
         ====================================================== -->
    <main id="main-content">
      <!-- Cada sección es un componente Angular standalone.
           El orden aquí determina el orden visual en la página. -->
      <app-hero />
      <app-services />
      <app-about />
      <app-stats />
      <app-team />
      <app-testimonials />
      <app-gallery />
      <app-contact />
    </main>
  `,
})
export class HomeComponent {}
