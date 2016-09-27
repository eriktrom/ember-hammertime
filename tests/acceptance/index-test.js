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

test('clicking the multi attribute bound box should properly prove title attribute is bound as well as touch action style attr', function(assert) {
  const touchBox = () => find('#attr-binding-clickable-card');
  const touchBoxEl = () => touchBox().get(0);
  const expectedTouchBoxStyle = () => touchBoxEl().getAttribute('style');
  const assertTouchActionStyle = () => {
    return assert.equal(expectedTouchBoxStyle(), styleString, `Actual Style: ${expectedTouchBoxStyle()}`);
  }

  visit('/');
  andThen(function() {
    assertTouchActionStyle();
    click(touchBoxEl());
  });

  andThen(function() {
    touchBox().text().indexOf('Evens') > -1;
    touchBox().text().indexOf('Odds') === -1;
    assertTouchActionStyle();
    click(touchBoxEl());
  });

  andThen(function() {
    touchBox().text().indexOf('Odds') > -1;
    touchBox().text().indexOf('Odds') === -1;
    assertTouchActionStyle();
  });

});
