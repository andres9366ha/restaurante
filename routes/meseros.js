var express = require('express');
var router = express.Router();
var models = require('../models');

var buscarMesero = function(req) {
  return {where: {username: req.body.username}};
}

function verificarRuta (req, res) {
 if(req.session.usuario){
   return;
 }
   res.render('usuarios/login');
}

var criteria = function(req) {
  return {where: {id: req.params.id}};
}

router.get('/new', function (req, res, next) {
  verificarRuta(req, res);
  res.render('meseros/new');
  });

  router.get('/', function(req, res, next) {
    verificarRuta(req, res);
    res.format({
      json: function () {
        models.meseros.findAll().then(meseros => {
          res.json({meseros: meseros});
        });
      },
      html: function () {
        models.meseros.findAll().then(meseros => {
          res.render('meseros/index', { meseros: meseros });
        });
      }
    });
  });

  router.get('/:id', function(req, res, next) {
  verificarRuta(req, res);
  var mesero = models.meseros.findOne(criteria(req));
  res.format({
    json: function() {
      mesero.then(mesero => {
        res.json(mesero);
      });
    },
    html: function() {
      mesero.then(mesero => {
        res.render('meseros/edit', { mesero: mesero });
      });
    }
  });
});


router.post('/', function(req, res, next) {
  verificarRuta(req, res);
  var meseroE = models.meseros.findOne(buscarMesero(req));
  meseroE.then(meseroE => {
    if (!meseroE) {
        var mesero = models.meseros.create(req.body);
        res.format({
          json: function () {
            mesero.then(mesero => {
              res.json(mesero);
            });
          },
          html: function() {
              mesero.then(() => {
                  res.render('meseros/new', { message: 'MESERO REGISTRADO CON EXITO' });
                });
          }
        });
    }else {
      res.render('meseros/new', { message: 'EL USERNAME DEL MESERO YA EXISTE' });
    }
  });
});

router.delete('/:id', function(req, res, next) {
  verificarRuta(req, res);
  var destroy = models.meseros.destroy(criteria(req));
  res.format({
    json: function() {
      destroy.then(() => {
        res.json({status: 'Eliminado'});
      });
    },
    html: function() {
      destroy.then(() => {
        res.redirect('/meseros');
      });
    }
  });
});

router.put('/:id', function(req, res, next) {
  verificarRuta(req, res);
  res.format({
    json: function () {
      models.meseros.update(req.body, criteria(req)).then(mesero => {
        res.json(mesero);
      });
    },
    html: function () {
      models.meseros.update(req.body, criteria(req)).then(mesero => {
        res.redirect('/meseros');
      });
    }
  });
});

module.exports = router;
