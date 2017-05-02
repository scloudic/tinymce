define(
  'ephox.alloy.api.behaviour.Representing',

  [
    'ephox.alloy.api.behaviour.Behaviour',
    'ephox.alloy.behaviour.representing.ActiveRepresenting',
    'ephox.alloy.behaviour.representing.RepresentApis',
    'ephox.alloy.behaviour.representing.RepresentSchema',
    'ephox.alloy.behaviour.representing.RepresentState'
  ],

  function (Behaviour, ActiveRepresenting, RepresentApis, RepresentSchema, RepresentState) {
    // The self-reference is clumsy.
    var self = Behaviour.create({
      fields: RepresentSchema,
      name: 'representing',
      active: ActiveRepresenting,
      apis: RepresentApis,
      extra: {
        setValueFrom: function (component, source) {
          var value = self.getValue(source);
          self.setValue(component, value);
        }
      },
      state: RepresentState
    });

    return self;
  }
);