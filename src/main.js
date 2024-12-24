import { Boot } from './scenes/Boot';
import { ChooseCharacter } from './scenes/ChooseCharacter';
import { MainScene } from './scenes/MainScene';
import { BicosScene } from './scenes/BicosScene';
import { ChoicesScene } from './scenes/ChoicesScene';
import { ImprovementsScene } from './scenes/ImprovementsScene';
import { WorkScene } from './scenes/WorkScene';
import { Game } from 'phaser';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';

//  Find out more information about the Game Config at: https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 1080,
    height: 1920,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        ChooseCharacter,
        Preloader,
        MainMenu,
        BicosScene,
        ChoicesScene,
        ImprovementsScene,
        WorkScene,
        MainScene,
        GameOver
    ]
};

export default new Game(config);