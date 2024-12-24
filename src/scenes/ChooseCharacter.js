import { Scene } from 'phaser';

export class ChooseCharacter extends Scene {
    constructor() {
        super('ChooseCharacter');
    }

    create() {
        //  Get the current highscore from the registry
        const score = this.registry.get('highscore');

        const textStyle = { fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff', stroke: '#000000', strokeThickness: 8 };

        this.add.image(1920, 1080, 'background');

        const logo = this.add.image(512, -270, 'logo');

        this.tweens.add({
            targets: logo,
            y: 270,
            duration: 1000,
            ease: 'Bounce'
        });

        this.add.text(32, 32, `High Score: ${score}`, textStyle);

        const instructions = [
            'Crie seu Personagem',
            '',
            '',
            'Confirmar'
        ];

        this.add.text(512, 550, instructions, textStyle).setAlign('center').setOrigin(0.5);

        // Add buttons for male and female selection
        const maleButton = this.add.image(512, 800, 'maleButtonImage').setInteractive();
        const femaleButton = this.add.image(1024, 800, 'femaleButtonImage').setInteractive();

        maleButton.on('pointerdown', () => {
            this.registry.set('character', { gender: 'male' }); // Store male character in registry
            this.scene.start('MainScene');
        });

        femaleButton.on('pointerdown', () => {
            this.registry.set('character', { gender: 'female' }); // Store female character in registry
            this.scene.start('MainScene');
        });
    }
}