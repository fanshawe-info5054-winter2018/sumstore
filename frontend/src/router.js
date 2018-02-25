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
      ]
    },
    {
      path: '/auth',
      component: require('./view/auth.vue').default,
      props:true,
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
    }
  ]
});

/******* Router Guards *******/

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (localStorage.getItem("user") === null) {

      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        },

      });
    } else {
      next();
    }

  } else if (to.matched.some(record => record.meta.handlesAuth)) {

    if (localStorage.getItem("user") !== null) {
      next({
        path: '/user/orders',
      });

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