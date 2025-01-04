export class SalarySystem {
    static instance;

    constructor() {
        if (SalarySystem.instance) {
            return SalarySystem.instance;
        }

        this.salaryRates = {
            1: 25,
            2: 35,
            3: 45,
            4: 55,
        };
        this.playerSalaryTier = 1;
        this.totalEarnings = 0;

        SalarySystem.instance = this;
    }

    update(hoursPassed) {
        const rate = this.salaryRates[this.playerSalaryTier] || 0;
        this.totalEarnings += rate * hoursPassed;
    }

    setSalaryTier(tier) {
        if (this.salaryRates[tier]) {
            this.playerSalaryTier = tier;
        }
    }

    getEarnings() {
        return this.totalEarnings.toFixed(2);
    }

    debug() {
        console.log(`Current Salary Tier: ${this.playerSalaryTier}`);
        console.log(`Current Earnings: $${this.getEarnings()}`);
    }
}
