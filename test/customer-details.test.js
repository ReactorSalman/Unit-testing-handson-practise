import { html, fixture, expect } from '@open-wc/testing';
import Sinon from 'sinon';
import '../src/Customer/Customer-details.js';

describe('customer details', () => {
  // Write test cases inside this block

  let el;

  beforeEach(async () => {
    el = await fixture(html`<customer-details></customer-details>`);
  });

  it('Should access customer-details component', async () => {
    expect(el).to.have.be.accessible();
  });

  it('Should handle submit lion-form', async () => {
    const form = el.shadowRoot.querySelector('lion-form');
    new Promise(() => {
      form.dispatchEvent(new CustomEvent('submit'), { composed: true });
    }).then(() => {
      el.updateComplete;
    }).then(() => {
      expect(form).to.exist;
    });
  });

  it('Should route to emi details component on button click', async () => {
    const spy = Sinon.spy(el, '_toEmidetails');
    const btn = el.shadowRoot.querySelectorAll('lion-button')[0];
    new Promise(() => {
      btn.click();
    }).then(() => {
      el.updateComplete;
    }).then(() => {
      expect(spy.callCount).to.equal(1);
    });
  });

});