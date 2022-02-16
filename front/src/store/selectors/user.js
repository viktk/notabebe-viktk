/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */

/**
 * @param {Array} users - tous les users
 * @param {string} searchedId - l'id de l'user recherché
 * @return {Object} - L'user trouvé
 */
export function findUser(users, searchedId) {
  const user = users.find((testedUser) => {
    return testedUser.id === Number(searchedId);
  });

  return user;
}

export function findChildrenOfParent(users, searchedId) {
  const parent = users.filter((testedUser) => {
    return testedUser.id === Number(searchedId);
  });

  return parent;
}

export const childSearched = (children, commentChildId) => {

  const child = children.find((child) => {
    return child.id == commentChildId
  });
  
   return child.first_name
};

// export function findChildren(children, parentId) {

//   const user = users.find((testedUser) => {
//     return testedUser.id === Number(searchedId);
//   });

//   return user;
// }
