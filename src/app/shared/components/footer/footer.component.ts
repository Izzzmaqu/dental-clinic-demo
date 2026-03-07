/* ============================================================
   FooterComponent — Pie de página de DentaCare Clinic.

   Responsabilidades:
   - Mostrar el logo y una breve descripción de la clínica.
   - Mostrar links de navegación rápida agrupados por categoría.
   - Mostrar información de contacto (teléfono, email, dirección).
   - Mostrar íconos de redes sociales con links placeholder.
   - Mostrar el año actual en el copyright (calculado dinámicamente).
   - Mostrar un badge visible de "DEMO — Portfolio Project" para
     que los visitantes del portafolio sepan que es una landing demo.

   Ninguno de los links de redes sociales o contacto funciona en
   producción real; son datos ficticios para la demo.
   ============================================================ */

import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- ======================================================
         Footer — fondo azul marino oscuro para contraste con
         el resto de la página de fondo claro.
         ====================================================== -->
    <footer class="bg-brand-900 text-white" role="contentinfo">

      <!-- ======================================================
           Sección principal del footer — organizada en un grid
           de 4 columnas en desktop que colapsa a 2 en tablet
           y a 1 en mobile.
           ====================================================== -->
      <div class="section-container py-16">
        <div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">

          <!-- ====================================================
               Columna 1 — Identidad de marca.
               Logo + descripción corta + links de redes sociales.
               ==================================================== -->
          <div class="lg:col-span-1">
            <!-- Logo igual que en el navbar -->
            <a href="#home" class="flex items-center gap-2 transition-opacity duration-200 hover:opacity-80" aria-label="DentaCare Clinic">
              <svg class="h-8 w-8 shrink-0" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <circle cx="16" cy="16" r="16" fill="#2563eb"/>
                <path d="M10 10c1.5-2 3-3 6-3s4.5 1 6 3c1 1.5 1 3 0.5 5.5-0.5 2-1 4-1.5 6-0.3 1.2-1 1.5-1.5 1.5s-1-0.5-1.5-2c-0.3-1-0.5-1.5-2-1.5s-1.7 0.5-2 1.5c-0.5 1.5-1 2-1.5 2s-1.2-0.3-1.5-1.5c-0.5-2-1-4-1.5-6C9 13 9 11.5 10 10z" fill="white"/>
              </svg>
              <span class="text-lg font-bold tracking-tight">
                Denta<span class="text-brand-500">Care</span>
              </span>
            </a>
            <p class="mt-4 text-sm leading-relaxed text-white/60">
              Professional dental care with a personal touch. Your smile is our greatest achievement.
            </p>
            <!-- Links de redes sociales — placeholder, no funcionan en demo -->
            <div class="mt-6 flex items-center gap-4">
              <!-- Facebook -->
              <a href="#" aria-label="Facebook" class="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors duration-200 hover:bg-brand-500 hover:text-white">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <!-- Instagram -->
              <a href="#" aria-label="Instagram" class="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors duration-200 hover:bg-brand-500 hover:text-white">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <!-- Twitter / X -->
              <a href="#" aria-label="Twitter / X" class="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors duration-200 hover:bg-brand-500 hover:text-white">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- ====================================================
               Columna 2 — Quick Links: links de navegación rápida
               hacia las secciones de la landing.
               ==================================================== -->
          <div>
            <h3 class="mb-6 text-sm font-semibold uppercase tracking-widest text-white/40">
              Quick Links
            </h3>
            <ul class="space-y-3" role="list">
              @for (link of quickLinks; track link.href) {
                <li>
                  <a
                    [href]="link.href"
                    class="text-sm text-white/60 transition-colors duration-200 hover:text-white"
                  >
                    {{ link.label }}
                  </a>
                </li>
              }
            </ul>
          </div>

          <!-- ====================================================
               Columna 3 — Services: lista de servicios para mejorar
               el SEO interno y dar contexto a los visitantes.
               ==================================================== -->
          <div>
            <h3 class="mb-6 text-sm font-semibold uppercase tracking-widest text-white/40">
              Services
            </h3>
            <ul class="space-y-3" role="list">
              @for (service of services; track service) {
                <li>
                  <span class="text-sm text-white/60">{{ service }}</span>
                </li>
              }
            </ul>
          </div>

          <!-- ====================================================
               Columna 4 — Contact info: teléfono, email y dirección.
               Datos ficticios para la demo.
               ==================================================== -->
          <div>
            <h3 class="mb-6 text-sm font-semibold uppercase tracking-widest text-white/40">
              Contact
            </h3>
            <ul class="space-y-4" role="list">
              <!-- Teléfono -->
              <li class="flex items-start gap-3">
                <svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span class="text-sm text-white/60">+506 xxxx-xxxx</span>
              </li>
              <!-- Email -->
              <li class="flex items-start gap-3">
                <svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span class="text-sm text-white/60">hello&#64;dentacare.com</span>
              </li>
              <!-- Dirección -->
              <li class="flex items-start gap-3">
                <svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span class="text-sm text-white/60">
                  Av. Insurgentes Sur 1234<br />
                  Col. Del Valle, CDMX
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- ========================================================
           Barra inferior del footer — separador + copyright +
           badge "DEMO" bien visible para el portafolio.
           ======================================================== -->
      <div class="border-t border-white/10">
        <div class="section-container flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">

          <!-- Copyright con año dinámico -->
          <p class="text-xs text-white/40">
            &copy; {{ currentYear }} DentaCare Clinic. All rights reserved.
          </p>

          <!-- ====================================================
               Badge DEMO — etiqueta amarilla/ámbar bien visible que
               indica a los visitantes del portafolio que este sitio
               es una demostración y no una clínica real.
               ==================================================== -->
          <span
            class="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-400"
            aria-label="This is a portfolio demo project"
          >
            <!-- Ícono de advertencia triangular -->
            <svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
            </svg>
            DEMO — Portfolio Project
          </span>

          <!-- Crédito del desarrollador -->
          <p class="text-xs text-white/40">
            Designed &amp; built for portfolio purposes only
          </p>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  /* Año actual calculado dinámicamente al instanciar el componente.
     Se usa en la línea de copyright: © 2026 DentaCare Clinic. */
  currentYear = new Date().getFullYear();

  /* Links de navegación rápida que apuntan a las secciones del Home */
  quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'About Us', href: '#about' },
    { label: 'Our Team', href: '#team' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  /* Lista de servicios para la columna Services del footer */
  services = [
    'Teeth Cleaning',
    'Teeth Whitening',
    'Orthodontics',
    'Dental Implants',
    'Root Canal',
    'Cosmetic Dentistry',
  ];
}
