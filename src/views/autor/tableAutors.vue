<template>
  <div>
    <div class="row">
      <a-button @click="$router.push({ path: '/' })">back</a-button>
    </div>
    <a-table
      :columns="columns"
      :row-key="(record) => record.id"
      :data-source="data"
      :loading="loading"
      width="600"
      :scroll="{ x: 800, y: 600 }"
    >
      <template slot="autor" slot-scope="autor">
        {{ autor }}
      </template>

      <span slot="actions" slot-scope="text" class="actions">
        <a-button @click="showModal(text)">
          <a-icon type="eye" />
        </a-button>
      </span>
    </a-table>
    <a-modal v-model="visible" title="Basic Modal" @ok="handleOk">
      <div class="content">
        <h3>Autor name:</h3>
        <p>{{ modalData.quote }}</p>
      </div>
      <div>
        <h3>Genres:</h3>
        <ul>
          <li v-for="genre in modalData.genres" :key="genre">
            {{ genre.genre }}
          </li>
        </ul>
      </div>
    </a-modal>
  </div>
</template>
<script>
import axios from "axios";
const baseUrl = "http://localhost:3000/quotes/";

const queryData = (params) => {
  return axios.get(baseUrl, { params: params });
};
const columns = [
  {
    title: "Autor",
    dataIndex: "autor",
    width: "20%",
    scopedSlots: { customRender: "autor" },
  },

  {
    title: "Genres",
    scopedSlots: { customRender: "actions" },
    key: "actions",
    width: 165,
  },
];

export default {
  data() {
    return {
      data: [],
      loading: false,
      columns,
      visible: false,
      modalData: {},
    };
  },
  mounted() {
    this.fetch();
  },
  computed: {
    genresComputed() {
      const genres = this.data
        .map((item) => item.genres.map((elm) => elm.genre))
        .flat();
      let uniqueGenres = [...new Set(genres)];
      return uniqueGenres;
    },
  },
  methods: {
    fetch(params = {}) {
      this.loading = true;
      queryData({
        ...params,
      }).then(({ data }) => {
        this.loading = false;

        this.data = data;
      });
    },
    showModal(data) {
      this.modalData = data;
      this.visible = true;
    },
    handleOk() {
      this.visible = false;
    },
  },
};
</script>

<style scoped>
.row {
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  gap: 50px;
}
.search {
  width: 340px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.content,
.actions {
  display: flex;
  align-items: baseline;
  gap: 5px;
}
</style>
