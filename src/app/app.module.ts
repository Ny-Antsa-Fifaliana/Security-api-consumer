import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgApexchartsModule } from 'ng-apexcharts';


import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { HeaderComponent } from './header/header.component';
import {DataTablesModule} from 'angular-datatables';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';


import { LoginComponent } from './security/login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AuthenticationGuard } from './security/guards/authentication.guard';
import { TokenInterceptorProvider } from './security/interceptor/token.interceptor';
import { AccountManagerComponent } from './security/account-manager/account-manager.component';
import { UdpateUserComponent } from './security/update-account/udpate-user/udpate-user.component';
import { RoleToUserComponent } from './security/update-account/role-to-user/role-to-user.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { UpdateRoleComponent } from './security/update-account/update-role/update-role.component';

registerLocaleData(localeFr,'fr');




const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', component: LoginComponent},
  { path:'security', component:AdminTemplateComponent, canActivate:[AuthenticationGuard], 
    children:[
      { path: 'account', component: AccountManagerComponent},
      { path: 'account/update/:userName/:id', component: UdpateUserComponent},
      { path: 'account/update/role/:roleName/:id', component: UpdateRoleComponent},
      { path: 'account/role/:idUser', component: RoleToUserComponent},
    
  ]}
 
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    SidebarComponent,
    HeaderComponent,
    LoginComponent,
    AdminTemplateComponent,
    AccountManagerComponent,
    UdpateUserComponent,
    RoleToUserComponent,
    UpdateRoleComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    DataTablesModule,
    NgApexchartsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatDividerModule,
    MatMenuModule,
    MatExpansionModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule

  ],
  providers: [
  AuthenticationService,
  TokenInterceptorProvider,
  {provide:LOCALE_ID, useValue:"fr-FR"}
],

  bootstrap: [AppComponent]
})
export class AppModule { }
