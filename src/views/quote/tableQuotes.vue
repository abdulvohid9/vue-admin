<template>
  <div>
    <div class="row">
      <a-button @click="$router.push({ path: '/' })">back</a-button>

      <div class="search">
        <span>Search:</span>
        <a-input-search size="large" placeholder="Search" @change="onSearch" />
      </div>
      <div class="search">
        <span>Filter by Autor:</span>
        <a-select
          allowClear
          size="large"
          style="width: 100%"
          @change="filterAutor"
        >
          <a-select-option
            v-for="item in data"
            :key="item.autor"
            :value="item.autor"
          >
            {{ item.autor }}
          </a-select-option>
        </a-select>
      </div>
      <div class="search">
        <span>Filter by Genre:</span>
        <a-select
          allowClear
          size="large"
          style="width: 100%"
          @change="filterByGenre"
        >
          <a-select-option
            v-for="(genre, index) in genresComputed"
            :key="index"
            :value="genre"
          >
            {{ genre }}
          </a-select-option>
        </a-select>
      </div>
      <div>
        <a-button @click="RandomGenerate()"> Random genereate </a-button>
      </div>
      <div>
        <a-button
          type="primary"
          @click="$router.push({ path: `/quote/create` })"
        >
          Create +
        </a-button>
      </div>
    </div>
    <a-table
      :columns="columns"
      :row-key="(record) => record.id"
      :data-source="data"
      :loading="loading"
      :scroll="{ x: 1400, y: 500 }"
    >
      <template slot="autor" slot-scope="autor">
        {{ autor }}
      </template>

      <span slot="actions" slot-scope="text" class="actions">
        <a-button @click="showModal(text)">
          <a-icon type="eye" />
        </a-button>
        <delete-btn @confirm="deleteQuote(text)" />
        <a-popconfirm
          :title="'Вы хотите это удалить?'"
          :ok-text="'Да'"
          :cancel-text="'Нет'"
          @confirm="deleteQuote(text)"
          @cancel="(cancel) => null"
        >
          <a-tooltip placement="bottomLeft" :title="'delete'">
            <a-button type="danger" icon="delete" />
          </a-tooltip>
        </a-popconfirm>
        <edit-btn @click="$router.push({ path: `/quote/${text.id}` })" />
        <a-tooltip placement="bottomLeft" :title="'edit'">
          <a-button
            class="mx-1"
            @click="$router.push({ path: `/quote/${text.id}` })"
            type="primary"
            icon="edit"
          />
        </a-tooltip>
      </span>
    </a-table>
    <a-modal v-model="visible" title="Modal" @ok="handleOk">
      <div class="content">
        <h3>Quote:</h3>
        <p>{{ modalData.quote }}</p>
      </div>
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
import moment from "moment";
const baseUrl = "http://localhost:3000/quotes/";
let debounce = setTimeout(() => {}, 0);
import { mapGetters } from "vuex";

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
    title: "Quote",
    dataIndex: "quote",
    width: "20%",
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    width: "20%",
    defaultSortOrder: "descend",
    sorter: (a, b) =>
      moment(a.created_at).format("X") - moment(b.created_at).format("X"),
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Updated At",
    dataIndex: "updated_at",
    width: "20%",
    defaultSortOrder: "descend",
    sorter: (a, b) =>
      moment(a.updated_at).format("X") - moment(b.updated_at).format("X"),
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Actions",
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
    ...mapGetters(["randoms"]),
    genresComputed() {
      const genres = this.data
        .map((item) => item.genres.map((elm) => elm.genre))
        .flat();
      let uniqueGenres = [...new Set(genres)];
      return uniqueGenres;
    },
  },
  watch: {
    // genresComputed(val) {
    //   console.log("val", val);
    // },
  },
  methods: {
    RandomGenerate(min = 1, max = this.data.length) {
      let difference = max - min;

      let rand = Math.random();

      rand = Math.floor(rand * difference);

      rand = rand + min;
      if (this.randoms.includes(rand)) {
        this.RandomGenerate((min = 1), (max = this.data.length));
      } else {
        this.showModal(this.data[rand]);
      }
      this.showModal(this.data[rand]);
      console.log("this", this.randoms);
      this.$store.dispatch("addToRandoms", rand);
    },
    async deleteQuote(params) {
      await axios
        .delete(`${baseUrl}${params.id}`)

        .then((resp) => {
          console.log(resp);
          this.$message.success("Successfully deleted");

          this.fetch();
        })

        .catch((err) => {
          console.log(err);
        });
    },
    filterAutor(val) {
      this.fetch({ autor: val });
    },
    filterByGenre(val) {
      if (val === undefined) {
        this.fetch();
      }
      const res = [];
      this.data.forEach((item) =>
        item.genres.forEach((elm) => {
          if (elm.genre.toLowerCase().includes(val.toLowerCase())) {
            res.push(item);
          }
        })
      );
      this.data = res;
      // this.fetch();
    },
    onSearch(e) {
      const val = e.target.value;
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        this.fetch({ q: val });
      }, 800);
    },
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
@media (max-width: 768px) {
  .row {
    flex-direction: column-reverse;
  }
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
