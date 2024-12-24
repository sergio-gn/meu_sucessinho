import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        //  Get the current highscore from the registry

        const textStyle = { fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff', stroke: '#000000', strokeThickness: 8 };

        this.add.image(540, 960, 'background');

        const logo = this.add.image(512, -270, 'logo');

        this.tweens.add({
            targets: logo,
            y: 270,
            duration: 1000,
            ease: 'Bounce'
        });

        const instructions = [
            'Meu Sucessinho',
            'Simulador de vida',
            'Crie seu personagem e conkiste o suçeso',
            'Começar'
        ]

        this.add.text(512, 550, instructions, textStyle).setAlign('center').setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('ChooseCharacter');

        });
    }
}
