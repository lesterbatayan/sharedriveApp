module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/sakai-vue" : "/",
  devServer: {
    proxy: "http://192.168.7.188:8040",
  },
};
