import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | index');

const styleString = 'touch-action: manipulation; -ms-touch-action: manipulation; cursor: pointer;';

test('visiting /index, ensures we hooked everything up appropriately', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    const linkComponent = find('#indexLink').get(0).getAttribute('style');
    const clickComponent = find('#clickComponent').get(0).getAttribute('style');
    const nativeLink = find('#nativeLink').get(0).getAttribute('style');
    const multiAttrBound = find('#attr-binding-clickable-card').get(0).getAttribute('style');

    assert.equal(linkComponent, styleString, `Actual Link Style: ${linkComponent}`);
    assert.equal(clickComponent, styleString, `Actual Click Component Style: ${clickComponent}`);
    assert.equal(nativeLink, styleString, `Actual Anchor Style: ${nativeLink}`);
    assert.equal(multiAttrBound, styleString, `Actual Multi Attr Bound Box Style: ${multiAttrBound}`);
  });
});

test('Components attributeBindings property properly concatenates after mixing in touch action mixin to prototype chain', function(assert) {
  const touchBox = () => find('#attr-binding-clickable-card');
  const touchBoxEl = () => touchBox().get(0);
  const actualStyleAttr = () => touchBoxEl().getAttribute('style');
  const actualTitleAttr = () => touchBoxEl().getAttribute('title');

  visit('/');
  andThen(function() {
    assert.equal(actualStyleAttr(), styleString, `Touch action style IS initially set: ${actualStyleAttr()}`)
    assert.equal(actualTitleAttr(), null, `No title is initially set: ${actualTitleAttr()}`)
    click(touchBoxEl());
  });

  andThen(function() {
    assert.equal(actualTitleAttr(), 'wow its odd today', `Clicking/touching the box mutates the, dependent key for computing the bound title attr: ${actualTitleAttr()}`)
    assert.equal(actualStyleAttr(), styleString, `Touch action style remains the same: ${actualStyleAttr()}`)
    click(touchBoxEl());
  });

  andThen(function() {
    assert.equal(actualTitleAttr(), 'now its odd im saying its even today', `Continuing to touch/click the box toggles the value of the bound title attribute: ${actualTitleAttr()}`)
    assert.equal(actualStyleAttr(), styleString, `Touch action style remains the same: ${actualStyleAttr()}`)
  });
});

// TODO: this works when correctly setting up bound computed property in users app
// and can easily be abstracted to allow the same but in less cumbersome way
//
// test case: toggle the background color blue when tapping a box setup with touch-action: manipulation
// test('Style property originally bound to touchActionStyle computed property in its mixin can be extended by downstream components');
