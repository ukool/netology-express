const error404 = ((req, res) => {
  res.render('errors/404', {
    title: '404',
  });
});

module.exports = {
  error404,
};
