export default class TimeSystem {
    constructor(startDate = new Date()) {
        this.currentDate = new Date(startDate);
        this.elapsedTime = 0; // In real seconds
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