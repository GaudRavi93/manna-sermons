import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  /*{
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },*/
  /*{
    path: '',
    data: { hideTabs: true },
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },*/
  {
    path: 'welcome',
    data: { hideTabs: true },
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'registration',
    data: { hideTabs: true },
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'churches',
    data: { hideTabs: true },
    loadChildren: () => import('./shared/components/churches/churches.module').then( m => m.ChurchesPageModule)
  },
  {
    path: 'login',
    data: { hideTabs: true },
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forgot',
    data: { hideTabs: true },
    loadChildren: () => import('./forgot/forgot.module').then( m => m.ForgotPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./shared/components/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'following',
    loadChildren: () => import('./following/following.module').then( m => m.FollowingPageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./favorites/favorites.module').then( m => m.FavoritesPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'topics',
    loadChildren: () => import('./topics/topics.module').then( m => m.TopicsPageModule)
  },
  {
    path: 'pastors',
    loadChildren: () => import('./pastors/pastors.module').then( m => m.PastorsPageModule)
  },
  {
    path: 'church-detail',
    loadChildren: () => import('./church-detail/church-detail.module').then( m => m.ChurchDetailPageModule)
  },
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  {
    path: 'pastor-detail',
    loadChildren: () => import('./pastor-detail/pastor-detail.module').then( m => m.PastorDetailPageModule)
  },
  {
    path: 'sermons',
    loadChildren: () => import('./sermons/sermons.module').then( m => m.SermonsPageModule)
  },
  {
    path: 'sermon-detail',
    loadChildren: () => import('./sermon-detail/sermon-detail.module').then( m => m.SermonDetailPageModule)
  },
  {
    path: 'topic-detail',
    loadChildren: () => import('./topic-detail/topic-detail.module').then( m => m.TopicDetailPageModule)
  },
  {
    path: 'account-info',
    loadChildren: () => import('./settings/account-info/account-info.module').then( m => m.AccountInfoPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./settings/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'help-center',
    loadChildren: () => import('./settings/help-center/help-center.module').then( m => m.HelpCenterPageModule)
  },
  {
    path: 'subscription',
    loadChildren: () => import('./settings/subscription/subscription.module').then( m => m.SubscriptionPageModule)
  },
  {
    path: 'legal',
    loadChildren: () => import('./settings/legal/legal.module').then( m => m.LegalPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'subscribe',
    data: { hideTabs: true },
    loadChildren: () => import('./subscribe/subscribe.module').then( m => m.SubscribePageModule)
  },
  {
    path: 'disconnect',
    data: { hideTabs: true },
    loadChildren: () => import('./disconnect/disconnect.module').then( m => m.DisconnectPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
