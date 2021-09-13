export const Query = searchParams => ({
  set: (param, value) => {
    searchParams.set(param, value);
    return searchParams.toString();
  },
  append: (param, value) => {
    searchParams.append(param, value);
    return searchParams.toString();
  },
  delete: (param, value) => {
    searchParams.delete(param, value);
    return searchParams.toString();
  },
});
