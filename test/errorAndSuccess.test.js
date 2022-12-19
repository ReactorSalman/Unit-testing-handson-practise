import { html, fixture, expect } from '@open-wc/testing';
import Sinon, { stub } from 'sinon';
import { Router } from '@vaadin/router';
import '../src/SuccessAndError/Success.js';
import '../src/SuccessAndError/Error.js';

describe('Success screen ', () => {
  // Write test cases inside this block

  let el;
  before( async() => {
    el = await fixture(html `<loan-success><loan-success>`);
  });

  it('Should access loan-error component', () => {
    expect(el).to.be.accessible();
  });

  it('Should route to home component', async () => {
    const spy = Sinon.spy(Router, 'go');
    el._toHome();
    expect(spy).to.have.called;
    expect(spy.firstCall.args[0]).to.equal('/')
    spy.restore();
  });
});

describe('error screen', () => {
  // Write test cases inside this block
  let el;
  before( async() => {
    el = await fixture(html`<loan-error></loan-error>`);
  });

  it('Should access loan-error component', async () => {
    expect(el).to.have.be.accessible();
  });
  
  it('Should route to home component', async () => {
    const spy = Sinon.spy(Router, 'go');
    el._toHome();
    expect(spy).to.have.called;
    expect(spy.firstCall.args[0]).to.equal('/')
    spy.restore();
  });
});
