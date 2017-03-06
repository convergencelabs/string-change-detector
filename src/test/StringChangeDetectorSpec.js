'use strict';

const StringChangeDetector = require('../../build/lib/index');

const should = require('should');

describe('StringChangeDetector', function () {

  it('correctly call onInsert when characters are inserted', function () {
    let called = false;

    const detector = new StringChangeDetector({
      value: "Hello World",
      onInsert: function(index, value) {
        index.should.equal(11);
        value.should.equal("!");
        called = true;
      }, onRemove: function(index, length) {
        throw new Error("onRemove was called.");
      }
    });

    detector.processNewValue("Hello World!");
    called.should.equal(true);
  });

  it('correctly call onRemove when characters are removed', function () {
    let called = false;

    const detector = new StringChangeDetector({
      value: "Hello World",
      onInsert: function(index, value) {
        throw new Error("onInsert was called.");
      }, onRemove: function(index, length) {
        index.should.equal(5);
        length.should.equal(6);
        called = true;
      }
    });

    detector.processNewValue("Hello");
    called.should.equal(true);
  });

  it('correctly call onRemove and onInsert when characters are replaced', function () {
    let removeCalled = false;
    let insertCalled = false;

    const detector = new StringChangeDetector({
      value: "Hello World",
      onInsert: function(index, value) {
        index.should.equal(6);
        value.should.equal("Jim");
        removeCalled.should.equal(true);
        insertCalled = true;
      }, onRemove: function(index, length) {
        index.should.equal(6);
        length.should.equal(5);
        removeCalled = true;
        insertCalled.should.equal(false);
      }
    });

    detector.processNewValue("Hello Jim");
    removeCalled.should.equal(true);
    insertCalled.should.equal(true);
  });

  it('throw an error if options is not defined', function () {
    (function () {
      new StringChangeDetector();
    }).should.throw();
  });

  it('throw an error if options.value is not defined', function () {
    (function () {
      new StringChangeDetector({
        onInsert: function() {},
        onRemove: function() {},
      });
    }).should.throw();
  });

  it('throw an error if options.value is not a string', function () {
    (function () {
      new StringChangeDetector({
        value: 1,
        onInsert: function() {},
        onRemove: function() {},
      });
    }).should.throw();
  });

  it('throw an error if options.onInsert is not defined', function () {
    (function () {
      new StringChangeDetector({
        value: "",
        onRemove: function() {},
      });
    }).should.throw();
  });

  it('throw an error if options.onInsert is not a function', function () {
    (function () {
      new StringChangeDetector({
        value: "",
        onInsert: true,
        onRemove: function() {},
      });
    }).should.throw();
  });

  it('throw an error if options.onRemove is not defined', function () {
    (function () {
      new StringChangeDetector({
        value: "",
        onInsert: function() {},
      });
    }).should.throw();
  });

  it('throw an error if options.onRemove is not a function', function () {
    (function () {
      new StringChangeDetector({
        value: "",
        onInsert: function() {},
        onRemove: true
      });
    }).should.throw();
  });

  it('setValue sets the value', function () {
    const detector = new StringChangeDetector({
      value: "",
      onInsert: function() {},
      onRemove: function() {}
    });
    detector.setValue("test");
    detector.getValue().should.equal("test");
  });

  it('insertText should properly insert text', function () {
    const detector = new StringChangeDetector({
      value: "1234",
      onInsert: function() {},
      onRemove: function() {}
    });
    detector.insertText(2, "test");
    detector.getValue().should.equal("12test34");
  });

  it('removeText should properly remove text', function () {
    const detector = new StringChangeDetector({
      value: "123456",
      onInsert: function() {},
      onRemove: function() {}
    });
    detector.removeText(2, 3);
    detector.getValue().should.equal("126");
  });
});
