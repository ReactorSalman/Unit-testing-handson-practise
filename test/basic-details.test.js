import { html, fixture, expect } from '@open-wc/testing';
import Sinon from 'sinon';
import { Router } from '@vaadin/router';
import '../src/LoanBasicDetails/BasicDetails.js';

describe('Basic details', () => {
  // Write test cases inside this block
  // refer basic-details.js files

  let el;

  const jsonSuccess = (body) => {
    const response = new window.Response(JSON.stringify(body), {
      status: 200,
      headers: {
        'Content-type': 'application/json'
      }
    });
    return Promise.resolve(response);
  }

  beforeEach(async () => {
    const stubFetch = Sinon.stub(window, 'fetch');
    stubFetch.returns(jsonSuccess({
      "interestRate": '',
      "interest": '',
      "monthlyEMI": '',
      "principal": '',
      "totalAmount": '',
    }));

    const stubRouter = Sinon.stub(Router, 'go');
    stubRouter.returns(true);

    el = await fixture(html`<basic-details></basic-details>`);
  });

  afterEach(async () => {
    Sinon.restore();
  });

  it('Should access basic-details component', () => {
    expect(el).to.exist;
  });

  it('Should initilize properties', () => {
    expect(el.amount).to.equal(10000);
  });

  it('Should call _numToWord()', () => {
    const spy = Sinon.spy(el, '_numToWord');
    el._numToWord();
    el.shadowRoot.querySelector('.amount').value = 10000;
    expect(spy).to.have.called
    expect(el.shadowRoot.querySelector('#word').innerHTML.trim()).to.equal('ten thousand');
    spy.restore();
  });

  it('Should call _captureDetails(), to make post request', async () => {
    el.shadowRoot.querySelector('.type').value = 'Home Loan';
    const spy = Sinon.spy(el, '_captureDetails');
    const form = el.shadowRoot.querySelector('form');
    new Promise(() => {
      form.dispatchEvent(new CustomEvent('submit'), { composed: true });
    }).then(() => {
      form.updateComplete;
    }).then(() => {
      expect(spy.callCount).to.equal(1);
    });

  });

  it('Should call _captureDetails(), to e-handle when amount is less than 10000', () => {
    el.shadowRoot.querySelector('.type').value = 'Home Loan';
    el.shadowRoot.querySelector('.amount').value = '5,000';
    el.shadowRoot.querySelector('.period').value = '2';
    el._captureDetails();
    expect([...el.shadowRoot.querySelector('.amount').classList].indexOf('e-handle')).to.not.equal(-1);
  });

  it('Should route to dashboard on button click', async () => {
    const spy = Sinon.spy(el, '_toDashboard');
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