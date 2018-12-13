new Vue({
    el: `#numberGenerated`,
    data: {
        number: '',
        min: '',
        max: '',
    },
    methods: {

        buttonClick: function () {
            this.number = getRandomArbitrary(+this.min, +this.max)
        }
    }
})

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}