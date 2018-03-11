import VueRouter from 'vue-router';


const router = new VueRouter({
  routes: [

    /******* Public Pages *******/
    {
      path: '/',
      component: require('./view/mainpage.vue').default,
      children: [
        {
          path: '/',
          component: require('./view/mainpage/home.vue').default,
          meta: {
            title: 'SumStore',
          }
        },
        {
          path: '/auth',
          component: require('./view/auth.vue').default,
          props: true,
          meta: {
            title: 'SumStore: Authentication',
            handlesAuth: true
          }
        },
        /******* Pages that require Authentication *******/
        {
          path: '/user/orders',
          component: require('./view/user/orders.vue').default,
          meta: {
            title: 'Orders',
            requiresAuth: true,
          }
        },
      ]
    },
    /******* Pages outside the main page *******/
    {
      path: '/admin',
      component: require('./view/admin.vue').default,
      props: true,
      meta: {
        title: 'SumStore: Admin',
        requiresAuth: true
      },
      children: [
        {
          path: '/',
          component: require('./view/admin/home.vue').default,
          meta: {
            title: 'SumStore: Admin',
          }
        },
        {
          path: 'game',
          component: require('./view/admin/game.vue').default,
          meta: {
            title: 'SumStore: Admin',
          }
        },
      ]
    }
  ]
});

/******* Router Guards *******/

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {
    let loggedUser = localStorage.getItem("user");

    if(to.fullPath.startsWith("/admin") && (!loggedUser || loggedUser.admin === null)){
      next({
        path: '/auth',
        query: {
          action:"login",
        },

      });
    }
    else if (loggedUser === null) {

      next({
        path: '/auth',
        query: {
          action:"login",
        },

      });
    }
     else {
      next();
    }

  } else if (to.matched.some(record => record.meta.handlesAuth)) {

    if (localStorage.getItem("user") !== null) {
      // next({
      //   path: '/user/orders',
      // });
      next();
    } else {
      next();
    }
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  document.title = to.meta.title;
});

export default router;