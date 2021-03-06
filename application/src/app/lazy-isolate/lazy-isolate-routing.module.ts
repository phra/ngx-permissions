import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { IsolateComponent } from './isolate/isolate.component';
import { PermissionsGuard } from 'ngx-permissions';

const appRoutes: Routes = [
  { path: '',
    component: IsolateComponent,
  },
  {
    path: 'except-should',
    component: IsolateComponent,
    canActivate: [PermissionsGuard],
    data: {
      permissions: {
        except: 'ADDDMIN'
      }
    }
  },
  {
    path: 'only-should',
    component: IsolateComponent,
    canActivate: [PermissionsGuard],
    data: {
      permissions: {
        only: 'GUEST'
      }
    }
  },
  {
    path: 'except-should-not',
    component: IsolateComponent,
    canActivate: [PermissionsGuard],
    data: {
      permissions: {
        except: 'GUEST'
      }
    }
  },
  {
    path: 'only-should-not',
    component: IsolateComponent,
    canActivate: [PermissionsGuard],
    data: {
      permissions: {
        only: 'ADMIN'
      }
    }
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(appRoutes),
  ],
  exports: [
    RouterModule
  ],
  providers: [
    // CanDeactivateGuard
  ]
})
export class LazyIsolateRoutingModule {}
