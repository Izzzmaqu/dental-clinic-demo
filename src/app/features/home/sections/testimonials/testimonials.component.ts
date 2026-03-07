/* ============================================================
   TestimonialsComponent — Sección de testimonios de pacientes.

   Muestra 3 reseñas reales-ficticias de pacientes satisfechos
   para construir confianza social (social proof) en los
   visitantes que aún no han tomado la decisión de agendar.

   Cada card de testimonio contiene:
   - 5 estrellas amarillas (rating visual).
   - El texto de la reseña entre comillas.
   - Avatar circular del paciente.
   - Nombre del paciente.
   - Servicio que recibió y fecha.

   El diseño evita comillas tipográficas grandes decorativas
   que se ven artificiales, y en su lugar usa un sutil
   borde izquierdo de color para identificar las cards.
   ============================================================ */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AnimateOnScrollDirective } from '../../../../shared/directives/animate-on-scroll.directive';

/* Interfaz de un testimonio de paciente */
interface Testimonial {
  id: number;
  /* Texto de la reseña */
  quote: string;
  /* Nombre del paciente */
  name: string;
  /* Servicio recibido — da contexto a la reseña */
  service: string;
  /* Fecha de la reseña (ficticias pero verosímiles) */
  date: string;
  /* URL del avatar del paciente (Unsplash) */
  avatar: string;
  /* Alt text accesible para el avatar */
  avatarAlt: string;
  /* Número de estrellas — siempre 5 en esta demo, pero
     tenerlo como dato permite mostrar ratings variables en producción */
  stars: number;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- ======================================================
         Testimonials Section — fondo azul pálido (brand-100)
         para diferenciarla visualmente de la sección Team
         (fondo blanco) que la precede.
         ====================================================== -->
    <section
      id="testimonials"
      class="bg-brand-100 py-24 lg:py-32"
      aria-labelledby="testimonials-heading"
    >
      <div class="section-container">

        <!-- Cabecera -->
        <div class="section-header" appAnimateOnScroll>
          <span class="section-label">Patient Stories</span>
          <h2 id="testimonials-heading" class="section-title">
            What Our Patients Say
          </h2>
          <p class="section-subtitle mx-auto max-w-2xl">
            Don't take our word for it — hear directly from the patients
            whose lives and smiles we've been privileged to transform.
          </p>
        </div>

        <!-- ====================================================
             Grid de testimonios — 1 columna mobile, 3 desktop.
             Cada card se anima con retraso escalonado al entrar
             al viewport.
             ==================================================== -->
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
          @for (testimonial of testimonials; track testimonial.id) {
            <article
              class="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              appAnimateOnScroll
              [animationDelay]="(testimonial.id - 1) * 150"
              [attr.aria-label]="'Testimonial from ' + testimonial.name"
            >
              <!-- ============================================
                   Estrellas de rating — se renderizan de forma
                   dinámica basándose en testimonial.stars.
                   El @for genera las N estrellas rellenas.
                   ============================================ -->
              <div class="mb-4 flex items-center gap-0.5" [attr.aria-label]="testimonial.stars + ' out of 5 stars'">
                <!-- Generamos un array de N elementos con Array.from para usar @for -->
                @for (_ of getStarsArray(testimonial.stars); track $index) {
                  <svg class="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                }
              </div>

              <!-- Texto de la reseña — el flex-1 hace que todas las
                   cards tengan la misma altura en el grid, alineando
                   los footers de cada card verticalmente -->
              <blockquote class="flex-1">
                <p class="text-sm leading-relaxed text-ink-700">
                  "{{ testimonial.quote }}"
                </p>
              </blockquote>

              <!-- Divisor visual -->
              <div class="my-4 h-px bg-ink-200"></div>

              <!-- Pie de la card — avatar + info del paciente -->
              <footer class="flex items-center gap-3">
                <!-- Avatar circular del paciente -->
                <img
                  [src]="testimonial.avatar"
                  [alt]="testimonial.avatarAlt"
                  class="h-10 w-10 rounded-full object-cover object-top"
                  loading="lazy"
                  width="40"
                  height="40"
                />
                <div>
                  <p class="text-sm font-semibold text-ink-900">{{ testimonial.name }}</p>
                  <p class="text-xs text-ink-500">{{ testimonial.service }} · {{ testimonial.date }}</p>
                </div>
              </footer>
            </article>
          }
        </div>

        <!-- ====================================================
             Indicador de Google rating — añade credibilidad
             extra mostrando un rating ficticio de Google Reviews.
             ==================================================== -->
        <div class="mt-12 text-center" appAnimateOnScroll [animationDelay]="200">
          <div class="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 shadow-sm ring-1 ring-ink-200">
            <!-- Logo de Google simplificado en SVG inline -->
            <svg class="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <div class="flex items-center gap-1.5">
              <span class="text-sm font-bold text-ink-900">4.9</span>
              <!-- 5 estrellas pequeñas -->
              @for (_ of [1,2,3,4,5]; track $index) {
                <svg class="h-3.5 w-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              }
            </div>
            <span class="text-sm text-ink-500">Based on 247 Google reviews</span>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class TestimonialsComponent {
  /* Array con los 3 testimonios ficticios de pacientes.
     Los avatares son fotos de personas reales de Unsplash
     (no dentistas), y el texto fue redactado para sonar
     natural y verosímil, no como texto generado. */
  testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "I'd been putting off a root canal for two years out of fear. Dr. Carter made the whole process so easy — I barely felt anything. I genuinely wish I hadn't waited so long.",
      name: 'Amanda J.',
      service: 'Root Canal',
      date: 'Feb 2026',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80&auto=format&fit=crop&facepad=3',
      avatarAlt: 'Amanda J., patient testimonial',
      stars: 5,
    },
    {
      id: 2,
      quote: 'Got my Invisalign done here. Dr. Mitchell was patient with all my questions, the results after 14 months are beyond what I imagined. My confidence has completely changed.',
      name: 'Daniel R.',
      service: 'Orthodontics',
      date: 'Jan 2026',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&auto=format&fit=crop&facepad=3',
      avatarAlt: 'Daniel R., patient testimonial',
      stars: 5,
    },
    {
      id: 3,
      quote: 'Brought my whole family here after my neighbor recommended them. The office is spotlessly clean, the staff remembers your name, and the work is excellent. Best dental experience, period.',
      name: 'Priya S.',
      service: 'Family Care',
      date: 'Dec 2025',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&auto=format&fit=crop&facepad=3',
      avatarAlt: 'Priya S., patient testimonial',
      stars: 5,
    },
  ];

  /* getStarsArray — utilidad para generar un array de N elementos
     que permite usar @for en el template para renderizar N estrellas.

     Parámetros:
     - count: número de estrellas a mostrar.

     Retorna:
     - Array de número de esa longitud (los valores no importan,
       solo la cantidad para iterar con @for). */
  getStarsArray(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i);
  }
}
