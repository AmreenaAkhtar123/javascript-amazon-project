import { formatCurrency } from "../../scripts/utlis/money.js";

describe('test suite: format Currency', () =>{
  it('convert cents into dollars:', ()=> {
    expect(formatCurrency(2095)).toEqual('20.95');
  });


  ///////2nd test///////////

  it('Work with zero', () =>{
    expect(formatCurrency(0)).toEqual('0.00');
  });

  /////3rd test////////////

  it('Rounds up to the nearest cent', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });

});


