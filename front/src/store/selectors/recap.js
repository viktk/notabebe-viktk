/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */

/**
 * @param {Array} recaps - tous les recaps
 * @param {string} childId - l'id de l'enfant dont il faut trouver le (dernier!) recap
 * @return {Object} - Le recap trouvé
 */
export function findRecap(recaps, childId) {
  const recap = recaps.filter((testedRecap) => {
    return testedRecap.child_id === Number(childId);
  });
  return recap;
}


export function filterRecaps(list, filterInputValue) {

  const filteredList = list.filter((recap) => {

    if (recap.naps == null && recap.meals == null) {
      return recap.mood.toLowerCase().includes(filterInputValue.toLowerCase())
        || recap.extra_info.toLowerCase().includes(filterInputValue.toLowerCase())
        || recap.first_name.toLowerCase().includes(filterInputValue.toLowerCase())
    }
    else if (recap.naps !== null && recap.meals == null) {
      return recap.mood.toLowerCase().includes(filterInputValue.toLowerCase())
        || recap.extra_info.toLowerCase().includes(filterInputValue.toLowerCase())
        || recap.first_name.toLowerCase().includes(filterInputValue.toLowerCase())
        || recap.naps[0].comment.toLowerCase().includes(filterInputValue.toLowerCase())
    }
    else if (recap.naps == null && recap.meals !== null) {
      return recap.mood.toLowerCase().includes(filterInputValue.toLowerCase())
        || recap.extra_info.toLowerCase().includes(filterInputValue.toLowerCase())
        || recap.first_name.toLowerCase().includes(filterInputValue.toLowerCase())
        || recap.meals[0].comment.toLowerCase().includes(filterInputValue.toLowerCase())
    }
    else if (recap.naps !== null && recap.meals !== null) {
      return recap.mood.toLowerCase().includes(filterInputValue.toLowerCase())
        || recap.extra_info.toLowerCase().includes(filterInputValue.toLowerCase())
        || recap.first_name.toLowerCase().includes(filterInputValue.toLowerCase())
        || recap.meals[0].comment.toLowerCase().includes(filterInputValue.toLowerCase())
        || recap.naps[0].comment.toLowerCase().includes(filterInputValue.toLowerCase())
    }

  })

  const convertDateFormat = (date) => date.split('/').reverse().join('-');

  const sortedList = filteredList.sort(
    (a, b) =>
      new Date(convertDateFormat(b.date)) - new Date(convertDateFormat(a.date))
  );

  return sortedList;
}

