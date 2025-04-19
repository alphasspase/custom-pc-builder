const endpoints = {
  demand_assessment: {
    getFirstQuestion: '/demand_assesment/rest_api/get-first-question/',
    getNextQuestion: (questionId: string) =>
      `/demand_assesment/rest_api/get-next-question/${questionId}/`,
  },
  pc_configuration: {
    getProductCategories: '/pc_configuration/rest_api/get-product-categories/',
    submitPcConfiguration:
      '/pc_configuration/rest_api/submit-pc-configuration/',
    getPcConfigurationById: (id: string) =>
      `/pc_configuration/rest_api/get-pc-configuration/${id}/`,
  },
  user: {
    getjoke: '/public/randomjokese',
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
