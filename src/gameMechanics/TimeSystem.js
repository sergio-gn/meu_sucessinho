export class TimeSystem {
    static instance;

    constructor(startDate = new Date()) {
        if (TimeSystem.instance) {
            return TimeSystem.instance;
        }

        this.currentDate = new Date(startDate);
        this.elapsedTime = 0; // In real seconds
        TimeSystem.instance = this;
    }

    update(delta) {
        this.elapsedTime += delta / 1000; // Convert delta to seconds

        // Calculate days passed
        const daysPassed = Math.floor(this.elapsedTime);
        this.elapsedTime %= 1; // Retain fractional seconds for smooth timekeeping

        // Update the date by adding days
        this.currentDate.setDate(this.currentDate.getDate() + daysPassed);
    }

    getCurrentTime() {
        return {
            day: this.currentDate.getDate(),
            month: new Intl.DateTimeFormat('en-US', { month: 'long' }).format(this.currentDate),
            year: this.currentDate.getFullYear(),
        };
    }
}
