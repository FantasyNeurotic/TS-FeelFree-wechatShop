'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const menu = middleware.menu();
  const auth = middleware.auth();
  const page = middleware.page();
  router.get('/', page, menu, controller.page.home.index);

  // **********用户 ***************
  // page
  router.get('/user/signin', controller.page.user.signin);
  router.get('/user/signup', controller.page.user.signup);


  router.get('/user/profile', page, menu, controller.page.user.profile);
  router.get('/user/:_id/profile', controller.page.user.showprofile);
  router.get('/user/topic', page, menu, controller.page.user.topic);
  router.get('/user/blog', page, menu, controller.page.user.blog);
  // api
  router.post('/user/signin', controller.api.user.signin);
  router.post('/user/signup', controller.api.user.signup);
  router.get('/user/signout', auth, controller.api.user.signout);
  router.get('/user/:_id', controller.api.user.basicInformation);
  router.get('/user', controller.api.user.detail);
  router.put('/user', controller.api.user.edit);
  router.get('/api/v1/user/topic', auth, controller.api.user.topic);
  router.get('/api/v1/user/blog', auth, controller.api.user.blog);
  router.post('/user/signin/qq', controller.api.user.qq);
  router.get('/user/signin/qq', controller.api.user.qq);


  // error
  router.get('/error500', controller.page.home.error500);


  //  ******* blog ********
  // page
  router.get('/blogs/create', page, menu, controller.page.blog.create);
  router.get('/blogs', page, menu, controller.page.blog.index);
  router.get('/blogs/:_id', page, menu, controller.page.blog.detail);
  // api
  router.post('/api/v1/blog', auth, controller.api.blog.create);
  router.delete('/api/v1/blog/:_id', auth, controller.api.blog.delete);
  router.put('/api/v1/blog/:_id', auth, controller.api.blog.edit);
  router.get('/api/v1/user/:id/blogs', controller.api.blog.list);
  router.get('/api/v1/blog', auth, controller.api.blog.list);
  router.get('/api/v1/blog/:_id', auth, controller.api.blog.one);
  router.get('/api/v1/blog/:_id', controller.api.blog.one);
  router.get('/api/v1/blog/:_id/reply', auth, controller.api.blog.blog_replies);
  router.post('/api/v1/blog/:_id/reply', auth, controller.api.blog.reply);
  router.post('/api/v1/blog/reply/:_id/star', auth, controller.api.blog.star);

  // ********************************* 论坛  ********************************
  // page
  router.get('/forums', page, menu, controller.page.forum.forums);
  router.get('/forums/:_id', page, menu, controller.page.forum.topics);
  router.get('/forums/:forum_id/topic/:topic_id', page, menu, controller.page.forum.topic);
  // api
  router.post('/api/v1/forum', auth, controller.api.forum.createForum);
  router.delete('/api/v1/forum/:_id', auth, controller.api.forum.deleteForum);
  router.put('/api/v1/forum/:_id', auth, controller.api.forum.editForum);
  router.get('/api/v1/forum', auth, controller.api.forum.forumList);
  router.get('/api/v1/forum/:_id', auth, controller.api.forum.oneForum);

  router.post('/api/v1/forum/:forum_id/topic', auth, controller.api.forum.createTopic);
  router.delete('/api/v1/forum/:forum_id/topic/:topic_id', auth, controller.api.forum.deleteTopic);
  router.put('/api/v1/forum/:forum_id/topic/:topic_id', auth, controller.api.forum.editTopic);
  router.get('/api/v1/forum/:forum_id/topic', auth, controller.api.forum.topicList);
  router.get('/api/v1/forum/:forum_id/topic/:topic_id', auth, controller.api.forum.oneTopic);

  router.post('/api/v1/forum/:forum_id/topic/:topic_id/post', auth, controller.api.forum.createPost);
  router.delete('/api/v1/forum/:forum_id/topic/:topic_id/post/:post_id', auth, controller.api.forum.deletePost);
  router.get('/api/v1/forum/:forum_id/topic/:topic_id/post', auth, controller.api.forum.postList);


  // 文件
  router.post('/api/v1/files', auth, controller.common.files.files);
};
