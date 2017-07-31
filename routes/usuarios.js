var express = require('express');
var router = express.Router();
var models = require('../models');

var login = function(req) {
  return {where: {username: req.body.username, password: req.body.password}};
}

 function verificarRuta (req, res) {
  if(req.session.usuario){
    return;
  }
    res.render('usuarios/login');
}

router.get('/login', function (req, res, next) {
  res.render('usuarios/login');
  });

  router.get('/index', function (req, res, next) {
    verificarRuta(req, res);
      res.render('usuarios/index');
    });

router.post('/', function(req, res, next) {
  var usuario = models.usuarios.findOne(login(req));
  res.format({
    json: function() {
      usuario.then(usuario => {
        res.json(usuario);
      });
    },
    html: function() {
      usuario.then(usuario => {
        if (usuario) {
          req.session.usuario=usuario.username;
            res.render('usuarios/index');
        }
        res.status(404);
          res.render('usuarios/login', { message: 'Cuenta invalida.Verifica tus datos' });
      });
    }
  });
});

// router.post('/', function(req, res, next) {
//   var usuario = models.usuarios.create(req.body);
//   res.format({
//     json: function () {
//       usuario.then(usuario => {
//         res.json(usuario);
//       });
//     },
//     html: function() {
//         usuario.then(() => {
//             res.render('usuarios/new');
//           });
//     }
//   });
// });
module.exports = router;
