/* ============================================================
   HeroComponent — Sección principal "above the fold" de la landing.

   Es la primera cosa que ve el usuario al abrir la página.
   Debe comunicar inmediatamente: qué es, para quién es y
   qué debe hacer el usuario a continuación (CTA).

   Estructura visual:
   - Fondo: gradiente oscuro de navy (brand-900 → brand-700)
     con una imagen de clínica como overlay sutil (opacity baja).
   - Columna izquierda: badge "✓ Trusted by 5000+ patients",
     headline grande H1, subtítulo, 2 botones CTA.
   - Columna derecha: imagen principal de la clínica con
     card flotante de métricas y una barra de satisfacción.
   - Indicador de scroll (chevron animado) en la parte inferior.

   La animación de entrada se hace con clases CSS puras
   (no Angular animations) usando opacity + transform con
   diferentes animation-delay para dar el efecto cascada.
   ============================================================ */

import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- ======================================================
         Hero Section — id="home" para que el link del navbar
         'href="#home"' navegue aquí. min-h-screen garantiza
         que ocupe al menos toda la altura de la pantalla.
         El padding-top compensa el navbar fixed (h-20 = 80px).
         ====================================================== -->
    <section
      id="home"
      class="relative flex min-h-screen items-center overflow-hidden bg-brand-900 pt-20"
      aria-labelledby="hero-heading"
    >
      <!-- ====================================================
           Patrón de fondo — grid de puntos sutiles para dar
           profundidad sin ser intrusivo. Se logra con un
           radial-gradient en SVG inline como background-image.
           ==================================================== -->
      <div
        class="pointer-events-none absolute inset-0 opacity-[0.07]"
        style="background-image: radial-gradient(circle, #fff 1px, transparent 1px); background-size: 32px 32px;"
        aria-hidden="true"
      ></div>

      <!-- ====================================================
           Blob decorativo — círculo difuminado en la esquina
           superior derecha para dar calidez visual al fondo.
           No tiene semántica ni interactividad.
           ==================================================== -->
      <div
        class="pointer-events-none absolute -right-32 -top-32 h-150 w-150 rounded-full bg-brand-500/10 blur-3xl"
        aria-hidden="true"
      ></div>
      <div
        class="pointer-events-none absolute -bottom-32 -left-32 h-100 w-100 rounded-full bg-brand-700/20 blur-3xl"
        aria-hidden="true"
      ></div>

      <!-- ====================================================
           Contenido principal — grid de 2 columnas en desktop.
           En mobile apila las columnas verticalmente.
           ==================================================== -->
      <div class="section-container relative z-10 py-20 lg:py-28">
        <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

          <!-- ==================================================
               Columna izquierda — texto y CTAs.
               Cada elemento tiene un animation-delay diferente
               para crear el efecto de entrada en cascada.
               ================================================== -->
          <div class="max-w-xl">

            <!-- Badge de confianza social — "Trusted by 5000+ patients"
                 Elemento visual que genera credibilidad inmediata -->
            <div
              class="hero-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-2"
              style="animation-delay: 0ms;"
            >
              <span class="flex h-2 w-2 rounded-full bg-green-400"></span>
              <span class="text-xs font-medium text-brand-100">
                Trusted by 5,000+ happy patients
              </span>
            </div>

            <!-- Headline principal H1 — la promesa de valor central.
                 Está dividida en dos líneas para control tipográfico.
                 text-balance distribuye el texto de forma equilibrada. -->
            <h1
              id="hero-heading"
              class="hero-fade-in text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
              style="animation-delay: 100ms;"
            >
              Your Perfect
              <span class="block text-brand-500">Smile Starts</span>
              <span class="block">Here</span>
            </h1>

            <!-- Subtítulo — describe brevemente la propuesta de valor -->
            <p
              class="hero-fade-in mt-6 text-base leading-relaxed text-white/60 sm:text-lg"
              style="animation-delay: 200ms;"
            >
              DentaCare Clinic offers comprehensive dental care in a comfortable, modern environment.
              From routine cleanings to complete smile makeovers — we're here for you.
            </p>

            <!-- Botones CTA — dos opciones para el usuario:
                 acción primaria (agendar) y secundaria (ver servicios) -->
            <div
              class="hero-fade-in mt-10 flex flex-wrap items-center gap-4"
              style="animation-delay: 300ms;"
            >
              <!-- CTA principal — lleva a la sección de contacto -->
              <a href="#contact" class="btn-primary text-base px-8 py-3.5">
                Book Free Consultation
              </a>
              <!-- CTA secundario — lleva a la sección de servicios -->
              <a href="#services" class="btn-outline text-base px-8 py-3.5">
                Our Services
              </a>
            </div>

            <!-- Indicadores de confianza en texto pequeño -->
            <div
              class="hero-fade-in mt-10 flex flex-wrap items-center gap-6"
              style="animation-delay: 400ms;"
            >
              @for (badge of trustBadges; track badge.text) {
                <div class="flex items-center gap-2">
                  <!-- Check icon verde -->
                  <svg class="h-4 w-4 shrink-0 text-green-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-sm text-white/60">{{ badge.text }}</span>
                </div>
              }
            </div>
          </div>

          <!-- ==================================================
               Columna derecha — imagen de la clínica con
               cards flotantes de estadísticas.
               ================================================== -->
          <div
            class="hero-fade-in relative"
            style="animation-delay: 200ms;"
          >
            <!-- Imagen principal — foto de clínica dental moderna de Unsplash.
                 Object-cover + la proporción fija dan un recorte limpio. -->
            <div class="relative overflow-hidden rounded-3xl shadow-2xl shadow-brand-900/50">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=700&q=80&auto=format&fit=crop"
                alt="Modern dental clinic treatment room with state-of-the-art equipment"
                class="aspect-4/3 w-full object-cover"
                loading="eager"
                width="700"
                height="525"
              />
              <!-- Overlay muy sutil para mejorar el contraste de las cards -->
              <div class="absolute inset-0 bg-brand-900/20"></div>
            </div>

            <!-- ================================================
                 Card flotante — estadística de satisfacción.
                 Posicionada en la esquina inferior izquierda de
                 la imagen para un efecto de profundidad elegante.
                 ================================================ -->
            <div
              class="absolute -bottom-6 -left-6 rounded-2xl bg-white p-4 shadow-xl shadow-ink-900/10 ring-1 ring-ink-200"
            >
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                  <!-- Ícono de estrella -->
                  <svg class="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-lg font-bold text-ink-900">98%</p>
                  <p class="text-xs text-ink-500">Patient Satisfaction</p>
                </div>
              </div>
            </div>

            <!-- ================================================
                 Card flotante derecha — años de experiencia.
                 Posicionada arriba a la derecha de la imagen.
                 ================================================ -->
            <div
              class="absolute -right-6 -top-6 rounded-2xl bg-brand-500 p-4 shadow-xl shadow-brand-500/30"
            >
              <p class="text-2xl font-bold text-white">15+</p>
              <p class="text-xs font-medium text-white/80">Years of<br/>Excellence</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ======================================================
           Indicador de scroll — chevron animado en la parte
           inferior del hero que invita al usuario a seguir
           bajando. Se oculta automáticamente al hacer scroll.
           ====================================================== -->
      <div
        class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        aria-hidden="true"
      >
        <a href="#services" class="flex flex-col items-center gap-1 text-white/30 hover:text-white/60 transition-colors duration-200">
          <span class="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </a>
      </div>
    </section>

    <!-- ======================================================
         Estilos de animación del hero.
         .hero-fade-in define el estado inicial invisible y
         la animación CSS de entrada que se activa al cargar
         la página (no necesita IntersectionObserver porque
         el hero siempre es visible en el primer render).
         ====================================================== -->
    <style>
      /* Estado inicial — el elemento empieza transparente y
         desplazado 20px hacia abajo */
      .hero-fade-in {
        opacity: 0;
        transform: translateY(20px);
        animation: heroFadeInUp 0.7s ease-out forwards;
      }

      /* Keyframe de la animación — lleva el elemento a su
         posición y opacidad normales */
      @keyframes heroFadeInUp {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    </style>
  `,
})
export class HeroComponent {
  /* Array con los badges de confianza que aparecen debajo de los CTAs.
     Son argumentos de venta rápida (sin compromiso, seguro, certificado). */
  trustBadges = [
    { text: 'No referral needed' },
    { text: 'Insurance accepted' },
    { text: 'Certified specialists' },
  ];
}
