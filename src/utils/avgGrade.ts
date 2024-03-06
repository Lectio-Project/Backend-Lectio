const avgGradeCalc = (
  grade: number,
  totalGrade: number,
  counterGrade: number,
) => {
  const sum = totalGrade + grade;
  const avg = (sum / (counterGrade + 1)).toFixed(2);
  const result = {
    avgGrade: Number(avg),
    totalGrade: sum,
    counterGrade: counterGrade + 1,
  };

  return result;
};

export default avgGradeCalc;
