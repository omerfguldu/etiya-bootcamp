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
        redirectTo: 'newcustomer', // ! services olacak
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
