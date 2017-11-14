test(
  'FlattenTest',

  [
    'ephox.katamari.api.Arr',
    'ephox.wrap-jsverify.Jsc'
  ],

  function (Arr, Jsc) {
    var check = function (expected, input) {
      assert.eq(expected, Arr.flatten(input));
    };

    check([], []);
    check([1], [[1]]);
    check([1, 2], [[1], [2]]);
    check([1, 2, 3, 4, 5], [[1, 2], [], [3], [4, 5], []]);

    var checkError = function (input) {
      var message = undefined;
      try {
        Arr.flatten(input);
      } catch (e) {
        message = e.message ? e.message : e;
      }

      if (message === undefined) {
        assert.fail('Arr.flatten did not throw an error for input ' + input);
      }
    };

    checkError([{}]);
    checkError([function () {}]);
    checkError([42]);

    Jsc.property(
      'Flatten is symmetric with chunking',
      Jsc.array(Jsc.json),
      Jsc.integer(1, 5),
      function (arr, chunkSize) {
        var chunks = Arr.chunk(arr, chunkSize);
        var bound = Arr.flatten(chunks);
        return Jsc.eq(arr, bound);
      }
    );

    Jsc.property('Wrap then flatten array is identity', '[json]', function(arr) {
      return Jsc.eq(
        Arr.flatten(Arr.pure(arr)),
        arr
      );
    });

    Jsc.property('Mapping pure then flattening array is identity', '[json]', function(arr) {
      return Jsc.eq(
        Arr.flatten(Arr.map(arr, Arr.pure)),
        arr
      );
    });

    Jsc.property('Flattening two lists === concat', '[json]', '[json]', function(xs, ys) {
      return Jsc.eq(
        Arr.flatten([xs, ys]),
        xs.concat(ys)
      );
    });

  }
);