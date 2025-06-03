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
  user: {
    getJoke: '/public/randomjokese',
    getUserById: (id: string) => `/users/${id}`,
    updateUser: (id: string) => `/users/${id}`,
    deleteUser: (id: string) => `/users/${id}`,
    searchUsers: (query: string, filters?: Record<string, string>) =>
      `/users/search?q=${encodeURIComponent(query)}${filters ? `&${new URLSearchParams(filters)}` : ''}`,
  },
  todo: {
    getTodo: '/todos',
    createTodo: '/todos/',
    getTodoById: (todoId: string) => `/todos/${todoId}`,
    updateTodoById: (todoId: string) => `/todos/${todoId}`,
  },
} as const;

export default endpoints;
