/* ============================================================
   AnimateOnScrollDirective — Directiva de animación al scroll.

   Esta directiva usa la API nativa IntersectionObserver del
   navegador para detectar cuándo un elemento entra al viewport
   del usuario. Cuando ocurre, añade la clase CSS 'is-visible'
   al elemento, lo que dispara la animación de fade-in-up
   definida en styles.css con las clases .animate-on-scroll y
   .animate-on-scroll.is-visible.

   Uso en cualquier template:
   <div appAnimateOnScroll>...</div>
   <div appAnimateOnScroll animationDelay="150">...</div>

   Parámetros:
   - animationDelay: número en ms para retrasar la animación.
     Útil para escalonar cards en un grid (150, 300, 450...).

   Por qué IntersectionObserver en lugar de HostListener scroll:
   - IntersectionObserver es más eficiente: no reduce el
     rendimiento al consultar el layout en cada frame.
   - El navegador lo maneja en un thread separado y solo notifica
     cuando el elemento realmente cruza el umbral.
   - Compatible con todos los navegadores modernos.
   ============================================================ */

import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';

@Directive({
  /* Selector como atributo: se aplica escribiendo appAnimateOnScroll
     en cualquier elemento HTML del template */
  selector: '[appAnimateOnScroll]',
  standalone: true,
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
  /* Input opcional — retraso en milisegundos antes de que
     la animación comience. Permite escalonar múltiples elementos
     en un grid para que se animen en cascada.
     Valor por defecto: 0 (sin retraso). */
  @Input() animationDelay = 0;

  /* Referencia al IntersectionObserver para poder desconectarlo
     cuando el componente padre se destruya y evitar memory leaks. */
  private observer: IntersectionObserver | null = null;

  /* ElementRef inyecta una referencia directa al elemento DOM
     nativo al que se aplicó la directiva. Con él podemos
     añadir y quitar clases CSS al elemento. */
  constructor(private el: ElementRef<HTMLElement>) {}

  /* ngOnInit — se ejecuta después del primer ciclo de Change
     Detection. Aquí configuramos el estado inicial del elemento
     y creamos el IntersectionObserver. */
  ngOnInit(): void {
    /* Añade la clase base que hace el elemento invisible y
       desplazado (opacity: 0, translateY: 24px).
       Definida en styles.css como .animate-on-scroll */
    this.el.nativeElement.classList.add('animate-on-scroll');

    /* Si se especificó un retraso, lo aplicamos como inline style.
       Esto permite valores arbitrarios sin necesidad de crear
       clases Tailwind para cada delay. */
    if (this.animationDelay > 0) {
      this.el.nativeElement.style.transitionDelay = `${this.animationDelay}ms`;
    }

    /* Creamos el IntersectionObserver con un umbral de 0.15 (15%).
       Esto significa que la animación se dispara cuando al menos
       el 15% del elemento es visible en el viewport.
       Un umbral de 0 dispararía la animación cuando el elemento
       apenas asoma, lo que puede verse brusco. */
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            /* El elemento entró al viewport — añadir is-visible
               para disparar la transición CSS fade-in-up */
            this.el.nativeElement.classList.add('is-visible');
            /* Dejamos de observar el elemento una vez animado.
               No tiene sentido re-animar algo que ya es visible.
               Esto también ahorra memoria al reducir el número
               de elementos observados activos. */
            this.observer?.unobserve(this.el.nativeElement);
          }
        });
      },
      {
        /* threshold: fracción del elemento que debe ser visible
           para disparar el callback. 0.15 = 15% */
        threshold: 0.15,
        /* rootMargin: expande el área de detección -50px en el
           bottom. Hace que la animación se dispare un poco antes
           de que el elemento llegue al borde de la pantalla,
           dando una sensación de anticipación más fluida. */
        rootMargin: '0px 0px -50px 0px',
      }
    );

    /* Comenzamos a observar el elemento nativo */
    this.observer.observe(this.el.nativeElement);
  }

  /* ngOnDestroy — se ejecuta justo antes de que Angular destruya
     el componente. Debemos desconectar el observer para evitar
     memory leaks, especialmente importante en SPAs donde los
     componentes se montan y desmontan dinámicamente. */
  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.observer = null;
  }
}
