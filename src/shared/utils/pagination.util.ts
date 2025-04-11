export function paginate<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
) {
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    currentPage: Number(page) || 0,
    totalPages,
    totalItems: total,
  };
}
