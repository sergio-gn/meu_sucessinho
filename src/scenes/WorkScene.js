import { Scene } from 'phaser';

export class WorkScene extends Scene {
    constructor() {
        super('WorkScene');
    }
    init(data) {
        // Retrieve the SalarySystem instance from scene data
        this.salarySystem = data.salarySystem || new SalarySystem();
    }
    preload() {
        this.load.setPath('Assets');
    }

    create() {
        this.add.image(1920, 1080, 'background');

        // Create buttons for WorkScene
        this.createButton('Job Tier 2', 960, 400, () => {
            this.salarySystem.setSalaryTier(2); // Call the method on the salarySystem instance
            console.log(`New Tier: 2, Earnings: $${this.salarySystem.getEarnings()}`);
        });

        this.createButton('Job Tier 3', 960, 500, () => {
            this.salarySystem.setSalaryTier(3); // Call the method on the salarySystem instance
            console.log(`New Tier: 3, Earnings: $${this.salarySystem.getEarnings()}`);
        });

        this.createButton('Job Tier 4', 960, 600, () => {
            this.salarySystem.setSalaryTier(4); // Call the method on the salarySystem instance
            console.log(`New Tier: 4, Earnings: $${this.salarySystem.getEarnings()}`);
        });

        // Exit Button
        this.createButton('Exit to Main Scene', 960, 700, () => {
            this.scene.start('MainScene'); // Go back to MainScene
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

        // Add hover effects
        button.on('pointerover', () => {
            button.setStyle({ backgroundColor: '#ffcc00' });
        });
        button.on('pointerout', () => {
            button.setStyle({ backgroundColor: '#1e1e1e' });
        });

        return button;
    }
}
