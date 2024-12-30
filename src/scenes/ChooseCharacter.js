import { Scene } from 'phaser';

export class ChooseCharacter extends Scene {
    constructor() {
        super('ChooseCharacter');
    }

    create() {
        const score = this.registry.get('highscore');

        const textStyle = { fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff', stroke: '#000000', strokeThickness: 8 };

        this.add.image(1920, 1080, 'background');

        const logo = this.add.image(512, -270, 'logo');

        this.tweens.add({
            targets: logo,
            y: 270,
            duration: 1000,
            ease: 'Bounce',
        });

        this.add.text(32, 32, `High Score: ${score}`, textStyle);

        const instructions = ['Crie seu Personagem'];

        this.add.text(512, 550, instructions, textStyle).setAlign('center').setOrigin(0.5);

        // Add buttons for male and female selection
        const maleButton = this.add.image(244, 960, 'maleButtonImage').setInteractive();
        const femaleButton = this.add.image(836, 960, 'femaleButtonImage').setInteractive();

        // Helper function to reset focus
        const resetFocus = () => {
            maleButton.clearTint();
            femaleButton.clearTint();
            maleButton.setScale(1);
            femaleButton.setScale(1);
        };

        maleButton.on('pointerdown', () => {
            resetFocus(); // Remove focus from other buttons
            maleButton.setTint(0x6F73D2); // Apply a blue tint
            maleButton.setScale(1.1); // Slightly enlarge
            this.registry.set('character', { gender: 'male' });
        });

        femaleButton.on('pointerdown', () => {
            resetFocus(); // Remove focus from other buttons
            femaleButton.setTint(0x6F73D2); // Apply a blue tint
            femaleButton.setScale(1.1); // Slightly enlarge
            this.registry.set('character', { gender: 'female' });
        });

        const confirmButton = this.add.image(540, 1500, 'confirmButton').setInteractive();
        confirmButton.on('pointerdown', () => {
            // Check if a character has been selected
            const selectedCharacter = this.registry.get('character');
            if (!selectedCharacter) {
                // Display an error message if no character is selected
                const errorMessage = this.add.text(540, 1400, 'Por favor, selecione um personagem!', {
                    fontFamily: 'Arial Black',
                    fontSize: 28,
                    color: '#ff0000',
                    stroke: '#000000',
                    strokeThickness: 6,
                }).setOrigin(0.5);

                // Remove the error message after 2 seconds
                this.time.delayedCall(2000, () => {
                    errorMessage.destroy();
                });
            } else {
                // Proceed to the next scene if a character is selected
                this.scene.start('MainScene');
            }
        });
    }
}