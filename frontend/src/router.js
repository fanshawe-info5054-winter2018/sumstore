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
          path: '/gamedetails',
          component: require('./view/mainpage/gamedetails.vue').default,
          props: true,
          meta: {
            title: 'SumStore: Game Details',
          }
        },
        {
          path: '/user/cart',
          component: require('./view/user/cart.vue').default,
          meta: {
            title: 'Cart',
          }
        },
        {
          path: '/user/checkout',
          component: require('./view/user/checkout.vue').default,
          meta: {
            title: 'Checkout',
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
        {
          path: '/user/orderdetails',
          component: require('./view/user/orderdetails.vue').default,
          meta: {
            title: 'Order Details',
            requiresAuth: true,
          }
        },
        {
          path: '/user/returnitems',
          component: require('./view/user/returnitems.vue').default,
          meta: {
            title: 'Return an Item',
            requiresAuth: true,
          }
        },
        {
            path: '/user/preferences',
            component: require('./view/user/preferences.vue').default,
            meta: {
                title: 'User Preferences',
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