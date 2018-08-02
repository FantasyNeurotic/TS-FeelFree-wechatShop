'use strict';
module.exports = () => {
  return async function(ctx, next) {
    if (ctx.isAuthenticated()) {
      await next();
    } else {
      await ctx.redirect('/user/signin');
    }
  };
};
