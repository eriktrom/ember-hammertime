import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

let expectedStyle = 'touch-action: manipulation; -ms-touch-action: manipulation;';

moduleForAcceptance('Acceptance | index');

test('should be able to visit / (sanity test)', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

test('it should add touch styles to {{link-to}} links', function(assert) {
  visit('/');

  andThen(function() {
    let actualStyle = find('#link-to').get(0).getAttribute('style');
    assert.equal(actualStyle, expectedStyle, `Actual Click Component Style: ${actualStyle}`);
  });
});

test('it should add touch styles to native links', function(assert) {
  visit('/');

  andThen(function() {
    let actualStyle = find('#native-link').get(0).getAttribute('style');
    assert.equal(actualStyle, expectedStyle, `Actual Native Link Style: ${actualStyle}`);
  });
});

test('it should add touch styles to components that have a click handler', function(assert) {
  visit('/');

  andThen(function() {
    let actualStyle = find('#click-component').get(0).getAttribute('style');
    assert.equal(actualStyle, expectedStyle, `Actual Click Component Style: ${actualStyle}`);
  });

});

test('it should NOT add touch styles to components when they DONT have a click handler', function(assert) {
  visit('/');

  andThen(function() {
    let subject = find('#default-component').get(0);
    let hasStyle = subject.hasAttribute('style');
    let actualStyle = subject.getAttribute('style');

    assert.strictEqual(hasStyle, false, `Should NOT have inline style. Actual Style: ${actualStyle}`);
  });
});

test("it should add touch styles to COMPONENTS that are focusable", function(assert) {
  visit('/');

  andThen(function() {
    let actualIndex = 0, expectedIndex = 3;
    ['select', 'button', 'textarea'].forEach(function(tag) {
      let subject = find(`#${tag}-component`).get(0);
      let hasStyle = subject.hasAttribute('style');
      let actualStyle = subject.getAttribute('style');

      assert.strictEqual(hasStyle, true, `${tag} should have inline style. Actual Style: ${actualStyle}`);
      actualIndex++;
    });

    assert.equal(actualIndex, expectedIndex, `should have tested all ${expectedIndex} focusable tags`);
  });

  andThen(function() {
    let actualIndex = 0, expectedIndex = 4;
    ['button', 'submit', 'text', 'file'].forEach(function(type) {
      let subject = find(`#input-${type}-component`).get(0);
      let hasStyle = subject.hasAttribute('style');
      let actualStyle = subject.getAttribute('style');

      assert.strictEqual(hasStyle, true, `input type=${type} should have inline style. Actual Style: ${actualStyle}`);
      actualIndex++;
    });

    assert.equal(actualIndex, expectedIndex, `should have tested all ${expectedIndex} focusable input type tags`);
  });
});

test('it should add touch styles to COMPONENTS w/ on-click attribute actions', function(assert) {
  visit('/');

  andThen(function() {
    let actualIndex = 0, expectedIndex = 3;
    ['select', 'button', 'textarea'].forEach(function(tag) {
      let subject = find(`#on-click-${tag}-component`).get(0);
      let hasStyle = subject.hasAttribute('style');
      let actualStyle = subject.getAttribute('style');

      assert.strictEqual(hasStyle, true, `${tag} should have inline style. Actual Style: ${actualStyle}`);
      actualIndex++;
    });

    assert.equal(actualIndex, expectedIndex, `should have tested all ${expectedIndex} focusable tags`);
  });

  andThen(function() {
    let actualIndex = 0, expectedIndex = 4;
    ['button', 'submit', 'text', 'file'].forEach(function(type) {
      let subject = find(`#on-click-input-${type}-component`).get(0);
      let hasStyle = subject.hasAttribute('style');
      let actualStyle = subject.getAttribute('style');

      assert.strictEqual(hasStyle, true, `input type=${type} should have inline style. Actual Style: ${actualStyle}`);
      actualIndex++;
    });

    assert.equal(actualIndex, expectedIndex, `should have tested all ${expectedIndex} focusable input type tags`);
  });
});

test('it should NOT add touch styles to COMPONENTS w/ on-mouseenter attribute actions', function(assert) {
  visit('/');

  andThen(function() {
    let actualIndex = 0, expectedIndex = 3;
    ['select', 'button', 'textarea'].forEach(function(tag) {
      let subject = find(`#on-mouseenter-${tag}-component`).get(0);
      let hasStyle = subject.hasAttribute('style');
      let actualStyle = subject.getAttribute('style');

      assert.strictEqual(hasStyle, false, `${tag} should NOT have inline style. Actual Style: ${actualStyle}`);
      actualIndex++;
    });

    assert.equal(actualIndex, expectedIndex, `should have tested all ${expectedIndex} focusable tags`);
  });

  andThen(function() {
    let actualIndex = 0, expectedIndex = 4;
    ['button', 'submit', 'text', 'file'].forEach(function(type) {
      let subject = find(`#on-mouseenter-input-${type}-component`).get(0);
      let hasStyle = subject.hasAttribute('style');
      let actualStyle = subject.getAttribute('style');

      assert.strictEqual(hasStyle, false, `input type=${type} should NOT have inline style. Actual Style: ${actualStyle}`);
      actualIndex++;
    });

    assert.equal(actualIndex, expectedIndex, `should have tested all ${expectedIndex} focusable input type tags`);
  });
});

test('it should add touch styles to NATIVE focusable elements', function(assert) {
  visit('/');

  andThen(function() {
    let actualIndex = 0, expectedIndex = 3;
    ['select', 'button', 'textarea'].forEach(function(tag) {
      let subject = find(`#${tag}-native`).get(0);
      let hasStyle = subject.hasAttribute('style');
      let actualStyle = subject.getAttribute('style');

      assert.strictEqual(hasStyle, true, `${tag} should have inline style. Actual Style: ${actualStyle}`);
      actualIndex++;
    });

    assert.equal(actualIndex, expectedIndex, `should have tested all ${expectedIndex} NATIVE focusable tags`);
  });

  andThen(function() {
    let actualIndex = 0, expectedIndex = 4;
    ['button', 'submit', 'text', 'file'].forEach(function(type) {
      let subject = find(`#input-${type}-native`).get(0);
      let hasStyle = subject.hasAttribute('style');
      let actualStyle = subject.getAttribute('style');

      assert.strictEqual(hasStyle, true, `input type=${type} should have inline style. Actual Style: ${actualStyle}`);
      actualIndex++;
    });

    assert.equal(actualIndex, expectedIndex, `should have tested all ${expectedIndex} NATIVE focusable input types`);
  });
});

test('it should add touch styles to NATIVE focusable elements with on=click action', function(assert) {
  visit('/');

  andThen(function() {
    let actualIndex = 0, expectedIndex = 3;
    ['select', 'button', 'textarea'].forEach(function(tag) {
      let subject = find(`#on-click-${tag}-native`).get(0);
      let hasStyle = subject.hasAttribute('style');
      let actualStyle = subject.getAttribute('style');

      assert.strictEqual(hasStyle, true, `${tag} should have inline style. Actual Style: ${actualStyle}`);
      actualIndex++;
    });

    assert.equal(actualIndex, expectedIndex, `should have tested all ${expectedIndex} NATIVE focusable tags`);
  });

  andThen(function() {
    let actualIndex = 0, expectedIndex = 4;
    ['button', 'submit', 'text', 'file'].forEach(function(type) {
      let subject = find(`#on-click-input-${type}-native`).get(0);
      let hasStyle = subject.hasAttribute('style');
      let actualStyle = subject.getAttribute('style');

      assert.strictEqual(hasStyle, true, `input type=${type} should have inline style. Actual Style: ${actualStyle}`);
      actualIndex++;
    });

    assert.equal(actualIndex, expectedIndex, `should have tested all ${expectedIndex} NATIVE focusable input types`);
  });
});

test('it should NOT add touch styles to NATIVE focusable elements with on=mouseEnter action', function(assert) {
  visit('/');

  andThen(function() {
    let actualIndex = 0, expectedIndex = 3;
    ['select', 'button', 'textarea'].forEach(function(tag) {
      let subject = find(`#on-mouseenter-${tag}-native`).get(0);
      let hasStyle = subject.hasAttribute('style');
      let actualStyle = subject.getAttribute('style');

      assert.strictEqual(hasStyle, false, `${tag} should have NOT inline style. Actual Style: ${actualStyle}`);
      actualIndex++;
    });

    assert.equal(actualIndex, expectedIndex, `should have tested all ${expectedIndex} NATIVE focusable tags`);
  });

  andThen(function() {
    let actualIndex = 0, expectedIndex = 4;
    ['button', 'submit', 'text', 'file'].forEach(function(type) {
      let subject = find(`#on-mouseenter-input-${type}-native`).get(0);
      let hasStyle = subject.hasAttribute('style');
      let actualStyle = subject.getAttribute('style');

      assert.strictEqual(hasStyle, false, `input type=${type} should have NOT inline style. Actual Style: ${actualStyle}`);
      actualIndex++;
    });

    assert.equal(actualIndex, expectedIndex, `should have tested all ${expectedIndex} NATIVE focusable input types`);
  });
});
