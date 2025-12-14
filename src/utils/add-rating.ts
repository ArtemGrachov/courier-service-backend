export const addRating = (oldAverageRating: number, oldRatingCount: number, newRating: number) => {
  const count = oldRatingCount + 1;
  const averageRating = ((oldAverageRating * oldRatingCount) + newRating) / count;

  return {
    averageRating,
    count,
  };
}

