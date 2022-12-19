import { html, fixture, expect } from '@open-wc/testing';
import Sinon from 'sinon';
import '../src/LoanEMIDetails/LoanEMIDetails.js';

const data = {
  interestRate: 0,
  monthlyEMI: 0,
  principal: 0,
  interest: 0,
  totalAmount: 0,
}

describe('Loan EMI details', () => {
  // Write test cases inside this block

  let el;
  before(async () => {
    localStorage.setItem('emi', JSON.stringify(data));
    el = await fixture(html`<loanemi-details></loanemi-details>`);
  });

  it('should access loanemi-details component', async () => {
    expect(el).to.exist;
  });

  it('Should Route to basic details component', () => {
    const btn = el.shadowRoot.querySelectorAll('lion-button');
    const spy = Sinon.spy(el, '_toBasicDetails');
    new Promise(() => {
      btn[0].click();
    }).then(() => {
      el.updateComplete;
    }).then(() => {
      expect(spy.callCount).to.equal(1);
    });
  });

  it('Should Route to customer component', async () => {
    const spy = Sinon.spy(el, '_toCustomer');
    const btn = el.shadowRoot.querySelectorAll('lion-button');
    new Promise(() => {
      btn[1].click();
    }).then(() => {
      el.updateComplete;
    }).then(() => {
      expect(spy.callCount).to.equal(1);
    });
  });
});
