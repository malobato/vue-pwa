const app = Vue.createApp({
    data() {
        return {
            title: "VUE Counter",
            counter: 0,
        };
    },

    methods: {
        setCounter(instruction = "add", quantity = 1) {
            if (instruction === "add") {
                this.counter += quantity;
            }
            else {
                this.counter -= quantity;
            }
        },
    },
});