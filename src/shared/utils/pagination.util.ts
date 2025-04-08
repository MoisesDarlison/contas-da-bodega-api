export function paginate<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
) {
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    currentPage: page,
    totalPages,
    totalItems: total,
  };
}
