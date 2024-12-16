export namespace Finance {
  export class LoanCalculator {
    static calculateMonthlyPayment(
      principal: number,
      rate: number,
      term: number
    ): number {
      const monthlyRate = rate / 12 / 100;
      return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
    }
  }

  export class TaxCalculator {
    static calculateIncomeTax(income: number, taxRate: number): number {
      return income * (taxRate / 100);
    }
  }
}
