(function(angular) {
  'use strict';
angular.module('invoiceApp', ['financeApp'])
  .controller('InvoiceController', ['currencyConverter', function InvoiceController(currencyConverter) {
    this.qty = 1;
    this.cost = 2;
    this.inCurr = 'EUR';
    this.currencies = currencyConverter.currencies;

    this.total = function total(outCurr) {
      return currencyConverter.convert(this.qty * this.cost, this.inCurr, outCurr);
    };
    this.pay = function pay() {
      window.alert('Thanks!');
    };
  }]);
})(window.angular);