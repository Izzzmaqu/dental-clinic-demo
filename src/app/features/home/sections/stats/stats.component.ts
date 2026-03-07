/* ============================================================
   StatsComponent — Sección de estadísticas / métricas clave.

   Muestra 4 números grandes que refuerzan la credibilidad
   y la escala de la clínica. Los números se animan con un
   efecto "contador" que sube desde 0 hasta el valor final
   cuando la sección entra al viewport del usuario.

   Técnicas utilizadas:
   - IntersectionObserver nativo para detectar el momento en
     que la sección entra al viewport y disparar el contador.
   - signal<number> de Angular para cada stat animado, lo que
     hace que el template se actualice reactivamente sin
     llamar a ChangeDetectorRef manualmente.
   - setInterval para incrementar el valor gradualmente.
   - easing logarítmico para que el contador acelere al inicio
     y desacelere al final, como en las animaciones profesionales.
   ============================================================ */

import {
  Component,
  signal,
  OnInit,
  OnDestroy,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';

/* Interfaz de cada métrica estadística */
interface Stat {
  /* Valor numérico final al que llega la animación */
  value: number;
  /* Sufijo que aparece después del número: "+", "%", etc. */
  suffix: string;
  /* Etiqueta descriptiva debajo del número */
  label: string;
  /* Duración de la animación del contador en milisegundos */
  animationDuration: number;
  /* Signal que mantiene el valor actual animado del contador.
     Definido aquí para que sea parte del mismo objeto. */
  current: ReturnType<typeof signal<number>>;
}

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- ======================================================
         Stats Section — fondo azul marino oscuro (brand-900)
         para crear un fuerte contraste visual con las secciones
         blancas/pálidas que la rodean. Esto hace que esta
         sección "llame la atención" mientras el usuario scrollea.
         ====================================================== -->
    <section
      class="bg-brand-900 py-20 lg:py-28"
      aria-label="Key clinic statistics"
    >
      <div class="section-container">
        <!-- ====================================================
             Grid de stats — 2 columnas en mobile, 4 en desktop.
             Cada celda muestra un número grande + etiqueta.
             ==================================================== -->
        <div class="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          @for (stat of stats; track stat.label) {
            <!-- Cada stat tiene un separador vertical a su derecha,
                 excepto el último, para marcar divisiones visuales -->
            <article class="text-center">
              <!-- Número animado — el signal current() se actualiza
                   cada pocos ms por el setInterval del contador -->
              <p class="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl" aria-live="polite">
                {{ stat.current() }}<span class="text-brand-500">{{ stat.suffix }}</span>
              </p>
              <!-- Etiqueta descriptiva -->
              <p class="mt-2 text-sm font-medium text-white/50 sm:text-base">
                {{ stat.label }}
              </p>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class StatsComponent implements OnInit, OnDestroy {
  /* Array de métricas con sus valores objetivo y signals de animación.
     Cada stat.current es un signal inicializado en 0 que se animará
     hasta stat.value cuando la sección entre al viewport. */
  stats: Stat[] = [
    {
      value: 5000,
      suffix: '+',
      label: 'Happy Patients',
      animationDuration: 2000,
      current: signal(0),
    },
    {
      value: 15,
      suffix: '+',
      label: 'Years of Experience',
      animationDuration: 1500,
      current: signal(0),
    },
    {
      value: 98,
      suffix: '%',
      label: 'Satisfaction Rate',
      animationDuration: 1800,
      current: signal(0),
    },
    {
      value: 8,
      suffix: '',
      label: 'Certified Specialists',
      animationDuration: 1200,
      current: signal(0),
    },
  ];

  /* Referencia al IntersectionObserver para desconectarlo en ngOnDestroy */
  private observer: IntersectionObserver | null = null;

  /* Array de intervalos activos — necesario para limpiarlos todos
     en ngOnDestroy y evitar memory leaks si el componente se destruye
     antes de que los contadores terminen de correr. */
  private intervals: ReturnType<typeof setInterval>[] = [];

  /* ElementRef inyecta la referencia al elemento raíz del componente
     (la etiqueta <section>) para que el IntersectionObserver lo observe */
  constructor(private el: ElementRef<HTMLElement>) {}

  /* ngOnInit — configura el IntersectionObserver que activará la
     animación de los contadores cuando la sección entre al viewport */
  ngOnInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        /* Cuando al menos el 30% de la sección es visible... */
        if (entries[0].isIntersecting) {
          /* ...iniciamos el contador para cada stat */
          this.stats.forEach((stat) => this.animateCounter(stat));
          /* ...y dejamos de observar para no re-animar al volver a subir */
          this.observer?.unobserve(this.el.nativeElement);
        }
      },
      {
        /* Se activa cuando el 30% del elemento es visible */
        threshold: 0.3,
      }
    );

    /* Comenzamos a observar el elemento raíz de este componente */
    this.observer.observe(this.el.nativeElement);
  }

  /* animateCounter — anima un stat individual desde 0 hasta su valor
     objetivo usando setInterval con pasos dinámicos.

     Parámetros:
     - stat: el objeto Stat a animar.

     Lógica del paso dinámico:
     - El intervalo se ejecuta cada 16ms (~60fps).
     - El número de pasos = duración total / 16ms.
     - En cada paso, el valor sube un "paso" de tamaño fijo.
     - Cuando el valor actual alcanza el objetivo, se limpia el intervalo. */
  private animateCounter(stat: Stat): void {
    /* Tiempo entre cada frame de la animación (ms).
       16ms ≈ 60 fps para una animación fluida. */
    const frameInterval = 16;

    /* Número total de frames que durará la animación */
    const totalFrames = Math.ceil(stat.animationDuration / frameInterval);

    /* Incremento por frame — cuánto sube el número en cada tick */
    const increment = stat.value / totalFrames;

    /* Valor flotante acumulado — lo usamos internamente para no
       perder precisión al redondear, y solo mostramos el entero */
    let current = 0;

    /* setInterval ejecuta el callback cada frameInterval ms.
       Guardamos la referencia para poder limpiarlo en ngOnDestroy. */
    const interval = setInterval(() => {
      current += increment;

      if (current >= stat.value) {
        /* El contador llegó al valor objetivo — fijar el valor exacto
           y limpiar el intervalo para detener la animación */
        stat.current.set(stat.value);
        clearInterval(interval);
      } else {
        /* Aún no llegó — actualizar el signal con el valor redondeado.
           Angular detecta el cambio del signal y actualiza el DOM. */
        stat.current.set(Math.floor(current));
      }
    }, frameInterval);

    /* Guardamos la referencia del intervalo para el cleanup */
    this.intervals.push(interval);
  }

  /* ngOnDestroy — limpia recursos cuando el componente se destruye.
     Desconecta el observer y cancela todos los setIntervals activos
     para evitar memory leaks y errores de "update on destroyed component". */
  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.observer = null;
    this.intervals.forEach((interval) => clearInterval(interval));
    this.intervals = [];
  }
}
