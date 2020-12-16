module.exports = (collection) => {
  const pgCap = collection.slice(0,1).toUpperCase() + collection.slice(1);
  return `var ${pgCap}Model = require('./../models/${collection}Model');

module.exports = {
  create: function(req, res){
    var ${collection} = new ${pgCap}Model(req.body);
    ${collection}.save(function(err, result){
      if(err){
        res.send(err);
      } else {
        res.send(result);
      }
    });
  },
  read: function(req, res){
    ${pgCap}Model
    .find(req.query)
    .exec(function(err, result){
      if(err){
        res.send(err);
      } else {
        res.send(result);
      }
    });
  },
  readOne: function(req, res){
    ${pgCap}Model
    .findById(req.params.id)
    .exec(function(err, result){
      if(err){
        res.send(err);
      } else {
        res.send(result);
      }
    });
  },
  update: function(req, res){
    ${pgCap}Model.findByIdAndUpdate(req.params.id, req.body, function(err, result){
      if(err){
        res.send(err);
      } else {
        res.send(result);
      }
    });
  },
  destroy: function(req, res){
    ${pgCap}Model.findByIdAndRemove(req.params.id, req.body, function(err, result){
      if(err){
        res.send(err);
      } else {
        res.send(result);
      }
    });
  }
};
`;
}
