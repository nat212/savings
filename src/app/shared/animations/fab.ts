import { animate, style, transition, trigger } from '@angular/animations';

export const fabShowHide = trigger('fabShowHide', [
  transition(':leave', [
    style({ transform: 'rotate(0deg) scale(1)' }),
    animate('200ms ease-in-out', style({ transform: 'rotate(90deg) scale(0)' })),
  ]),
  transition(':enter', [
    style({ transform: 'rotate(90deg) scale(0)' }),
    animate('200ms ease-in-out', style({ transform: 'rotate(0deg) scale(1)' })),
  ]),
]);
