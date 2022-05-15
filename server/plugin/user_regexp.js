const regexp_name = /^[a-zA-Z0-9_-]{4,16}$/;
const regexp_word = /^[a-zA-Z0-9_]{6,18}$/;
const regexp_email = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
export default {
  regexp_name,
  regexp_word,
  regexp_email,
};
