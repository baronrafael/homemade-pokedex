import { Observable, pipe } from 'rxjs';
import { publishReplay, refCount } from 'rxjs/operators';

/**
 * This operator acts as a cache for http requests.
 * @param replyCount Number of results to replay, default is 1.
 */
export const cacheResult = <T>(replyCount = 1) => (input$: Observable<T>) =>
  input$.pipe(
    publishReplay<T>(replyCount),
    refCount<T>(),
  );
