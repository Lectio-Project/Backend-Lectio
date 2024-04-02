export function calculatePagination(
  amountRows: number,
  page: number = 1,
  quantityPerPage: number = 20,
) {
  const totalPage = Math.ceil(amountRows / quantityPerPage);

  const skip =
    totalPage >= page
      ? (page - 1) * quantityPerPage
      : (totalPage - 1) * quantityPerPage;
  const take = quantityPerPage;

  const pagination = {
    page: totalPage >= page ? page : totalPage,
    totalPage,
    quantityPerPage: take,
  };

  return { skip, take, totalPage, pagination };
}
