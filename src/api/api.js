export const manufactionApi = {
  // GET
  manufactionUrl: () => '/api/manufactions',
  // POST
  addManufactionUrl: () => '/api/manufactions',
  // PUT
  updateManufactionUrl: id => '/api/manufactions/' + id,
  // DELETE
  deleteManufactionUrl: id => '/api/manufactions/' + id,
  // GET
  getSingleManufactionUrl: id => '/api/manufactions/' + id,
  // PUT
  handleManufactionStartUrl: id => '/api/manufactions/handleStart/' + id,
  // PUT
  handleManufactionConfirmUrl: id => '/api/manufactions//handleConfirm/' + id
}

export const userApi = {
  // GET
  getUserUrl: () => '/api/users',
  // POST
  addUserUrl: () => '/api/users',
  // PUT
  updateUserUrl: id => '/api/users/' + id,
  // DELETE
  deleteUserUrl: id => '/api/users/' + id,
  // GET 注册使用email查询
  getUserByEmailUrl: email => '/api/users/register/' + email,
  // GET
  getSingleUserUrl: id => '/api/users/' + id,
  // GET
  getUserListUrl: id => '/api/users/userList/'
}

export const authApi = {
  // POST
  loginUrl: () => '/api/auth/login',
  // GET
  loginOutUrl: () => '/api/auth/loginOut'
}

export const captchaApi = {
  // POST
  captchaEmailUrl: () => '/api/captchas',
  // GET
  getCaptchaEmailUrl: () => '/api/captchas',
  // GET
  getImgCaptchaUrl: () => '/api/captchas/imgCaptcha'
}
