<template>
<div>
  home
  <router-link :to="{ path: '/auth', query: { action: 'login' }}">Login</router-link>
  <router-link :to="{ path: '/auth', query: { action: 'register' }}">Register</router-link>
</div>
</template>