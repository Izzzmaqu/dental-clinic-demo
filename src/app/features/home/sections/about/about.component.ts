/* ============================================================
   AboutComponent — Sección "Sobre Nosotros" / About Us.

   Comunica la historia, valores y credenciales de la clínica.
   Estructura visual de dos columnas en desktop:
   - Izquierda: imagen del equipo/clínica con badge flotante
     de años de experiencia.
   - Derecha: título, párrafo introductorio, lista de valores
     con íconos check, y un botón CTA secundario.

   El diseño de dos columnas rompe la monotonía de las secciones
   de texto puro y añade interés visual sin sobrecargar.
   ============================================================ */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AnimateOnScrollDirective } from '../../../../shared/directives/animate-on-scroll.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- ======================================================
         About Section — fondo ligeramente azulado (surface)
         para crear contraste alternado con la sección de
         servicios (fondo blanco).
         ====================================================== -->
    <section id="about" class="bg-surface py-24 lg:py-32" aria-labelledby="about-heading">
      <div class="section-container">
        <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

          <!-- ==================================================
               Columna izquierda — imagen con badge flotante.
               La imagen usa aspect-ratio fijo para mantener
               proporciones en todos los breakpoints.
               ================================================== -->
          <div class="relative" appAnimateOnScroll>
            <!-- Imagen principal del equipo/clínica -->
            <div class="overflow-hidden rounded-3xl shadow-xl shadow-ink-900/10">
              <img
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=700&q=80&auto=format&fit=crop"
                alt="DentaCare clinic team of dental professionals"
                class="aspect-4/3 w-full object-cover"
                loading="lazy"
                width="700"
                height="525"
              />
            </div>

            <!-- Badge flotante — "Est. 2009" con íconos decorativos.
                 Posicionado en la esquina inferior derecha de la imagen
                 para máximo impacto visual sin ocultar contenido. -->
            <div
              class="absolute -bottom-6 -right-6 rounded-2xl bg-brand-900 px-6 py-5 shadow-xl shadow-brand-900/30"
              aria-label="DentaCare established in 2009"
            >
              <p class="text-sm font-medium text-white/60">Established</p>
              <p class="text-3xl font-bold text-white">2009</p>
              <p class="text-sm font-medium text-brand-500">Over 15 years of care</p>
            </div>

            <!-- Decoración visual — línea punteada de fondo para
                 dar profundidad al layout sin añadir peso visual -->
            <div
              class="absolute -left-4 -top-4 -z-10 h-full w-full rounded-3xl border-2 border-dashed border-brand-200"
              aria-hidden="true"
            ></div>
          </div>

          <!-- ==================================================
               Columna derecha — texto de contenido.
               Los elementos se animan con retraso escalonado.
               ================================================== -->
          <div>
            <!-- Cabecera de sección — etiqueta + título -->
            <div appAnimateOnScroll>
              <span class="section-label">Who We Are</span>
              <h2 id="about-heading" class="section-title">
                Committed to Your Best Smile
              </h2>
            </div>

            <!-- Párrafo introductorio -->
            <p
              class="mt-6 text-base leading-relaxed text-ink-500"
              appAnimateOnScroll
              [animationDelay]="100"
            >
              Founded in 2009, DentaCare Clinic has grown from a small neighborhood practice
              to a full-service dental center trusted by thousands of families across the city.
              Our team of certified specialists combines clinical excellence with genuine compassion
              for every patient who walks through our doors.
            </p>

            <!-- Lista de valores / puntos diferenciadores con íconos check -->
            <ul
              class="mt-8 space-y-4"
              role="list"
              appAnimateOnScroll
              [animationDelay]="200"
            >
              @for (feature of features; track feature.title) {
                <li class="flex items-start gap-4">
                  <!-- Ícono check en círculo azul -->
                  <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100">
                    <svg
                      class="h-5 w-5 text-brand-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <!-- Texto del feature — título en bold + descripción -->
                  <div>
                    <p class="font-semibold text-ink-900">{{ feature.title }}</p>
                    <p class="mt-0.5 text-sm text-ink-500">{{ feature.description }}</p>
                  </div>
                </li>
              }
            </ul>

            <!-- CTA de esta sección -->
            <div
              class="mt-10"
              appAnimateOnScroll
              [animationDelay]="300"
            >
              <a href="#contact" class="btn-primary">
                Meet Our Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent {
  /* Lista de características/valores diferenciadores de la clínica.
     Cada item tiene un título corto y una descripción de soporte.
     Se muestran en la columna de texto como lista con íconos check. */
  features = [
    {
      title: 'State-of-the-Art Technology',
      description:
        'Digital X-rays, 3D imaging, and laser dentistry for precise, comfortable procedures.',
    },
    {
      title: 'Board-Certified Specialists',
      description:
        'All our dentists hold advanced certifications and participate in continuous education.',
    },
    {
      title: 'Patient-First Approach',
      description:
        'We listen, explain, and customize every treatment plan to your unique needs and goals.',
    },
    {
      title: 'Flexible Scheduling',
      description:
        'Early morning, evening, and weekend appointments available for your convenience.',
    },
  ];
}
