import { Scene } from 'phaser';
import { TimeSystem } from '../gameMechanics/TimeSystem';
import { CharacterSystem } from '../gameMechanics/characterSystem';
import { ButtonSystem } from '../gameMechanics/button';
import { SalarySystem } from '../gameMechanics/SalarySystem';

export class MainScene extends Scene {
    constructor() {
        super('MainScene');
        this.characterSystem = new CharacterSystem();
        this.buttonSystem = null;
    }

    init(data) {
        this.salarySystem = data.salarySystem || new SalarySystem();
        this.timeSystem = new TimeSystem();
        this.data.set('salarySystem', this.salarySystem);
    }

    preload() {
        this.load.setPath('Assets');
        this.load.image('maleCharacterImage', 'protagonistas/feminino/vestimenta_1.png');
        this.load.image('femaleCharacterImage', 'protagonistas/masculino/vestimenta_1.png');
    }

    create() {
        this.buttonSystem = new ButtonSystem(this);
        const textStyle = {
            fontFamily: 'Arial Black',
            fontSize: 38,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8,
        };

        this.add.image(1920, 1080, 'background');

        // Display time
        this.timeText = this.add
            .text(1024 - 32, 32, '', textStyle)
            .setOrigin(1, 0)
            .setDepth(1);

        this.earningsText = this.add
            .text(32, 32, 'Earnings: $0.00', textStyle)
            .setDepth(1);

        const character = this.registry.get('character');
        if (character?.gender) {
            this.characterSystem.setGender(character.gender);
            this.characterSystem.setCharacterImage(character.gender);
            this.add.image(540, 960, this.characterSystem.getCharacterImage());
        } else {
            this.add.text(960, 540, 'No character selected', {
                fontFamily: 'Arial',
                fontSize: 32,
                color: '#ff0000',
            }).setOrigin(0.5);
        }

        this.buttonSystem.createButton('Work', 200, 1900, () => {
            this.scene.start('WorkScene', { salarySystem: this.salarySystem });
        });
        this.buttonSystem.createButton('Bicos', 400, 1900, () => this.scene.start('BicosScene'));
        this.buttonSystem.createButton('Improvements', 600, 1900, () => this.scene.start('ImprovementsScene'));
        this.buttonSystem.createButton('Choices', 800, 1900, () => this.scene.start('ChoicesScene'));
    }

    update(time, delta) {
        this.timeSystem.update(delta);
        const currentTime = this.timeSystem.getCurrentTime();

        this.timeText.setText(`${currentTime.day} /${currentTime.month} /${currentTime.year}`);

        const hoursPassed = delta / 1000 / 3600;
        this.salarySystem.update(hoursPassed);

        this.earningsText.setText(`Earnings: $${this.salarySystem.getEarnings()}`);
    }
}
