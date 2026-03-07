/* ============================================================
   App — Componente raíz (shell) de la aplicación.

   Este componente actúa como el "contenedor" principal que
   envuelve toda la landing page. Su responsabilidad es:
   1. Renderizar el Navbar fijo en la parte superior.
   2. Renderizar el HomeComponent con todas las secciones.
   3. Renderizar el Footer al final de la página.
   4. Renderizar el botón flotante de WhatsApp.

   Nada más. Toda la lógica de cada sección vive en su propio
   componente dentro de features/home/sections/.
   ============================================================ */

import { Component, ChangeDetectionStrategy } from '@angular/core';

/* Componentes shared — navbar, footer y botón de WhatsApp */
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { WhatsappButtonComponent } from './shared/components/whatsapp-button/whatsapp-button.component';

/* HomeComponent — orquestador de todas las secciones de la landing */
import { HomeComponent } from './features/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    WhatsappButtonComponent,
    HomeComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- ======================================================
         Skip to main content — link invisible accesible que
         permite a los usuarios de teclado/lectores de pantalla
         saltar directamente al contenido principal, evitando
         tener que navegar por toda la barra de navegación en
         cada carga de página.
         ====================================================== -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:z-100 focus:left-4 focus:top-4 focus:rounded-lg focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
    >
      Skip to main content
    </a>

    <!-- Navbar fijo en la parte superior — siempre visible -->
    <app-navbar />

    <!-- Todas las secciones de la landing organizadas por HomeComponent -->
    <app-home />

    <!-- Footer al final de la página -->
    <app-footer />

    <!-- Botón flotante de WhatsApp — aparece sobre todo el contenido -->
    <app-whatsapp-button />
  `,
})
export class App {}

