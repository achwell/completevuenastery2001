<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <AppUpload ref="upload" :addSong="addSong" />
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
               v-iconSecondary="{ icon: 'compact-disc', right: true }"
          >
            <span class="card-title">{{ $t('manage.my-songs') }}</span>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <CompositionItem v-for="(song, i) in songs" :key="song.docID"
                             :song="song"
                             :updateSong="updateSong"
                             :index="i"
                             :removeSong="removeSong"
                             :updateUnsavedFlag="updateUnsavedFlag"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { auth, songsCollection } from '@/includes/firebase';
import AppUpload from '@/components/Upload.vue';
import CompositionItem from '@/components/CompositionItem.vue';
import IconSecondary from '@/directives/icon-secondary';

export default {
  name: 'manage',
  components: {
    AppUpload, CompositionItem,
  },
  directives: {
    iconSecondary: IconSecondary,
  },
  data() {
    return {
      songs: [],
      unsavedFlag: false,
    };
  },
  async created() {
    const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get();
    snapshot.forEach(this.addSong);
  },
  methods: {
    updateSong(i, values) {
      this.songs[i].modifiedName = values.modifiedName;
      this.songs[i].genre = values.genre;
    },
    removeSong(i) {
      this.songs.splice(i, 1);
    },
    addSong(document) {
      const song = {
        ...document.data(),
        docID: document.id,
      };
      this.songs.push(song);
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlag) {
      next();
    } else {
      // eslint-disable-next-line no-alert, no-restricted-globals
      const leave = confirm(this.$i18n.t('manage.confirm-unsaved'));
      next(leave);
    }
  },
};
</script>
