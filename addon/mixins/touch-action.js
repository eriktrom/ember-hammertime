import Ember from 'ember';

const {
  computed,
  Mixin,
  String: { htmlSafe }
} = Ember;

export default Mixin.create({

  init() {
    this._super(...arguments);
    const tagName = this.get('tagName');
    const hasClick = !!this.get('click');
    const hasTag = (typeof tagName === 'string' && tagName.length > 0) || (tagName === null && hasClick);
    if (!hasTag) { return; }

    this.reopen({
      attributeBindings: ['touchActionStyle:style']
    });

    const isDefaultClickable = ['input', 'button', 'a', 'textarea'].indexOf(tagName) !== -1;
    const isInputClickable = tagName === 'input' && ['button', 'submit', 'text', 'file'].indexOf(this.get('type')) !== -1;
    if (hasClick || isDefaultClickable || isInputClickable) {
      this.set('_isApplyTouchActionStyle', true);
    }
  },

  touchActionStyle: computed({
    get() {
      const touchActionStyle = 'touch-action: manipulation; -ms-touch-action: manipulation; cursor: pointer;';
      let originalStyle = this.get('style');
      const _isApplyTouchActionStyle = this.get('_isApplyTouchActionStyle');

      if (!_isApplyTouchActionStyle) { return originalStyle; }

      if (!originalStyle || originalStyle.length === 0) {
        return htmlSafe(touchActionStyle);
      } else {
        return htmlSafe(originalStyle += ` ${touchActionStyle}`);
      }
    }
  }),
});
