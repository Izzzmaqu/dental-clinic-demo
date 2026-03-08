/* ============================================================
   WhatsappButtonComponent — Botón flotante de WhatsApp.

   Responsabilidades:
   - Aparecer en la esquina inferior derecha de la pantalla
     en todo momento mientras el usuario navega la landing
     (position: fixed).
   - Al hacer clic, abrir WhatsApp web con un mensaje predefinido
     en una nueva pestaña del navegador.
   - Mostrar un tooltip con texto "Chat on WhatsApp" al hacer
     hover sobre el botón, para darle contexto al usuario.
   - Tener una animación de pulso verde para llamar la atención
     del usuario de forma sutil (no intrusiva).
   - Aparecer solo después de que el usuario haya bajado 300px
     en la página, para no superponerse con el hero inicial.

   El número de WhatsApp es ficticio para la demo.
   Formato del enlace: https://wa.me/{número}{mensaje pre-cargado}
   ============================================================ */

import {
  Component,
  signal,
  HostListener,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- ======================================================
         Contenedor posicionado — fixed en la esquina inferior
         derecha de la pantalla. z-40 para estar sobre el
         contenido pero debajo del navbar (z-50).
         La transición de opacidad/transform hace que el botón
         aparezca suavemente al hacer scroll.
         ====================================================== -->
    <div
      class="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 transition-all duration-300"
      [ngClass]="{
        'opacity-100 translate-y-0': visible(),
        'opacity-0 translate-y-4 pointer-events-none': !visible()
      }"
    >
      <!-- ====================================================
           Tooltip de texto — aparece encima del botón al
           hacer hover. Usa CSS group/peer para el toggle
           sin necesidad de lógica JavaScript.
           ==================================================== -->
      <span
        class="rounded-lg bg-ink-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        aria-hidden="true"
      >
        Chat on WhatsApp
      </span>

      <!-- ====================================================
           Botón principal — link a WhatsApp con el número
           de demostración y un mensaje pre-cargado.
           El círculo de pulso verde se logra con la pseudo-clase
           ::before simulada con un div absoluto + animate-ping
           de Tailwind, lo que crea el efecto de onda expansiva.
           ==================================================== -->
      <a
        [href]="whatsappUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
        aria-label="Contact us on WhatsApp"
        title="Chat on WhatsApp"
      >
        <!-- Anillo de pulso animado — crea el efecto visual de
             "hay actividad" alrededor del botón. animate-ping
             hace que el anillo crezca y se desvanezca en loop. -->
        <span
          class="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25"
          aria-hidden="true"
        ></span>

        <!-- Ícono de WhatsApp SVG — el logotipo oficial de WhatsApp
             en blanco para contrastar con el fondo verde -->
        <svg
          class="relative z-10 h-7 w-7 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
          />
        </svg>
      </a>
    </div>
  `,
})
export class WhatsappButtonComponent {
  /* Signal que controla si el botón es visible.
     Empieza oculto y se vuelve visible cuando el usuario
     ha scrolleado más de 300px hacia abajo. */
  visible = signal(false);

  /* URL de WhatsApp con número ficticio de demostración y
     mensaje pre-cargado codificado en URL.
     Formato: https://wa.me/{número}?text={mensaje}
     El mensaje indica que es para agendar una cita. */
  readonly whatsappUrl =
    'https://wa.me/50600000000?text=Hello!%20I%27d%20like%20to%20schedule%20an%20appointment%20at%20DentaCare%20Clinic.';

  /* HostListener — escucha el evento scroll del window.
     Cuando el usuario baja más de 300px, activa la visibilidad
     del botón. Los 300px son suficientes para que no interfiera
     con los CTAs del Hero que tienen el mismo objetivo. */
  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.visible.set(window.scrollY > 300);
  }
}
