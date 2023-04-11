const axios = require("axios");

export default class MalasakitService {
  async getMalasakitDetails(enccode) {
    // console.log("getMalasakitDetails", enccode);
    const opts = { enccode: enccode };
    // console.log(JSON.stringify(opts));
    // console.log(opts);

    await fetch("http://192.168.7.188:8040/api/malasakitCoverPage", {
      method: "POST",
      body: JSON.stringify(opts),
    })
      .then((data) => {
        console.log(data);
      })
      .then((res) => {
        console.log("res", res.data);
        return data.data[0];
      });
    // const data =
    // return { hpercode: "asdfasdf" };
  }

  async getMalasakitDetailsAx(url, enccode) {
    return await axios
      .post(url, {
        enccode: enccode,
      })
      .then((response) => console.log("RESPONSE DATA", response.data[0]));
  }
}
