import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'e-bibo', loadChildren: './operator-page/e-bibo/e-bibo.module#EbiboPageModule' },
  { path: 'e-application', loadChildren: './operator-page/e-application/e-application.module#EApplicationPageModule' },
  { path: 'e-parade-state', loadChildren: './e-parade-state/e-parade-state.module#EParadeStatePageModule' },
  { path: 'e-ration', loadChildren: './e-ration/e-ration.module#ERationPageModule' },
  // tslint:disable-next-line:max-line-length
  { path: 'commander-e-application', loadChildren: './commander-page/commander-e-application/commander-e-application.module#CommanderEApplicationPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
