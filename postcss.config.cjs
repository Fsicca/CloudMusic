// postcss.config.js
module.exports = {
  plugins: {
    // postcss-pxtorem 插件的版本需要 >= 5.0.0
    "postcss-pxtorem": {
      rootValue({ file }) {
        return file.indexOf("vant") == -1 ? 75 : 37.5;
      },
      propList: ["*"],
    },
  },
};
