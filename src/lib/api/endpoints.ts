const endpoints = {
  demand_assessment: {
    getFirstQuestion: '/demand_assessment/rest_api/get-first-question/',
    getNextQuestion: `/demand_assessment/rest_api/get-next-question/`,
  },
  pc_configuration: {
    getProductCategories: '/pc_configuration/rest_api/get-product-categories/',
    submitPcConfiguration:
      '/pc_configuration/rest_api/submit-pc-configuration/',
    getFilteredProducts: '/pc_configuration/rest_api/filtered-products/',
    getPcComponentsWithPreset:
      '/pc_configuration/rest_api/get-pc-components-with-preset/',
    getPcConfigurationById: (id: number) =>
      `/pc_configuration/rest_api/get-pc-configuration/${id}/`,
  },
  setup_configuration: {
    getSetupProductByFilters: '/setup_configuration/rest_api/products/',
  },
} as const;

export default endpoints;
