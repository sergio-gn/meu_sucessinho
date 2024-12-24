export default class SalarySystem {
    constructor() {
        this.salaryRates = {
            1: 25, // Salary tier 1: $25/hour
            2: 35, // Salary tier 2: $35/hour
            // Add more tiers as needed
        };
        this.playerSalaryTier = 1; // Default salary tier
        this.totalEarnings = 0; // Accumulated earnings
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
}