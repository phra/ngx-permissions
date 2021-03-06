import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PermissionsGuard } from 'ngx-permissions';
import { LazyComponentComponent } from './lazy-component/lazy-component.component';
import { NgxPermissionsModule } from 'ngx-permissions';

const appRoutes: Routes = [
  { path: '',
    component: LazyComponentComponent,
  },
  {
    path: 'except-should',
    component: LazyComponentComponent,
    canActivate: [PermissionsGuard],
    data: {
      permissions: {
        except: 'ADDDMIN'
      }
    }
  },
  {
    path: 'only-should',
    component: LazyComponentComponent,
    canActivate: [PermissionsGuard],
    data: {
      permissions: {
        only: 'ADMIN'
      }
    }
  },
  {
    path: 'except-should-not',
    component: LazyComponentComponent,
    canActivate: [PermissionsGuard],
    data: {
      permissions: {
        except: 'ADMIN'
      }
    }
  },
  {
    path: 'only-should-not',
    component: LazyComponentComponent,
    canActivate: [PermissionsGuard],
    data: {
      permissions: {
        only: 'GUEST'
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
export class LazyRoutingModule {}
