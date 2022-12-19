import { html, fixture, expect } from '@open-wc/testing';
import Sinon from 'sinon';
import '../src/header/Header.js';

describe('loan-header', () => {
  // Write test cases inside this block

  let el;

  before(async () => {
    el = await fixture(html`<loan-header></loan-header>`);
  });

  it('Should access loan-header component', () => {
    expect(el).to.be.accessible();
  });

  it('Should call localeChanged on button click', async () => {
    const btn = el.shadowRoot.querySelectorAll('button');
    const spy = Sinon.spy(el, 'localeChanged');
    new Promise(() => {
      btn[1].click();
    }).then(() => {
      el.updateComplete;
    }).then(() => {
      expect(spy.callCount).to.equal(1);
    });

    new Promise(() => {
      btn[0].click();
    }).then(() => {
      el.updateComplete;
    }).then(() => {
      expect(spy.callCount).to.equal(2);
    });
  });
});
