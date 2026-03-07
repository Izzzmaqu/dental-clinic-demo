/* ============================================================
   NavbarComponent — Barra de navegación principal de DentaCare.

   Responsabilidades:
   - Mostrar el logo y los links de navegación en desktop.
   - Mostrar un menú hamburguesa en mobile que abre/cierra un
     panel lateral con los mismos links.
   - Cambiar el estilo visual (añadir sombra y fondo blanco
     con blur) cuando el usuario hace scroll hacia abajo,
     usando un HostListener que escucha el evento 'scroll' en
     el objeto window.
   - Cerrar el menú mobile automáticamente al hacer clic en
     algún link interno (anclas hash).

   Técnicas utilizadas:
   - Standalone component (sin NgModule).
   - Signals de Angular 17+ para estado reactivo sin Zone.js issues.
   - HostListener para detectar el scroll del window.
   - NgClass para aplicar clases condicionales al navbar.
   ============================================================ */

import {
  Component,
  signal,
  HostListener,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgClass } from '@angular/common';

/* Interfaz que define la forma de cada elemento del menú de
   navegación. Usar interfaces en lugar de 'any' mejora la
   seguridad de tipos en toda la aplicación. */
interface NavLink {
  /* Texto visible del link en el menú */
  label: string;
  /* Ancla hash que apunta a la sección correspondiente de la landing */
  href: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass],
  /* OnPush reduce el número de ciclos de detección de cambios;
     el componente solo se re-renderiza cuando sus signals cambian */
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- ======================================================
         Navbar principal — position fixed para que siempre
         esté visible aunque el usuario haga scroll hacia abajo.
         z-50 asegura que aparezca sobre todo el contenido.
         ====================================================== -->
    <header
      class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      [ngClass]="{
        'bg-white/95 shadow-md backdrop-blur-sm': scrolled(),
        'bg-transparent': !scrolled()
      }"
      role="banner"
    >
      <div class="section-container">
        <nav
          class="flex h-16 items-center justify-between lg:h-20"
          aria-label="Main navigation"
        >
          <!-- =====================================================
               Logo — texto estilizado con el nombre de la clínica.
               El color cambia según si el navbar está sobre el
               hero oscuro (blanco) o ya tiene fondo blanco (azul).
               ===================================================== -->
          <a
            href="#home"
            class="flex items-center gap-2 transition-opacity duration-200 hover:opacity-80"
            aria-label="DentaCare Clinic — Go to homepage"
          >
            <!-- Ícono SVG de diente inline — sin dependencias externas -->
            <svg
              class="h-8 w-8 shrink-0"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="16" fill="#2563eb" />
              <path
                d="M10 10c1.5-2 3-3 6-3s4.5 1 6 3c1 1.5 1 3 0.5 5.5-0.5 2-1 4-1.5 6-0.3 1.2-1 1.5-1.5 1.5s-1-0.5-1.5-2c-0.3-1-0.5-1.5-2-1.5s-1.7 0.5-2 1.5c-0.5 1.5-1 2-1.5 2s-1.2-0.3-1.5-1.5c-0.5-2-1-4-1.5-6C9 13 9 11.5 10 10z"
                fill="white"
              />
            </svg>
            <span
              class="text-lg font-bold tracking-tight transition-colors duration-300"
              [ngClass]="{
                'text-brand-900': scrolled(),
                'text-white': !scrolled()
              }"
            >
              Denta<span class="text-brand-500">Care</span>
            </span>
          </a>

          <!-- =====================================================
               Links de navegación — visibles solo en desktop (lg+).
               Cada link es un ancla hash que desplaza suavemente
               a la sección correspondiente gracias al
               scroll-behavior: smooth definido en styles.css.
               ===================================================== -->
          <ul class="hidden items-center gap-8 lg:flex" role="list">
            @for (link of navLinks; track link.href) {
              <li>
                <a
                  [href]="link.href"
                  class="text-sm font-medium transition-colors duration-200"
                  [ngClass]="{
                    'text-ink-500 hover:text-brand-500': scrolled(),
                    'text-white/80 hover:text-white': !scrolled()
                  }"
                >
                  {{ link.label }}
                </a>
              </li>
            }
          </ul>

          <!-- =====================================================
               CTA en el navbar — botón "Book Appointment" visible
               solo en desktop. Lleva al usuario a la sección
               de contacto al fondo de la página.
               ===================================================== -->
          <div class="hidden items-center gap-4 lg:flex">
            <a
              href="#contact"
              class="btn-primary"
              [ngClass]="{
                'shadow-brand-500/30': scrolled()
              }"
            >
              Book Appointment
            </a>
          </div>

          <!-- =====================================================
               Botón hamburguesa — visible solo en mobile (< lg).
               Al hacer clic activa/desactiva el menú mobile usando
               el signal mobileMenuOpen().
               ===================================================== -->
          <button
            class="flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200 lg:hidden"
            [ngClass]="{
              'text-ink-900 hover:bg-ink-200/50': scrolled(),
              'text-white hover:bg-white/10': !scrolled()
            }"
            (click)="toggleMobileMenu()"
            [attr.aria-expanded]="mobileMenuOpen()"
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            <!-- Ícono de tres líneas (hamburguesa) o X (cerrar),
                 se intercambia según el estado del menú -->
            @if (!mobileMenuOpen()) {
              <!-- Ícono hamburguesa -->
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            } @else {
              <!-- Ícono X para cerrar -->
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            }
          </button>
        </nav>
      </div>

      <!-- ========================================================
           Menú mobile — panel desplegable que aparece debajo del
           navbar cuando el botón hamburguesa está activo.
           Solo se renderiza cuando mobileMenuOpen() es true
           para evitar ocupar espacio en el DOM cuando está cerrado.
           ======================================================== -->
      @if (mobileMenuOpen()) {
        <div
          id="mobile-menu"
          class="border-t border-ink-200/30 bg-white/98 backdrop-blur-sm lg:hidden"
        >
          <ul class="section-container flex flex-col gap-1 py-4" role="list">
            @for (link of navLinks; track link.href) {
              <li>
                <a
                  [href]="link.href"
                  class="flex items-center rounded-lg px-4 py-3 text-sm font-medium text-ink-900 transition-colors duration-200 hover:bg-brand-100 hover:text-brand-500"
                  (click)="closeMobileMenu()"
                >
                  {{ link.label }}
                </a>
              </li>
            }
            <!-- CTA también disponible en mobile -->
            <li class="mt-2 px-4 pb-2">
              <a
                href="#contact"
                class="btn-primary w-full"
                (click)="closeMobileMenu()"
              >
                Book Appointment
              </a>
            </li>
          </ul>
        </div>
      }
    </header>
  `,
})
export class NavbarComponent {
  /* Signal booleano que controla si el menú mobile está abierto.
     Al ser un signal, Angular detecta el cambio automáticamente
     y actualiza el DOM sin necesidad de disparar detección manualmente. */
  mobileMenuOpen = signal(false);

  /* Signal booleano que controla si el navbar muestra el estilo
     "scrolled" (fondo blanco + sombra) o el estilo transparente.
     Se actualiza en el HostListener del evento scroll. */
  scrolled = signal(false);

  /* Array de objetos NavLink con los destinos de navegación.
     Cada href apunta a la id de la sección correspondiente en
     el HomeComponent para que el scroll suave funcione. */
  navLinks: NavLink[] = [
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Team', href: '#team' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  /* HostListener — Angular registra automáticamente un event listener
     en el objeto window para el evento 'scroll'. Cada vez que el
     usuario hace scroll, este método se ejecuta y actualiza el
     signal scrolled() según si el scroll supera los 20px de la parte
     superior de la página. */
  @HostListener('window:scroll')
  onWindowScroll(): void {
    /* window.scrollY devuelve la posición vertical del scroll en px.
       Si es mayor a 20px, el navbar debe mostrar el fondo blanco. */
    this.scrolled.set(window.scrollY > 20);
  }

  /* Alterna el estado del menú mobile entre abierto y cerrado.
     Usa el valor actual del signal para invertirlo. */
  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  /* Cierra el menú mobile explícitamente.
     Se llama cuando el usuario hace clic en un link del menú
     para que el panel se cierre después de navegar. */
  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
