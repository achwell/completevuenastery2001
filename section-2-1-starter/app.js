const vm = Vue.createApp({
    data() {
        return {
            firstName: 'John',
            middleName: '',
            lastName: 'Doe',
            url: 'http://google.com',
            raw_url: '<a href="http://google.no" target="_blank">Google</a>',
            age: 20
        };
    },
    methods: {
        increment() {
            this.age++
        },
        updateLastName(msg, e) {
//            console.log(msg);
            this.lastName = e.target.value;
        },
        updateMiddleName(e) {
            this.middleName = e.target.value;
        }
    },
    computed: {
        fullName() {
            console.log("Full name method was called (computed)");
            return `${this.firstName} ${this.middleName} ${this.lastName.toUpperCase()} `;
        },
    },
    watch: {
        age(newVal, oldVal) {
            setTimeout(() => {
                this.age = 20
            }, 3000);
        }
    }
}).mount('#app');
