const avgGradeCalc = (grade: number, totalGrade: number, counter: number) => {
  const sum = totalGrade + grade;
  const avg = (sum / (counter + 1)).toFixed(2);
  const result = {
    avgGrade: Number(avg),
    totalGrade: sum,
    counterGrade: counter + 1,
  };

  return result;
};

export default avgGradeCalc;
