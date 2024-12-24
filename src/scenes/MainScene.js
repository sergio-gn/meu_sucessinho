import { Scene } from 'phaser';
import { CharacterSystem } from '../gameMechanics/characterSystem';

export class MainScene extends Scene {
    constructor() {
        super('MainScene');
        this.characterSystem = new CharacterSystem(); // Create an instance of CharacterSystem
    }

    preload() {
        this.load.setPath('Assets Sergio');
        this.load.image('maleCharacterImage', 'protagonistas/feminino/vestimenta_1.png');
        this.load.image('femaleCharacterImage', 'protagonistas/masculino/vestimenta_1.png');
    }

    create() {
        this.startTime = 0; // Initialize start time

        const textStyle = {
            fontFamily: 'Arial Black',
            fontSize: 38,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8,
        };

        this.add.image(1920, 1080, 'background');

        // Initialize date using the current real-world time
        const currentDate = new Date();
        this.currentYear = currentDate.getFullYear();
        this.currentMonth = currentDate.getMonth(); // Month (0-11)
        this.currentDay = currentDate.getDate(); // Day (1-31)

        // Use Intl to format the month name
        this.monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' });

        // Initialize elapsed time and salary variables
        this.elapsedTime = 0;
        this.salaryTier = 1; // Default salary tier
        this.totalEarnings = 0; // Accumulated earnings

        // Display time and earnings
        this.timeText = this.add
            .text(
                1024 - 32,
                32,
                `${this.currentDay} /${this.monthFormatter.format(currentDate)} /${this.currentYear}`,
                textStyle
            )
            .setOrigin(1, 0)
            .setDepth(1);

        this.earningsText = this.add
            .text(32, 32, 'Earnings: $0.00', textStyle)
            .setDepth(1);

        // Retrieve the selected character gender from the registry
        const character = this.registry.get('character');

        if (character && character.gender) {
            this.characterSystem.setGender(character.gender); // Set gender in character system
            this.characterSystem.setCharacterImage(character.gender); // Set character image
            this.add.image(540, 960, this.characterSystem.getCharacterImage()); // Display the image based on gender
        } else {
            // Default message if no character is selected (for debugging)
            this.add.text(960, 540, 'No character selected', {
                fontFamily: 'Arial',
                fontSize: 32,
                color: '#ff0000',
            }).setOrigin(0.5);
        }

        // Create buttons at the bottom of the screen
        const buttonConfig = {
            fontFamily: 'Arial',
            fontSize: 32,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4,
            backgroundColor: '#1e1e1e',
            padding: { x: 20, y: 10 }
        };

        // Create button for Work
        this.createButton('Work', 200, 1900, () => {
            this.scene.start('WorkScene'); // Switch to the Work scene
        });

        // Create button for Bicos
        this.createButton('Bicos', 400, 1900, () => {
            this.scene.start('BicosScene'); // Switch to the Bicos scene
        });

        // Create button for Improvements
        this.createButton('Improvements', 600, 1900, () => {
            this.scene.start('ImprovementsScene'); // Switch to the Improvements scene
        });

        // Create button for Choices
        this.createButton('Choices', 800, 1900, () => {
            this.scene.start('ChoicesScene'); // Switch to the Choices scene
        });
    }

    createButton(text, x, y, callback) {
        const button = this.add.text(x, y, text, {
            fontFamily: 'Arial',
            fontSize: 32,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4,
        }).setOrigin(0.5);

        button.setInteractive();
        button.on('pointerdown', callback);

        // Add some visual effects
        button.on('pointerover', () => {
            button.setStyle({ backgroundColor: '#ffcc00' }); // Highlight button on hover
        });
        button.on('pointerout', () => {
            button.setStyle({ backgroundColor: '#1e1e1e' }); // Reset button style when hover ends
        });

        return button;
    }

    update(time, delta) {
        // Update elapsed time
        this.elapsedTime += delta / 1000; // Convert delta (ms) to seconds

        // Calculate the total elapsed time in days, months, and years
        const totalDaysElapsed = Math.floor(this.elapsedTime);
        const totalMonthsElapsed = Math.floor(totalDaysElapsed / 30);
        const totalYearsElapsed = Math.floor(totalMonthsElapsed / 12);

        // Calculate the updated year, month, and day
        const updatedDate = new Date(
            this.currentYear + totalYearsElapsed,
            this.currentMonth + totalMonthsElapsed,
            this.currentDay + (totalDaysElapsed % 30)
        );

        const updatedDay = updatedDate.getDate();
        const updatedMonthName = this.monthFormatter.format(updatedDate);
        const updatedYear = updatedDate.getFullYear();

        // Update time text
        this.timeText.setText(`${updatedDay} /${updatedMonthName} /${updatedYear}`);

        // Update earnings
        const hoursPassed = delta / 1000 / 3600; // Convert delta to hours
        const hourlyRate = this.getSalaryRate();
        this.totalEarnings += hourlyRate * hoursPassed;

        // Update earnings text
        this.earningsText.setText(`Earnings: $${this.totalEarnings.toFixed(2)}`);
    }

    getSalaryRate() {
        // Define salary tiers
        const salaryRates = {
            1: 25, // Salary tier 1: $25/hour
            2: 35, // Salary tier 2: $35/hour
            3: 50, // Salary tier 3: $50/hour
        };

        return salaryRates[this.salaryTier] || 0; // Default to 0 if tier is invalid
    }

    setSalaryTier(tier) {
        // Update the salary tier if valid
        const validTiers = [1, 2, 3];
        if (validTiers.includes(tier)) {
            this.salaryTier = tier;
        }
    }
}