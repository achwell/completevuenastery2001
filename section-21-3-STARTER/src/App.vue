<template>
  <div>
    <p>{{ num }}</p>
    <p>{{ double }}</p>
    <button type="button" @click.prevent="increment">Increment</button>
    <p>{{ name }}</p>
    <input type="text" v-model="phrase">
    <p>{{ reversedPhrase }}</p>
    <app-alert :user="user" />
    <button type="button" ref="btn">Button</button>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
} from 'vue';
import AppAlert from '@/components/Alert.vue';
import { useNumber } from "./hooks/number";
import { usePhrase } from "./hooks/phrase";

export default {
  name: "App",
  components: {
    AppAlert
  },
  setup() {
    const btn = ref(null);

    onBeforeMount(() => {
      console.log("onBeforeMount");
    });

    onMounted(() => {
      console.log("onMounted");
      btn.value.addEventListener('click', () => {
        console.log("button clicked!");
      });
    });


    const user = reactive({
      name: 'Axel',
      age: 54,
    });

    setTimeout(() => {
      user.name = 'Wulff';
    }, 3000);

    const { num, double, increment } = useNumber();
    const { phrase, reversedPhrase, num: phraseNum } = usePhrase();

    return {
      num,
      increment,
      ...toRefs(user),
      user,
      phrase,
      reversedPhrase,
      double,
      btn,
      phraseNum,
    };
  },
};
</script>
