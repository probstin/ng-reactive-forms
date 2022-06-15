import { Component } from '@angular/core';
import { forkJoin, map, mergeMap, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.css']
})
export class StepThreeComponent {

  accesses: string[] = [];

  constructor() { }

  register(): void {
    this._register()
      .pipe(
        switchMap((project: any) => of(project)
          .pipe(
            mergeMap((project: any) => {
              const accesses$: any = this._getAccessRequests(project.id, this.accesses);
              return forkJoin(accesses$);
            })
          )
        ),
        map((response: any) => {
          response.forEach((element: any) => {
            if (element instanceof Error) console.error('ERROR');
          });
          return response;
        })
      )
      .subscribe({
        next: () => console.log('COMPLETE'),
        error: error => console.error(error)
      })
  }

  private _register() {
    return of({ id: 1 });
  }

  private _getAccessRequests(projectId: number, accesses: string[]): Observable<any>[] {
    return [of({ id: 2 }), of({ id: 3 }), of(new Error('SOMETHING WENT WRONG'))];
  }
}
