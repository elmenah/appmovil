import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: '',
    redirectTo: 'comienzo',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  }
  ,
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  
  
  {
    path: 'comienzo',
    loadChildren: () => import('./comienzo/comienzo.module').then( m => m.ComienzoPageModule)
  },
  {
    path: 'instructivo1',
    loadChildren: () => import('./instructivo1/instructivo1.module').then( m => m.Instructivo1PageModule)
  },
  {
    path: 'instructivo2',
    loadChildren: () => import('./instructivo2/instructivo2.module').then( m => m.Instructivo2PageModule)
  },
  {
    path: 'instructivo3',
    loadChildren: () => import('./instructivo3/instructivo3.module').then( m => m.Instructivo3PageModule)
  },
  {
    path: 'categoriacerveza',
    loadChildren: () => import('./categoriacerveza/categoriacerveza.module').then( m => m.CategoriacervezaPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./error/error.module').then( m => m.ErrorPageModule)//Pagina error siempre va al ultimo
  },
  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
