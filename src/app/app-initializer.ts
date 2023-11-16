import { Observable } from 'rxjs';
import { FetchService } from './fetch.service';

export function appInitializer(
  authService: FetchService
): () => Observable<any> {
  return () => authService.refreshToken();
}
