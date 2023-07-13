export const keyboarEnterHandler = (callback) => (e) => {
  if (e.key === 'Enter') {
    callback(e);
  }
};
