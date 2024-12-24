import { Scene } from 'phaser';

export class BicosScene extends Scene {
    constructor() {
        super('BicosScene');
    }

    preload() {
        this.load.setPath('Assets Sergio');
    }

    create() {
        this.add.image(1920, 1080, 'background');

        // Create buttons for BicosScene
        this.createButton('Bicos Task 1', 960, 400, () => {
            console.log('Bicos Task 1 clicked');
        });

        this.createButton('Bicos Task 2', 960, 500, () => {
            console.log('Bicos Task 2 clicked');
        });

        this.createButton('Bicos Task 3', 960, 600, () => {
            console.log('Bicos Task 3 clicked');
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
