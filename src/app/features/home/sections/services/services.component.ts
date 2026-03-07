/* ============================================================
   ServicesComponent — Sección de servicios dentales.

   Muestra los 6 servicios principales de DentaCare en un grid
   responsivo de tarjetas. Cada card tiene:
   - Un ícono SVG representativo del servicio.
   - Un título del servicio.
   - Una descripción breve.
   - Un link "Learn more →" que en producción llevaría a una
     página de detalle (en la demo es un ancla placeholder).

   El hover de cada card levanta ligeramente la tarjeta con
   una sombra más pronunciada (transform: translateY) para
   dar retroalimentación visual sin ser excesivo.

   Usa la directiva AnimateOnScrollDirective para que las cards
   aparezcan con un retraso escalonado al hacer scroll.
   ============================================================ */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AnimateOnScrollDirective } from '../../../../shared/directives/animate-on-scroll.directive';

/* Interfaz que describe la forma de cada tarjeta de servicio.
   Usar interfaces tipadas evita errores al construir el array
   y hace el código más legible y mantenible. */
interface Service {
  /* Identificador único para el track del @for */
  id: number;
  /* Ícono SVG como string de path(s) — el template lo renderiza
     dentro de un elemento <svg> predefinido */
  iconPath: string;
  /* Color de fondo del contenedor del ícono — Tailwind class */
  iconBg: string;
  /* Color del trazo/relleno del ícono SVG — Tailwind class */
  iconColor: string;
  /* Nombre del servicio */
  title: string;
  /* Descripción de 1-2 líneas del servicio */
  description: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- ======================================================
         Services Section — fondo blanco limpio para contrastar
         con el hero azul oscuro y crear respiración visual.
         id="services" para la navegación por anclas del navbar.
         ====================================================== -->
    <section id="services" class="bg-white py-24 lg:py-32" aria-labelledby="services-heading">
      <div class="section-container">

        <!-- Cabecera de la sección con animación al entrar al viewport -->
        <div class="section-header" appAnimateOnScroll>
          <span class="section-label">What We Offer</span>
          <h2 id="services-heading" class="section-title">
            Comprehensive Dental Services
          </h2>
          <p class="section-subtitle mx-auto max-w-2xl">
            From preventive care to advanced cosmetic procedures, our experienced team
            delivers exceptional results with the latest dental technology.
          </p>
        </div>

        <!-- ====================================================
             Grid de servicios — 1 columna en mobile, 2 en
             tablet, 3 en desktop para aprovechar el espacio.
             Las cards se animan con retraso escalonado de 150ms.
             ==================================================== -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          @for (service of services; track service.id) {
            <!-- Card individual — hover levanta la tarjeta con
                 transform y sombra más profunda para dar feedback táctil -->
            <article
              class="group rounded-2xl border border-ink-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-100 hover:shadow-lg hover:shadow-brand-500/10"
              appAnimateOnScroll
              [animationDelay]="(service.id - 1) * 100"
            >
              <!-- Contenedor del ícono — fondo de color personalizado
                   por servicio para dar variedad visual -->
              <div
                class="mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                [class]="service.iconBg"
              >
                <!-- SVG del ícono. Cada path viene del objeto de datos,
                     lo que permite ícono único por servicio sin duplicar
                     el markup del elemento svg contenedor. -->
                <svg
                  class="h-6 w-6"
                  [class]="service.iconColor"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  [attr.aria-label]="service.title + ' icon'"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    [attr.d]="service.iconPath"
                  />
                </svg>
              </div>

              <!-- Título del servicio -->
              <h3 class="mb-2 text-base font-semibold text-ink-900">
                {{ service.title }}
              </h3>

              <!-- Descripción breve del servicio -->
              <p class="mb-4 text-sm leading-relaxed text-ink-500">
                {{ service.description }}
              </p>

              <!-- Link "Learn more" — en la demo lleva a #contact.
                   En producción llevaría a la página detalle del servicio. -->
              <a
                href="#contact"
                class="inline-flex items-center gap-1 text-sm font-medium text-brand-500 transition-colors duration-200 hover:text-brand-700"
                [attr.aria-label]="'Learn more about ' + service.title"
              >
                Learn more
                <!-- Flecha que se desplaza a la derecha en hover -->
                <svg
                  class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </a>
            </article>
          }
        </div>

        <!-- ====================================================
             CTA inferior — botón para ver todos los servicios.
             En la demo lleva a #contact. Visible con animación.
             ==================================================== -->
        <div class="mt-12 text-center" appAnimateOnScroll [animationDelay]="200">
          <a href="#contact" class="btn-ghost">
            Schedule a Consultation
          </a>
        </div>
      </div>
    </section>
  `,
})
export class ServicesComponent {
  /* Array de 6 servicios dentales con sus íconos SVG y colores únicos.
     Cada servicio usa un color de fondo/ícono distinto para dar
     variedad visual al grid sin romper la coherencia de la paleta. */
  services: Service[] = [
    {
      id: 1,
      title: 'Teeth Cleaning',
      description:
        'Professional cleaning and polishing to remove plaque, tartar, and surface stains. Recommended every 6 months for optimal oral health.',
      iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      id: 2,
      title: 'Teeth Whitening',
      description:
        'Advanced whitening treatments to brighten your smile by several shades. Safe, fast, and long-lasting results in just one session.',
      iconPath: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
      iconBg: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
    },
    {
      id: 3,
      title: 'Orthodontics',
      description:
        'Traditional braces and clear aligner systems (Invisalign compatible) to correct misalignment and create a perfectly straight smile.',
      iconPath: 'M4 6h16M4 10h16M4 14h16M4 18h16',
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      id: 4,
      title: 'Dental Implants',
      description:
        'Permanent tooth replacement solutions that look, feel, and function like natural teeth. Titanium implants with ceramic crowns.',
      iconPath: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      id: 5,
      title: 'Root Canal',
      description:
        'Gentle endodontic treatment to save infected teeth and eliminate pain. Modern techniques ensure a comfortable, stress-free experience.',
      iconPath: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18',
      iconBg: 'bg-red-50',
      iconColor: 'text-red-500',
    },
    {
      id: 6,
      title: 'Cosmetic Dentistry',
      description:
        'Veneers, bonding, and smile design services to transform your appearance and boost your confidence with a stunning, natural-looking smile.',
      iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
      iconBg: 'bg-pink-50',
      iconColor: 'text-pink-600',
    },
  ];
}
