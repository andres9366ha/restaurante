var express = require('express');
var router = express.Router();
var models = require('../models');

var buscarPlatillo = function(req) {
  return {where: {name: req.body.name}};
}

var criteria = function(req) {
  return {where: {id: req.params.id}};
}

function verificarRuta (req, res) {
 if(req.session.usuario){
   return;
 }
   res.render('usuarios/login');
}

router.get('/new', function (req, res, next) {
  verificarRuta(req, res);
  res.render('platillos/new');
  });


  router.get('/', function(req, res, next) {
    verificarRuta(req, res);
    res.format({
      json: function () {
        models.platillos.findAll().then(platillos => {
          res.json({platillos: platillos});
        });
      },
      html: function () {
        models.platillos.findAll().then(platillos => {
          res.render('platillos/index', { platillos: platillos });
        });
      }
    });
  });

  router.get('/:id', function(req, res, next) {
  verificarRuta(req, res);
  var platillo = models.platillos.findOne(criteria(req));
  res.format({
    json: function() {
      platillo.then(platillo => {
        res.json(platillo);
      });
    },
    html: function() {
      platillo.then(platillo => {
        res.render('platillos/edit', { platillo: platillo });
      });
    }
  });
});


router.post('/', function(req, res, next) {
  verificarRuta(req, res);
  var platilloE = models.platillos.findOne(buscarPlatillo(req));
  platilloE.then(platilloE => {
    if (!platilloE) {
        var platillo = models.platillos.create(req.body);
        res.format({
          json: function () {
            platillo.then(platillo => {
              res.json(platillo);
            });
          },
          html: function() {
              platillo.then(() => {
                  res.render('platillos/new', { message: 'PLATILLO REGISTRADO CON EXITO' });
                });
          }
        });
    }else {
      res.render('platillos/new', { message: 'EL NOMBRE DEL PLATILLO YA EXISTE' });
    }
  });
});

router.delete('/:id', function(req, res, next) {
  verificarRuta(req, res);
  var destroy = models.platillos.destroy(criteria(req));
  res.format({
    json: function() {
      destroy.then(() => {
        res.json({status: 'Eliminado'});
      });
    },
    html: function() {
      destroy.then(() => {
        res.redirect('/platillos');
      });
    }
  });
});

router.put('/:id', function(req, res, next) {
  verificarRuta(req, res);
  res.format({
    json: function () {
      models.platillos.update(req.body, criteria(req)).then(platillo => {
        res.json(platillo);
      });
    },
    html: function () {
      models.platillos.update(req.body, criteria(req)).then(platillo => {
        res.redirect('/platillos');
      });
    }
  });
});

module.exports = router;
