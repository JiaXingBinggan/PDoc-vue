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
  getUserListUrl: id => '/api/users/userList/',
  // PUT
  modifyUserPassUrl: id => '/api/users/password/' + id
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
  getImgCaptchaUrl: () => '/api/captchas/imgCaptcha',
  // GET
  getGtCaptchaUrl: () => '/api/captchas/gtCaptcha',
  // GET
  getSvgCaptchaUrl: () => '/api/captchas/svgCaptcha'
}

export const imgApi = {
  // POST
  imgPortraitUrl: id => '/api/img/portrait/' + id,
  // GET
  getImgPortraitUrl: id => '/api/img/portrait/' + id,
  // GET
  getQiniuPortraitUrl: id => '/api/img/qiniu/' + id,
  // POST
  qiniuPortraitUrl: id => '/api/img/qiniu/' + id,
  // POST
  addMdImgsUrl: () => '/api/img/mdeditor'
}

export const docApi = {
  // GET
  getDocsUrl: () => '/api/docs/',
  // POST
  addDocUrl: () => '/api/docs/',
  // GET
  getSingleDocUrl: id => '/api/docs/' + id,
  // PUT
  modifyDocUrl: id => '/api/docs/' + id,
  // DELETE
  deleteDocUrl: id => '/api/docs/' + id,
  // GET
  getDocByLabelUrl: () => '/api/docs/doclabel/'
}

