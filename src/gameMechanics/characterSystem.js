// gameMechanics/characterSystem.js

export class CharacterSystem {
    constructor() {
        this.character = {
            gender: null, // 'male' or 'female'
            image: null,  // Image asset for the character
            // You can add future attributes here like clothes, food, car, etc.
        };
    }

    setGender(gender) {
        this.character.gender = gender;
    }

    getGender() {
        return this.character.gender;
    }

    setCharacterImage(gender) {
        this.character.image = gender === 'male' ? 'maleCharacterImage' : 'femaleCharacterImage';
    }

    getCharacterImage() {
        return this.character.image;
    }

    // Future methods for other character attributes (clothes, food, etc.) can be added here.
    // For example:
    // setClothes(clothes) { this.character.clothes = clothes; }
    // getClothes() { return this.character.clothes; }
}
