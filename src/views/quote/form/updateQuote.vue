<template>
  <div class="row">
    <a-form class="form" :form="form">
      <a-button @click="$router.go(-1)">back</a-button>
      <h1>Update page</h1>
      <!-- <a-form-item label="Quote" prop="quote"> -->
      <label for="quote">*Quote</label>
      <a-textarea
        id="quote"
        size="large"
        v-model="data.quote"
        @change="handleChange"
        v-decorator="[
          'quote',
          {
            rules: [{ required: true, message: 'Please input quote name' }],
          },
        ]"
        placeholder="Please input quote "
      />
      <!-- </a-form-item> -->
      <!-- <a-form-item label="Autor quote"> -->
      <label for="autor">*Auotr</label>
      <a-input
        v-model="data.autor"
        size="large"
        @change="handleChange"
        v-decorator="[
          'autor',
          {
            rules: [
              { required: true, message: 'Please input your quote autor' },
            ],
          },
        ]"
        placeholder="Please input quote autor"
      />
      <!-- </a-form-item> -->
      <a-form-item label="Genres">
        <a-row :gutter="[16, 16]">
          <a-col :span="21">
            <a-input
              v-model="genre"
              size="large"
              placeholder="Please input genre"
            />
          </a-col>
          <a-col :span="3">
            <a-button @click="addGenre()"> + </a-button>
          </a-col>
        </a-row>
        <a-row v-for="(item, index) in genres" :key="index" :gutter="[16, 16]">
          <a-col flex :span="15">
            <a-input
              :addon-before="index + 1"
              disabled
              v-model="item.genre"
              size="large"
            />
          </a-col>
          <a-col :span="3">
            <a-button v-on:click="removeGenre(item.id)"> - </a-button>
          </a-col>
        </a-row>
      </a-form-item>

      <a-form-item label="Created At">
        <a-row>
          <a-col :span="12">
            <a-date-picker
              disabled
              v-model="data.created_at"
              :format="dateFormat"
            />
          </a-col>
        </a-row>
      </a-form-item>

      <a-form-item label="Updated At">
        <a-row>
          <a-col :span="12">
            <a-date-picker v-model="data.updated_at" :format="dateFormat" />
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="onSubmit">Update</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { uuid } from "../../../utils/uuid";
import { onlyLatin, onlyCyrillic } from "../../../utils/regex";
const baseUrl = "http://localhost:3000/quotes/";
let debounce = setTimeout(() => {}, 0);

export default {
  data() {
    return {
      dateFormat: "YYYY-MM-DD",
      form: this.$form.createForm(this, { name: "dynamic_rule" }),
      genres: [],
      genre: "",
      data: {
        created_at: moment(),
        updated_at: moment(),
        quote: " ",
        autor: "",
      },
    };
  },
  methods: {
    moment,
    getQuote() {
      axios
        .get(baseUrl + this.$route.params.id)
        .then((res) => {
          console.log("Res", res.data);

          this.data.quote = res.data.quote;
          this.data.autor = res.data.autor;
          this.data.created_at = res.data.created_at;
          this.updated_at = res.data.updated_at;
          this.genres = [...res.data.genres];
        })
        .catch((err) => console.log("err", err));
    },
    async updateQuote() {
      console.log(this.data);
      const formData = {
        genres: this.genres,
        ...this.data,
      };
      await axios
        .post(baseUrl, { ...formData })

        .then((resp) => {
          console.log(resp);
          this.$router.push({ path: "/quote" });
        })

        .catch((err) => {
          console.log(err);
        });
    },
    addGenre() {
      if (this.genre) {
        this.genres = [...this.genres, { id: uuid(), genre: this.genre }];
        this.genre = "";
      }
    },
    removeGenre(id) {
      if (this.genres?.length > 0) {
        this.genres = this.genres.filter((item) => item.id !== id);
      }
    },
    onSubmit() {
      this.form.validateFields((err) => {
        if (!err) {
          this.updateQuote();
          this.$message.success("successfully updated");
        }
      });
    },
    handleChange(e) {
      const val = e.target.value;
      if (onlyLatin(val) || onlyCyrillic(val)) {
        return val;
      } else {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
          this.$message.warn("Please enter only latin or cyrillic letters");
        }, 800);
        return;
      }
    },
  },
  mounted() {
    console.log("sssss");
    this.getQuote();
  },
};
</script>

<style scoped>
.row {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 20px;
}
.form {
  width: 500px;
  min-width: 250px;
}
</style>
