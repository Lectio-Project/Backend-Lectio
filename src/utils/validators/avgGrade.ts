const avgGradeCalc = (grade: number, totalGrade: number, counter: number) => {
  const sum = totalGrade + grade;
  const avg = (sum / (counter + 1)).toFixed(2);
  const result = {
    avg: Number(avg),
    sum,
    counter: counter + 1,
  };

  return result;
};

export default avgGradeCalc;
