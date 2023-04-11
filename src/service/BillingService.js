export default class BillingService {
  async getBills() {
    return await fetch("http://192.168.7.188:8040/api/patientsBillingList")
      .then((res) => res.json())

      .then((data) => {
        return data;
      });
  }
}
