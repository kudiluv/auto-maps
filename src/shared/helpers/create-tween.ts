import { Observable } from 'rxjs';
import { TweenFunction } from 'tween-functions';

export function createTween(
  easingFunction: TweenFunction,
  start: number,
  end: number,
  duration: number
) {
  return new Observable(function (observer) {
    let startTime: number;
    let id = requestAnimationFrame(function sample(time) {
      startTime = startTime || time;
      const t = time - startTime;
      if (t < duration) {
        observer.next(easingFunction(t, start, end, duration));
        id = requestAnimationFrame(sample);
      } else {
        observer.next(easingFunction(duration, start, end, duration));
        id = requestAnimationFrame(function () {
          return observer.complete();
        });
      }
    });
    return function () {
      if (id) {
        cancelAnimationFrame(id);
      }
    };
  });
}

export default createTween;
