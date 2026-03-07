/* ============================================================
   ContactComponent — Sección de contacto y CTA final.

   Esta es la sección de cierre de la landing. Su objetivo es
   convertir — llevar al visitante a tomar acción concreta:
   llamar, enviar WhatsApp o visitar la clínica.

   Estructura:
   - Columna izquierda: campos de información de contacto
     (teléfono, email, dirección, horario de atención).
   - Columna derecha: CTA prominente de WhatsApp + badge de
     "respuesta rápida" y texto de reassurance.
   - Fondo azul oscuro para que esta sección cierre visualmente
     la landing y haga transición al footer.

   No hay formulario funcional — todo lleva a WhatsApp o tel:.
   ============================================================ */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AnimateOnScrollDirective } from '../../../../shared/directives/animate-on-scroll.directive';

/* Interfaz de un item de información de contacto */
interface ContactItem {
  /* Identificador para el track */
  id: string;
  /* Etiqueta del campo, ej: "Phone" */
  label: string;
  /* Valor visible, ej: "+52 (55) 1234-5678" */
  value: string;
  /* Href para enlace clicable — puede ser tel:, mailto:, o null
     si el item no es clicable (como la dirección o el horario) */
  href: string | null;
  /* SVG path del ícono representativo del campo */
  iconPath: string;
}

/* Interfaz de un horario de atención */
interface Schedule {
  /* Rango de días, ej: "Mon — Fri" */
  days: string;
  /* Horas de apertura, ej: "8:00 AM — 7:00 PM" */
  hours: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- ======================================================
         Contact Section — fondo brand-900 (navy) para hacer
         una transición natural hacia el footer que también
         es brand-900. Crea la sensación de que la landing
         "aterriza" en el bloque de cierre.
         ====================================================== -->
    <section id="contact" class="bg-brand-900 py-24 lg:py-32" aria-labelledby="contact-heading">
      <div class="section-container">

        <!-- Grid de dos columnas — info a la izquierda, CTA a la derecha -->
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">

          <!-- ==================================================
               Columna izquierda — información de contacto.
               ================================================== -->
          <div appAnimateOnScroll>
            <!-- Etiqueta y título de sección -->
            <span class="section-label text-brand-500">Get In Touch</span>
            <h2 id="contact-heading" class="mt-3 text-3xl font-bold text-white sm:text-4xl">
              We're Here When<br/>You Need Us
            </h2>
            <p class="mt-4 text-base leading-relaxed text-white/60">
              Ready to schedule your appointment? Reach out through any of the channels below
              and our friendly team will get back to you promptly.
            </p>

            <!-- Lista de items de contacto -->
            <ul class="mt-10 space-y-6" role="list">
              @for (item of contactItems; track item.id) {
                <li class="flex items-start gap-4">
                  <!-- Ícono del item envuelto en círculo azul -->
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/20">
                    <svg
                      class="h-5 w-5 text-brand-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        [attr.d]="item.iconPath"
                      />
                    </svg>
                  </div>
                  <!-- Contenido del item — clicable si tiene href -->
                  <div>
                    <p class="text-xs font-semibold uppercase tracking-wider text-white/40">
                      {{ item.label }}
                    </p>
                    <!-- Si el item tiene href, se renderiza como link.
                         Los links de tel: y mailto: funcionan en mobile
                         para llamar/abrir el cliente de correo directamente. -->
                    @if (item.href) {
                      <a
                        [href]="item.href"
                        class="mt-0.5 text-base font-medium text-white transition-colors duration-200 hover:text-brand-500"
                      >
                        {{ item.value }}
                      </a>
                    } @else {
                      <p class="mt-0.5 text-base font-medium text-white">
                        {{ item.value }}
                      </p>
                    }
                  </div>
                </li>
              }
            </ul>

            <!-- Horario de atención en tabla simple -->
            <div class="mt-10 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
              <h3 class="mb-4 text-sm font-semibold text-white">Office Hours</h3>
              <ul class="space-y-2" role="list">
                @for (schedule of schedules; track schedule.days) {
                  <li class="flex items-center justify-between">
                    <span class="text-sm text-white/60">{{ schedule.days }}</span>
                    <span class="text-sm font-medium text-white">{{ schedule.hours }}</span>
                  </li>
                }
              </ul>
            </div>
          </div>

          <!-- ==================================================
               Columna derecha — CTA de WhatsApp prominente.
               Esta columna es el elemento de conversión final.
               ================================================== -->
          <div
            class="flex flex-col justify-center"
            appAnimateOnScroll
            [animationDelay]="150"
          >
            <!-- Card CTA de WhatsApp -->
            <div class="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10 lg:p-10">
              <!-- Badge de "Fast response" -->
              <div class="mb-6 inline-flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-2">
                <span class="flex h-2 w-2 rounded-full bg-green-400"></span>
                <span class="text-xs font-medium text-green-400">
                  We typically reply within 5 minutes
                </span>
              </div>

              <!-- Título del CTA -->
              <h3 class="text-2xl font-bold text-white sm:text-3xl">
                Schedule Your<br/>
                <span class="text-brand-500">Free Consultation</span>
              </h3>

              <!-- Texto de apoyo -->
              <p class="mt-4 text-base leading-relaxed text-white/60">
                Send us a message on WhatsApp and one of our coordinators
                will help you find the best appointment time. No forms, no wait.
              </p>

              <!-- Lista de beneficios de agendar por WhatsApp -->
              <ul class="mt-6 space-y-3" role="list">
                @for (benefit of whatsappBenefits; track benefit) {
                  <li class="flex items-center gap-3 text-sm text-white/70">
                    <svg class="h-4 w-4 shrink-0 text-green-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    {{ benefit }}
                  </li>
                }
              </ul>

              <!-- Botón de WhatsApp principal — el CTA más importante
                   de toda la landing. Color verde oficial de WhatsApp. -->
              <a
                [href]="whatsappUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:bg-[#1fba58] hover:shadow-xl hover:shadow-[#25D366]/40 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
                aria-label="Book appointment via WhatsApp"
              >
                <!-- Ícono de WhatsApp -->
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Book via WhatsApp
              </a>

              <!-- Texto de confianza — número no guardado, sin spam -->
              <p class="mt-4 text-center text-xs text-white/30">
                We'll never share your number or send you spam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {
  /* URL de WhatsApp con número de demostración y mensaje pre-cargado.
     En producción se reemplazaría con el número real de la clínica. */
  readonly whatsappUrl =
    'https://wa.me/506xxxxxxx?text=Hello!%20I%27d%20like%20to%20schedule%20a%20free%20consultation%20at%20DentaCare%20Clinic.';

  /* Items de información de contacto.
     href: null significa que el valor no es clicable.
     href: 'tel:...' permite marcar el número directamente desde mobile. */
  contactItems: ContactItem[] = [
    {
      id: 'phone',
      label: 'Phone',
      value: '+506 xxxx-xxxx',
      href: 'tel:+506xxxx-xxxx',
      iconPath: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    },
    {
      id: 'email',
      label: 'Email',
      value: 'hello@dentacare.com',
      href: 'mailto:hello@dentacare.com',
      iconPath: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    },
    {
      id: 'address',
      label: 'Address',
      value: 'Av. Insurgentes Sur 1234, Col. Del Valle, CDMX',
      href: null,
      iconPath: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z',
    },
    {
      id: 'parking',
      label: 'Parking',
      value: 'Free underground parking for patients',
      href: null,
      iconPath: 'M8 17H5a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v10a2 2 0 01-2 2h-3m-1 4l-3 3m0 0l-3-3m3 3V10',
    },
  ];

  /* Horarios de atención de la clínica */
  schedules: Schedule[] = [
    { days: 'Monday — Friday', hours: '8:00 AM — 7:00 PM' },
    { days: 'Saturday', hours: '9:00 AM — 3:00 PM' },
    { days: 'Sunday', hours: 'Closed' },
  ];

  /* Lista de beneficios de agendar por WhatsApp.
     Se muestra como lista con checkmarks en la card de CTA. */
  whatsappBenefits = [
    'Instant confirmation of your appointment',
    'Flexible rescheduling with no penalty',
    'Receive reminders 24 hours before',
    'Ask any question directly to our team',
  ];
}
