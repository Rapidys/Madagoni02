let initialState = {
  isNew: [],
  navItemsInfo: [
    {
      title: "ახალი",
      to: "/add-new-post",
      htmlBefore: '<i class="fas fa-plus"></i>',
      htmlAfter: ""
    },

    {
      title: `მიღებული`,
      htmlBefore: '<i class="fa fa-envelope" ></i>',
      to: "/incomingDocuments",

    },
    {
      title: "ხელმოსაწერი",
      htmlBefore: '<i class="fas fa-signature"></i>',
      to: "/signatureDocuments",

    },
    {
      title: "დასრულებული",
      htmlBefore: '<i class="fa fa-flag"></i>',
      to: "/completed",

    },

    {
      title: "გაგზავნილი",
      htmlBefore: '<i class="fa fa-paper-plane"></i>',
      to: "/sentDocuments",
    },
    {
      title: "დრაფტი",
      htmlBefore: '<i class="fab fa-firstdraft"></i>',
      to: "/draftDocuments",

    },
    {
      title: "გაუქმებული",
      htmlBefore: '<i class="fas fa-ban"></i>',
      to: "/canceled",

    },

  ]

}
const sideBarReducer = (state = initialState) => {
  return state
}


export default sideBarReducer
