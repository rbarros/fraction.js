(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */
 
  module('Fraction', {
    setup: function() {
      this.elems = $('#qunit-fixture').children();
      this.fraction = new Fraction();
    }
  });

  test('instance', function() {
    expect(1);
    ok(this.fraction, 'instance');
  })

  module('Conversão de inteiro para fração');

  test('"Inteiro 1 = 1/1"', function(){
    expect(1);
    deepEqual(new Fraction(1).fraction, "1/1");
  });

  test('"Inteiro 2 = 2/1"', function(){
    expect(1);
    deepEqual(new Fraction(2).fraction, "2/1");
  });

  test('"Inteiro 15 = 15/1"', function(){
    expect(1);
    deepEqual(new Fraction(15).fraction, "15/1");
  });

  test('"Inteiro 20 = 20/1"', function(){
    expect(1);
    deepEqual(new Fraction(20).fraction, "20/1");
  });

  test('"Inteiro 500 = 500/1"', function(){
    expect(1);
    deepEqual(new Fraction(500).fraction, "500/1");
  });

  module('Conversão de 1 casa  para fração');

  test('"Inteiro 0.5 = 1/2"', function(){
    expect(1);
    deepEqual(new Fraction(0.5).fraction, "1/2");
  });

  test('"Inteiro 0.6 = 3/5"', function(){
    expect(1);
    deepEqual(new Fraction(0.6).fraction, "3/5");
  });

  test('"Inteiro 1.2 = 6/5"', function(){
    expect(1);
    deepEqual(new Fraction(1.2).fraction, "6/5");
  });

  test('"Inteiro 0.2 = 1/5"', function(){
    expect(1);
    deepEqual(new Fraction(0.2).fraction, "1/5");
  });

  test('"Inteiro 1.5 = 3/2"', function(){
    expect(1);
    deepEqual(new Fraction(1.5).fraction, "3/2");
  });

  test('"Inteiro 12.5 = 25/2"', function(){
    expect(1);
    deepEqual(new Fraction(12.5).fraction, "25/2");
  });

  module('Conversão de 2 casa  para fração');

  test('"Inteiro 0.08 = 2/25"', function(){
    expect(1);
    deepEqual(new Fraction(0.08).fraction, "2/25");
  });

  test('"Inteiro 0.17 = 17/100"', function(){
    expect(1);
    deepEqual(new Fraction(0.17).fraction, "17/100");
  });

  test('"Inteiro 0.25 = 1/4"', function(){
    expect(1);
    deepEqual(new Fraction(0.25).fraction, "1/4");
  });

  test('"Inteiro 0.33 = 33/100"', function(){
    expect(1);
    deepEqual(new Fraction(0.33).fraction, "33/100");
  });

  test('"Inteiro 0.75 = 3/4"', function(){
    expect(1);
    deepEqual(new Fraction(0.75).fraction, "3/4");
  });

  module('Conversão de 3 casa para fração');

  test('"Inteiro 0.175 = 7/40"', function(){
    expect(1);
    deepEqual(new Fraction(0.175).fraction, "7/40");
  });

  test('"Inteiro 0.200 = 1/5"', function(){
    expect(1);
    deepEqual(new Fraction(0.200).fraction, "1/5");
  });

  test('"Inteiro 0.125 = 1/8"', function(){
    expect(1);
    deepEqual(new Fraction(0.125).fraction, "1/8");
  });

  module('Conversão de dizima periódica composta');

  test('"Inteiro 0.666666666 = 2/3"', function(){
    expect(1);
    deepEqual(new Fraction(0.666666666).fraction, "2/3");
  });

  test('"Inteiro 0.333333333 = 1/3"', function(){
    expect(1);
    deepEqual(new Fraction(0.333333333).fraction, "1/3");
  });

  module('Conversão de dizima periódica composta');

  test('"Inteiro 0.166666666 = 1/6"', function(){
    expect(1);
    deepEqual(new Fraction(0.166666666).fraction, "1/6");
  });

  test('"Inteiro 0.022222222 = 1/45"', function(){
    expect(1);
    deepEqual(new Fraction(0.022222222).fraction, "1/45");
  });

  test('"Inteiro 0.125252525 = 62/495"', function(){
    expect(1);
    deepEqual(new Fraction(0.125252525).fraction, "62/495");
  });

  test('"Inteiro 0.047777777 = 62/495"', function(){
    expect(1);
    deepEqual(new Fraction(0.047777777).fraction, "43/900");
  });

  test('"Inteiro 0.012345679 = 1/81"', function(){
    expect(1);
    deepEqual(new Fraction(0.012345679).fraction, "1/81");
  });

  test('"Inteiro 0.225252525 = 223/990"', function(){
    expect(1);
    deepEqual(new Fraction(0.225252525).fraction, "223/990");
  });

  test('"Inteiro 0.101230123 = 10122/99990"', function(){
    expect(1);
    deepEqual(new Fraction(0.101230123).fraction, "10122/99990");
  });

}(jQuery));
