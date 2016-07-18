<?php

namespace Pms\Middleware;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use Pms\Entities\User;
use Pms\Entities\UserSessionManager;

class AuthenticateMiddleware {
  protected $container;

  public function __construct($container){
    $this->container = $container; // store the instance as a property
  }

  public function redirectNonLogin($request, $response, $next){

    $user = UserSessionManager::getUser();

    if($user->id == -1 ){
      //if not logged in redirect to login
      $uri = $this->container->get('router')->pathFor('loginPage');
      return $response->withRedirect($uri);
    }

    //if user is logged in then proceed as usual
    return $next($request, $response);
  }


  public function redirectDashboard($request, $response, $next){

    
    $user = UserSessionManager::getUser();

    if($user->id == -1){
      //if user is not logged in proceed as usual
      return $next($request, $response);
    }else if($user->type == 'S' ||
             $user->type == 'D'){
      $uri = $this->container->get('router')->pathFor('dashboardHome');
      return $response->withRedirect($uri);
    }else if($user->type == 'A'){
      $uri = $this->container->get('router')->pathFor('adminDashboard');
      return $response->withRedirect($uri);
    }

      return $next($request, $response);



  }

}
