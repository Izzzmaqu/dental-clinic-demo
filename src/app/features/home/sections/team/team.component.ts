/* ============================================================
   TeamComponent — Sección del equipo médico.

   Presenta a los 3 doctores principales de la clínica en cards
   con foto, nombre, especialidad, años de experiencia y una
   breve bio de una línea.

   Diseño de las cards:
   - Foto circular centrada en la parte superior.
   - Badge de especialidad encima de la foto.
   - Nombre y cargo en texto.
   - Íconos de redes profesionales (LinkedIn/Email — placeholder).
   - Efecto hover: la card sube ligeramente + sombra más prominente.

   Las fotos son de Unsplash (modelos, no doctores reales).
   ============================================================ */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AnimateOnScrollDirective } from '../../../../shared/directives/animate-on-scroll.directive';

/* Interfaz que define la forma de cada card de doctor */
interface Doctor {
  id: number;
  /* URL de la imagen del médico (Unsplash placeholder) */
  photo: string;
  /* Texto alternativo accesible para la imagen */
  photoAlt: string;
  /* Nombre completo del médico */
  name: string;
  /* Título y especialidad, ej: "DDS · General Dentistry" */
  role: string;
  /* Años de experiencia para el badge */
  experience: string;
  /* Bio corta de una oración */
  bio: string;
}

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- ======================================================
         Team Section — fondo blanco para alternar con la
         sección de stats (azul) que la precede.
         ====================================================== -->
    <section id="team" class="bg-white py-24 lg:py-32" aria-labelledby="team-heading">
      <div class="section-container">

        <!-- Cabecera de sección -->
        <div class="section-header" appAnimateOnScroll>
          <span class="section-label">The Experts</span>
          <h2 id="team-heading" class="section-title">
            Meet Our Dental Specialists
          </h2>
          <p class="section-subtitle mx-auto max-w-2xl">
            Our team of board-certified dentists brings decades of combined experience
            and a genuine passion for transforming smiles.
          </p>
        </div>

        <!-- ====================================================
             Grid de cards del equipo — 1 columna en mobile,
             3 en desktop. Las cards tienen el mismo ancho para
             un layout simétrico y profesional.
             ==================================================== -->
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          @for (doctor of doctors; track doctor.id) {
            <article
              class="group flex flex-col items-center rounded-3xl border border-ink-200 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-100 hover:shadow-xl hover:shadow-brand-500/10"
              appAnimateOnScroll
              [animationDelay]="(doctor.id - 1) * 150"
            >
              <!-- ============================================
                   Contenedor de la foto — posición relativa
                   para el badge de experiencia que está
                   superpuesto en la esquina inferior.
                   ============================================ -->
              <div class="relative mb-6">
                <!-- Anillo decorativo alrededor de la foto — se
                     vuelve azul en hover para dar retroalimentación -->
                <div
                  class="absolute inset-0 rounded-full border-2 border-transparent transition-colors duration-300 group-hover:border-brand-500 scale-105"
                  aria-hidden="true"
                ></div>
                <!-- Foto circular del doctor -->
                <img
                  [src]="doctor.photo"
                  [alt]="doctor.photoAlt"
                  class="h-28 w-28 rounded-full object-cover object-top shadow-md"
                  loading="lazy"
                  width="112"
                  height="112"
                />
                <!-- Badge de años de experiencia posicionado
                     en la esquina inferior derecha de la foto -->
                <span
                  class="absolute -bottom-2 -right-2 rounded-full bg-brand-500 px-2.5 py-0.5 text-xs font-bold text-white shadow-md"
                  [attr.aria-label]="doctor.experience + ' of experience'"
                >
                  {{ doctor.experience }}
                </span>
              </div>

              <!-- Nombre del doctor -->
              <h3 class="text-lg font-bold text-ink-900">{{ doctor.name }}</h3>

              <!-- Rol y especialidad -->
              <p class="mt-1 text-sm font-medium text-brand-500">{{ doctor.role }}</p>

              <!-- Bio corta -->
              <p class="mt-3 text-sm leading-relaxed text-ink-500">{{ doctor.bio }}</p>

              <!-- Divisor visual -->
              <div class="my-5 h-px w-12 bg-ink-200"></div>

              <!-- Links de contacto profesional — LinkedIn e Email placeholder -->
              <div class="flex items-center gap-3">
                <!-- LinkedIn (placeholder) -->
                <a
                  href="#"
                  class="flex h-8 w-8 items-center justify-center rounded-full bg-ink-200/50 text-ink-500 transition-colors duration-200 hover:bg-brand-500 hover:text-white"
                  [attr.aria-label]="'LinkedIn profile of ' + doctor.name"
                >
                  <svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <!-- Email (placeholder) -->
                <a
                  href="#"
                  class="flex h-8 w-8 items-center justify-center rounded-full bg-ink-200/50 text-ink-500 transition-colors duration-200 hover:bg-brand-500 hover:text-white"
                  [attr.aria-label]="'Send email to ' + doctor.name"
                >
                  <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </a>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class TeamComponent {
  /* Array de doctores ficticios con fotos de Unsplash.
     Las fotos están filtradas por parámetros de calidad y
     tamaño para mantener los tiempos de carga razonables. */
  doctors: Doctor[] = [
    {
      id: 1,
      photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80&auto=format&fit=crop&facepad=3&face=1',
      photoAlt: 'Dr. James Carter, General Dentistry specialist',
      name: 'Dr. James Carter',
      role: 'DDS · General Dentistry',
      experience: '18 yrs',
      bio: 'Committed to preventive care and helping patients maintain healthy smiles for life.',
    },
    {
      id: 2,
      photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80&auto=format&fit=crop&facepad=3',
      photoAlt: 'Dr. Sarah Mitchell, Orthodontics specialist',
      name: 'Dr. Sarah Mitchell',
      role: 'DMD · Orthodontics',
      experience: '12 yrs',
      bio: 'Specialist in smile alignment, combining artistry and precision for beautiful results.',
    },
    {
      id: 3,
      photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&q=80&auto=format&fit=crop&facepad=3',
      photoAlt: 'Dr. Michael Torres, Oral Surgery specialist',
      name: 'Dr. Michael Torres',
      role: 'DDS · Oral Surgery',
      experience: '14 yrs',
      bio: 'Expert in complex extractions and implant placement with a gentle, reassuring approach.',
    },
  ];
}
