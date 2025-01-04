export class ButtonSystem {
    constructor(scene) {
        this.scene = scene; // Store the reference to the scene
    }

    createButton(text, x, y, callback) {
        const button = this.scene.add.text(x, y, text, { // Use the scene's add method
            fontFamily: 'Arial',
            fontSize: 32,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4,
        }).setOrigin(0.5);

        button.setInteractive();
        button.on('pointerdown', callback);
        button.on('pointerover', () => button.setStyle({ backgroundColor: '#ffcc00' }));
        button.on('pointerout', () => button.setStyle({ backgroundColor: '#1e1e1e' }));

        return button;
    }
}
