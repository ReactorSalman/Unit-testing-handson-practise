import { html, fixture, expect } from '@open-wc/testing';

import '../loan-application.js';

describe('LoanApplication', () => {
  // Write test cases inside this block
  let el;

  before(async () => {
    el = await fixture(html`<loan-application></loan-application>`);
  });

  it('Should access loan-application  component', async () => {
    expect(el).to.have.be.accessible();
  });

  it('Should increment counter', () => {
    const count = el.counter;
    el.__increment();
    expect(el.counter).to.equal(count + 1);
  });
});
