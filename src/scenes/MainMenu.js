import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.add.image(540, 960, 'background');

        const logo = this.add.image(512, -270, 'logo');

        this.tweens.add({
            targets: logo,
            y: 270,
            duration: 1000,
            ease: 'Bounce'
        });

        const confirmButton = this.add.image(540, 1500, 'confirmButton').setInteractive();

        confirmButton.on('pointerdown', () => {

            this.scene.start('ChooseCharacter');

        });
    }
}
