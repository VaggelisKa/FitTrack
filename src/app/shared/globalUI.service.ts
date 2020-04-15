import { Subject } from 'rxjs';

export class GlobalUIService {
    isLoading = new Subject<boolean>();
}
