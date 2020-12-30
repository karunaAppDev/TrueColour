import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './login/auth.guard';

const routes: Routes = [
  
  { path: '',            loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule) },
  {path: 'login-with-phone', loadChildren: () => import('./login/login-routing.module').then( m => m.LoginPageRoutingModule) },
  {path: 'home',         loadChildren: () => import('./home/home.module').then( m => m.HomePageModule) },
  {path: 'want-to-know', loadChildren: () => import('./want-to-know/want-to-know.module').then( m => m.WantToKnowPageModule),canLoad: [AuthGuard]},
  {path: 'want-to-tell', loadChildren: () => import('./want-to-tell/want-to-tell.module').then( m => m.WantToTellPageModule),canLoad: [AuthGuard]},
  {path: 'userdetails',  loadChildren: () => import('./userdetails/userdetails.module').then( m => m.UserdetailsPageModule) },
  {path: 'comment',      loadChildren: () => import('./comment/comment.module').then( m => m.CommentPageModule)},
  { path: 'termsandcondition',loadChildren: () => import('./termsandcondition/termsandcondition.module').then( m => m.TermsandconditionPageModule)},
  {path: 'privacypolicy',loadChildren: () => import('./privacypolicy/privacypolicy.module').then( m => m.PrivacypolicyPageModule)},
  {path: 'logout', loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)},
  {path: 'profile',loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)},
  {path: 'creator-profile',loadChildren: () => import('./creator-profile/creator-profile.module').then( m => m.CreatorProfilePageModule)},
  {path: 'show-profile',loadChildren: () => import('./show-profile/show-profile.module').then( m => m.ShowProfilePageModule)},
  {path: 'new-user-policy',loadChildren: () => import('./new-user-policy/new-user-policy.module').then( m => m.NewUserPolicyPageModule)},
  {path: 'new-user-tc',loadChildren: () => import('./new-user-tc/new-user-tc.module').then( m => m.NewUserTCPageModule)},
  {path: 'feedback',loadChildren: () => import('./feedback/feedback.module').then( m => m.FeedbackPageModule)}
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
