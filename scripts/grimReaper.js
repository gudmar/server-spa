class GrimReaper {

    // instance = null;

    // deathRecipes = []; // clean callbacks
    static instance = null;

    constructor() {
        if (GrimReaper.instance) {
            console.log('OLD')
            return GrimReaper.instance;
        }
        GrimReaper.instance = this;
        this.deathRecipes = []
        console.log('NEW')
        return this;
    }

    doHarvest() {
        console.log('HARVEST', this.deathRecipes)
        this.deathRecipes.forEach((recipe) => {
            console.log('Launching ', recipe)
            recipe()
        });
        this.deathRecipes = [];
    }

    addToBookOfDeath(deathRecipe) {
        console.log('Adding', deathRecipe)
        this.deathRecipes.push(deathRecipe)
    }

}

new GrimReaper();
