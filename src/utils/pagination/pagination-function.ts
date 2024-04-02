export function calculatePagination(
  amountRows: number,
  page: number = 1,
  quantityPerPage: number = 20,
) {
  const totalPage = Math.ceil(amountRows / quantityPerPage);

  if (page > totalPage) {
    return {
      skip: 0,
      take: 0,
      totalPage,
      pagination: {
        page: totalPage,
        totalPage,
        quantityPerPage,
      },
    };
  }

  const skip = totalPage >= page ? (page - 1) * quantityPerPage : totalPage;
  const take = quantityPerPage;

  const pagination = {
    page: totalPage >= page ? page : totalPage,
    totalPage,
    quantityPerPage: take,
  };

  return { skip, take, totalPage, pagination };
}
