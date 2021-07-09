<template>
    <button type="button" @click="onClickAge">Update age Event</button>
    <button type="button" @click="ageChangeFn(3)">Update age Callback</button>
    <p>The user is {{age}} years old</p>
    <p>{{ageDoubled}}</p>
</template>
<script>
export default {
    name: "User",
    props: {
        age: {
            type: Number,
//            required: true,
//            default: 20,
            validator(value) {
                return 0 < value < 130;
            }
        },
        ageChangeFn: Function
    },
    emits: ["age-change"],
    computed: {
        ageDoubled() {
            return this.age * 2;
        }
    },
    methods: {
        onClickAge(){
            this.$emit('age-change', 3);
        }
    },
}
</script>