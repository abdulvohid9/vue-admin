<template>
  <div class="row">
    <a-form class="form" :form="form">
      <a-button @click="$router.go(-1)">back</a-button>
      <h1>Create page</h1>
      <a-form-item label="Quote">
        <a-textarea
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
      </a-form-item>
      <a-form-item label="Autor quote">
        <a-input
          v-model="data.autor"
          size="large"
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
      </a-form-item>
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
            <a-date-picker
              disabled
              v-model="data.updated_at"
              :format="dateFormat"
            />
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="onSubmit">Create</a-button>
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
        quote: "",
        autor: "",
      },
    };
  },
  methods: {
    moment,
    async PostQuote() {
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
          // console.info("success");
          this.PostQuote();
          this.$message.success("successfully created");
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
