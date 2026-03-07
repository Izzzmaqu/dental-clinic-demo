/* ============================================================
   GalleryComponent — Galería fotográfica de la clínica.

   Muestra 6 imágenes en un grid masonry-like que comunica
   visualmente el ambiente profesional y moderno de la clínica.
   Las fotos son de Unsplash y representan:
   - Instalaciones de la clínica.
   - Equipo dental moderno.
   - Pacientes sonriendo (resultados).
   - El equipo de doctores.

   Comportamiento en hover:
   - Overlay oscuro que aparece gradualmente.
   - Texto descriptivo de la imagen.
   - Ligero zoom de la imagen (scale-110).

   El grid usa un diseño variado donde algunas celdas ocupan
   más espacio (col-span-2 o row-span-2) para romper la
   monotonía de un grid completamente uniforme.
   ============================================================ */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AnimateOnScrollDirective } from '../../../../shared/directives/animate-on-scroll.directive';

/* Interfaz de una imagen de galería */
interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  /* Texto que aparece en el overlay al hacer hover */
  caption: string;
  /* Clases de Tailwind para el tamaño de la celda en el grid */
  gridClass: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- ======================================================
         Gallery Section — fondo de surface para alternar con
         los fondos blancos y azules de las otras secciones.
         ====================================================== -->
    <section id="gallery" class="bg-surface py-24 lg:py-32" aria-labelledby="gallery-heading">
      <div class="section-container">

        <!-- Cabecera -->
        <div class="section-header" appAnimateOnScroll>
          <span class="section-label">Our Space</span>
          <h2 id="gallery-heading" class="section-title">
            A Glimpse Inside DentaCare
          </h2>
          <p class="section-subtitle mx-auto max-w-2xl">
            Modern facilities, advanced equipment, and a welcoming atmosphere
            designed to make every visit comfortable and stress-free.
          </p>
        </div>

        <!-- ====================================================
             Grid de imágenes — usa grid-cols-3 con rows de
             altura fija. Algunas imágenes tienen col-span o
             row-span para crear el layout variado.
             En mobile colapsa a 2 columnas uniformes.
             ==================================================== -->
        <div
          class="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6"
          style="grid-auto-rows: 200px;"
          appAnimateOnScroll
        >
          @for (image of images; track image.id) {
            <!-- Celda del grid — la clase gridClass controla si
                 la imagen ocupa 1 o 2 filas/columnas -->
            <div
              class="group relative overflow-hidden rounded-2xl bg-ink-200"
              [class]="image.gridClass"
            >
              <!-- Imagen — overflow-hidden en el padre + scale en
                   hover crea el efecto de zoom contenido -->
              <img
                [src]="image.src"
                [alt]="image.alt"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              <!-- Overlay oscuro — aparece en hover para mostrar
                   el caption sin ocultar completamente la imagen -->
              <div
                class="absolute inset-0 flex items-end bg-brand-900/0 p-4 transition-colors duration-300 group-hover:bg-brand-900/50"
                aria-hidden="true"
              >
                <!-- Caption — se desliza hacia arriba al hacer hover -->
                <p
                  class="translate-y-4 text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  {{ image.caption }}
                </p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class GalleryComponent {
  /* Array de 6 imágenes de la galería con sus propiedades de grid.
     Las clases gridClass controlan el layout visual:
     - lg:row-span-2: la imagen ocupa 2 filas en desktop (más alta).
     - lg:col-span-2: la imagen ocupa 2 columnas en desktop (más ancha).
     En mobile todas son celdas simples de 1 columna. */
  images: GalleryImage[] = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80&auto=format&fit=crop',
      alt: 'Modern dental treatment room with reclining chair and overhead light',
      caption: 'State-of-the-art treatment rooms',
      /* Primera imagen alta — ocupa 2 filas para destacar */
      gridClass: 'lg:row-span-2',
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80&auto=format&fit=crop',
      alt: 'Dentist examining patient with dental tools',
      caption: 'Expert care from our specialists',
      gridClass: '',
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80&auto=format&fit=crop',
      alt: 'Dental team in professional attire in the clinic',
      caption: 'Our dedicated team of professionals',
      gridClass: '',
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&q=80&auto=format&fit=crop',
      alt: 'Happy patient smiling after dental treatment',
      caption: 'Real patient results — real smiles',
      /* Imagen ancha — ocupa 2 columnas para mostrar la sonrisa completa */
      gridClass: 'lg:col-span-2',
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80&auto=format&fit=crop',
      alt: 'Digital dental X-ray equipment in modern clinic',
      caption: 'Digital X-ray & 3D imaging technology',
      gridClass: '',
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&q=80&auto=format&fit=crop',
      alt: 'Comfortable reception area of DentaCare Clinic',
      caption: 'Welcoming, comfortable reception area',
      gridClass: '',
    },
  ];
}
