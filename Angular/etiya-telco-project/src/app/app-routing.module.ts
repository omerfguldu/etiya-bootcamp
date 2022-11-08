import { ServicesComponent } from './pages/services/services.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';

import { CustomersComponent } from './pages/customers/customers.component';

import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { NewCustomerComponent } from './pages/new-customer/new-customer.component';
import { CustomerInfoFormComponent } from './components/customer-info-form/customer-info-form.component';
import { CustomerServicesFormComponent } from './components/customer-services-form/customer-services-form.component';
import { CustomerOverviewFormComponent } from './components/customer-overview-form/customer-overview-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full',
  },
  {
    path: 'homepage',
    component: HomepageComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        redirectTo: 'services', // ! services olacak
        pathMatch: 'full',
      },
      {
        path: 'services',
        component: ServicesComponent,
      },
      {
        path: 'customers',
        component: CustomersComponent,
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            component: CustomerListComponent,
          },
          {
            path: 'list/:id',
            component: CustomerDetailsComponent,
          },
        ],
      },
      {
        path: 'newcustomer',
        component: NewCustomerComponent,
        children: [
          {
            path: '',
            redirectTo: 'info',
            pathMatch: 'full',
          },
          {
            path: 'info',
            component: CustomerInfoFormComponent,
          },
          {
            path: 'services',
            component: CustomerServicesFormComponent,
          },
          {
            path: 'overview',
            component: CustomerOverviewFormComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
